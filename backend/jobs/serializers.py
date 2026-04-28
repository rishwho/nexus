from rest_framework import serializers
from .models import Job, User, Application

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'bio', 'profile_picture']
        read_only_fields = ['id']

class JobSerializer(serializers.ModelSerializer):
    # This allows the frontend to see the recruiter's name, not just their ID
    posted_by_name = serializers.ReadOnlyField(source='posted_by.username')

    class Meta:
        model = Job
        fields = [
            'id', 'posted_by', 'posted_by_name', 'title', 'company_name', 
            'location', 'description', 'category', 'tags', 'job_type', 
            'created_at', 'is_active'
        ]
        # We make 'posted_by' read_only because your views.py 
        # handles assigning it from the request.user
        read_only_fields = ['posted_by', 'created_at']

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.ReadOnlyField(source='job.title')
    company_name = serializers.ReadOnlyField(source='job.company_name')
    seeker_name = serializers.ReadOnlyField(source='seeker.username')

    class Meta:
        model = Application
        fields = [
            'id', 'job', 'job_title', 'company_name', 'seeker', 
            'seeker_name', 'resume', 'cover_letter', 'status', 'applied_at'
        ]
        # Seeker and Job are handled in the view's save() method
        read_only_fields = ['seeker', 'job', 'applied_at', 'status']