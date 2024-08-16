from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from events.auth_views import register, login_view, logout_view, check_auth
from events.views import EventViewSet
from events.views import home  # Import the home view

router = DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('check-auth/', check_auth, name='check_auth'),
    path('', home),  # Add the root path
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
