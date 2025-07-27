
from django.contrib.auth import get_user_model, authenticate # type: ignore
from rest_framework import status, permissions # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.authtoken.models import Token # type: ignore
from django.contrib.auth.models import Group # type: ignore

User = get_user_model()

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('email')
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('fullName', '')
        user_type = request.data.get('userType') # 'vendor' or 'supplier'

        if not all([username, email, password, user_type]):
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'A user with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password, first_name=full_name)
        
        # Add the user to the correct group based on user_type
        try:
            if user_type == 'supplier':
                group = Group.objects.get(name='Supplier')
                user.groups.add(group)
            else: # Default to Vendor
                group = Group.objects.get(name='Vendor')
                user.groups.add(group)
        except Group.DoesNotExist:
            # This is a fallback in case the groups haven't been created in the admin yet
            pass

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        if not user:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            
        token, _ = Token.objects.get_or_create(user=user)
        
        # Determine the user's role
        user_type = 'vendor' # Default role
        if user.groups.filter(name='Supplier').exists():
            user_type = 'supplier'

        return Response({
            'token': token.key,
            'user_type': user_type # Include the user's role in the response
        })
class LogoutView(APIView):
    """
    API view for user logout. Requires token authentication.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            # Simply delete the token to force a login
            request.user.auth_token.delete()
            return Response(
                {"message": "Successfully logged out."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
