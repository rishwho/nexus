from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Job, Application, User
from .serializers import JobSerializer, ApplicationSerializer

# --- AUTHENTICATION VIEWS ---

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    Creates a new user and returns JWT tokens.
    """
    data = request.data
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'seeker') # Default to seeker if not provided
    full_name = data.get('full_name', '')

    if not email or not password:
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # 1. Create the user
        # We use the email prefix as a temporary username
        user = User.objects.create(
            username=email.split('@')[0], 
            email=email,
            password=make_password(password), # HASHING IS VITAL
            role=role,
            first_name=full_name.split(' ')[0] if ' ' in full_name else full_name,
            last_name=' '.join(full_name.split(' ')[1:]) if ' ' in full_name else ''
        )
        
        # 2. Log them in immediately by generating tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'role': user.role,
            'username': user.username,
            'message': "Account created successfully!"
        }, status=status.HTTP_201_CREATED)

    except IntegrityError:
        return Response({"error": "An account with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "This email is not registered with NEXUS."}, status=status.HTTP_404_NOT_FOUND)

    auth_user = authenticate(username=user.username, password=password)
    if auth_user:
        refresh = RefreshToken.for_user(auth_user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'role': auth_user.role,
            'username': auth_user.username
        }, status=status.HTTP_200_OK)
    return Response({"error": "Incorrect password."}, status=status.HTTP_401_UNAUTHORIZED)

# --- JOB VIEWS ---

@api_view(['GET'])
@permission_classes([AllowAny])
def job_list(request):
    jobs = Job.objects.filter(is_active=True).order_by('-created_at')
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def job_search(request):
    query = request.GET.get('q', '')
    location = request.GET.get('loc', '')
    jobs = Job.objects.filter(
        title__icontains=query,
        location__icontains=location,
        is_active=True
    )
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_job(request):
    if request.user.role != 'recruiter':
        return Response({"error": "Only recruiters can post jobs."}, status=status.HTTP_403_FORBIDDEN)
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(posted_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- APPLICATION VIEWS ---

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_to_job(request, job_id):
    if request.user.role != 'seeker':
        return Response({"error": "Only seekers can apply for jobs."}, status=status.HTTP_403_FORBIDDEN)
    job = get_object_or_404(Job, id=job_id)
    if Application.objects.filter(job=job, seeker=request.user).exists():
        return Response({"error": "You have already applied for this job."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(job=job, seeker=request.user)
        return Response({"message": "Application successful!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_applications(request):
    if request.user.role == 'recruiter':
        apps = Application.objects.filter(job__posted_by=request.user)
    else:
        apps = Application.objects.filter(seeker=request.user)
    serializer = ApplicationSerializer(apps, many=True)
    return Response(serializer.data)