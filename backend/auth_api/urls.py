from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, UserProfileView, CustomLoginView, DeviceListView, LogoutDeviceView, AdminOnlyDataView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('me/', UserProfileView.as_view(), name='me'),
    path('devices/', DeviceListView.as_view(), name='devices'),
    path('devices/<str:session_id>/', LogoutDeviceView.as_view(), name='logout_device'),
    path('admin-dashboard/', AdminOnlyDataView.as_view(), name='admin-dashboard'),
]