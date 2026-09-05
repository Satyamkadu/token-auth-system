from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer, UserSerializer
from .utils import add_device_session

from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import get_user_sessions, remove_device_session

from .permissions import IsAdminUserRole


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class CustomLoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Validate credentials using SimpleJWT's default serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Extract the authenticated user and generated tokens
        user = serializer.user
        refresh_token = serializer.validated_data['refresh']
        access_token = serializer.validated_data['access']
        
        # Extract device information from HTTP headers
        user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown Device')
        ip_address = request.META.get('REMOTE_ADDR', 'Unknown IP')
        
        # Store the session in cache
        session_id = add_device_session(user.id, refresh_token, user_agent, ip_address)
        
        return Response({
            'access': access_token,
            'refresh': refresh_token,
            'session_id': session_id
        })

class DeviceListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        sessions = get_user_sessions(request.user.id)
        
        # Strip out the actual refresh tokens before sending to the frontend for security
        safe_sessions = {
            sid: {
                "device": data.get("device"), 
                "ip": data.get("ip"), 
                "login_time": data.get("login_time")
            }
            for sid, data in sessions.items()
        }
        return Response(safe_sessions)

class LogoutDeviceView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, session_id):
        # Remove from our local cache
        refresh_token = remove_device_session(request.user.id, session_id)
        
        if refresh_token:
            try:
                # Blacklist the token so it can never be used again
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass # Token might already be expired or previously blacklisted
                
            return Response({"message": "Device logged out successfully."}, status=200)
            
        return Response({"error": "Session not found."}, status=404)


class AdminOnlyDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 1. Enforce backend RBAC security
        if request.user.role != 'admin':
            return Response({"error": "Insufficient clearance."}, status=403)
        
        # 2. Fetch all registered users
        users = User.objects.all().values('id', 'username', 'email', 'role', 'date_joined')
        
        return Response({"users": list(users)})