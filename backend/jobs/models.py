from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    ROLE_CHOICES = (
        ('seeker', 'Job Seeker'),
        ('recruiter', 'Recruiter'),
    )
    
    # --- THE FIX ---
    # Overriding the default email field to ensure it is unique in the database.
    email = models.EmailField(unique=True) 
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='seeker')
    bio = models.TextField(max_length=500, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

    # REQUIRED_FIELDS is for createsuperuser only. 
    # Since 'username' and 'password' are required by default, we add 'email' and 'role'.
    REQUIRED_FIELDS = ['email', 'role']

    groups = models.ManyToManyField(Group, related_name="nexus_user_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="nexus_user_permissions", blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

class Job(models.Model):
    posted_by = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="posted_jobs",
        limit_choices_to={'role': 'recruiter'}
    )
    title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100, default="IT jobs")
    tags = models.JSONField(default=list, blank=True)
    job_type = models.CharField(max_length=50, default='Full-time')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} at {self.company_name}"

class Application(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    seeker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="my_applications")
    
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('job', 'seeker')

    def __str__(self):
        return f"{self.seeker.username} -> {self.job.title}"