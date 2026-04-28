from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),
]

# This allows the browser to access the "resumes" folder during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_address=settings.MEDIA_ROOT)