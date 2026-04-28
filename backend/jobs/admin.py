from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Job, Application

# 1. Registering the Custom User Model
# We use UserAdmin so we can still manage passwords and permissions properly
@admin.register(User)
class NexusUserAdmin(UserAdmin):
    # Add 'role' and 'bio' to the admin display
    list_display = ('username', 'email', 'role', 'is_staff')
    
    # This adds our custom fields to the User edit page in admin
    fieldsets = UserAdmin.fieldsets + (
        ('Nexus Profile', {'fields': ('role', 'bio', 'profile_picture')}),
    )
    # This adds our custom fields to the "Add User" page
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Nexus Profile', {'fields': ('role', 'bio', 'profile_picture')}),
    )

# 2. Registering the Job Model
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company_name', 'posted_by', 'location', 'job_type', 'created_at')
    search_fields = ('title', 'company_name', 'category')
    list_filter = ('job_type', 'category', 'location')
    # Automatically fill posted_by with the current user if left blank
    def save_model(self, request, obj, form, change):
        if not obj.posted_by:
            obj.posted_by = request.user
        super().save_model(request, obj, form, change)

# 3. Registering the Application Model
@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('seeker', 'job', 'status', 'applied_at')
    list_filter = ('status', 'applied_at')
    search_fields = ('seeker__username', 'job__title', 'job__company_name')
    readonly_fields = ('applied_at',) # Keep the timestamp honest