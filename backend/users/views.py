
from django.contrib.auth import get_user_model, authenticate # type: ignore
from rest_framework import status, permissions # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.authtoken.models import Token # type: ignore

User = get_user_model()

class SignupView(APIView):
    # This view must have a 'post' method to handle POST requests.
    def post(self, request):
        username = request.data.get('email')
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('fullName', '')

        if not username or not password or not email:
            return Response(
                {'error': 'Please provide email and password'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'A user with this email already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(username=username, email=email, password=password, first_name=full_name)
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    # This view must also have a 'post' method.
    # The 405 error occurs if this method is misspelled (e.g., 'psot')
    # or incorrectly indented.
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Please provide both email and password'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=email, password=password)

        if not user:
            return Response(
                {'error': 'Invalid Credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
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
