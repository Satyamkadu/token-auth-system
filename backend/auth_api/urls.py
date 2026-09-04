from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserProfileView , LogoutView ,DeviceListView ,DeviceDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('me/', UserProfileView.as_view(), name='me'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('devices/', DeviceListView.as_view(), name='device-list'),
    path('devices/<str:device_id>/', DeviceDetailView.as_view(), name='device-detail'),
]