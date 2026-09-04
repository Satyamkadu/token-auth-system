from rest_framework import permissions

class IsAdminUserRole(permissions.BasePermission):
    """
    Allows access only to users who have their role set to 'admin'.
    """
    def has_permission(self, request, view):
        # Check if the user is logged in AND their role exactly matches 'admin'
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')