from django.urls import path
from . import views

urlpatterns = [
    # --- Authentication Endpoints ---
    # These match the endpoints your Auth.jsx is calling
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),

    # --- Job Management Endpoints ---
    path('jobs/', views.job_list, name='job_list'), 
    path('jobs/search/', views.job_search, name='job_search'),
    path('jobs/create/', views.create_job, name='create_job'),

    # --- Application Endpoints ---
    # The <int:job_id> allows the seeker to apply to a specific job ID
    path('jobs/<int:job_id>/apply/', views.apply_to_job, name='apply_to_job'),
    
    # This dynamic path shows different data based on the logged-in user's role
    path('my-applications/', views.get_user_applications, name='user_applications'),
]