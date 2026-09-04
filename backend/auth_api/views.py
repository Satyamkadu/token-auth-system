from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer ,DeviceSerializer
from .models import Device

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        # This securely extracts the user directly from the validated JWT token
        return self.request.user
    
class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()  # Invalidates the refresh token
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"detail": "Invalid token or token missing."}, status=status.HTTP_400_BAD_REQUEST)

class DeviceListView(generics.ListAPIView):
    """GET /auth/devices - List all active devices for the authenticated user"""
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = DeviceSerializer

    def get_queryset(self):
        return Device.objects.filter(user=self.request.user)

class DeviceDetailView(generics.DestroyAPIView):
    """DELETE /auth/devices/{device_id} - Remove/Logout a specific device"""
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = DeviceSerializer
    lookup_field = 'device_id'

    def get_queryset(self):
        return Device.objects.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Device removed successfully."}, status=status.HTTP_200_OK)