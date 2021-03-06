from django.urls import path, include
from .api import LoginAPI, UserAPI, ChangePassAPI
from knox import views as knox_views

urlpatterns = [
    path("api/auth", include("knox.urls")),
    path("api/auth/login", LoginAPI.as_view(), name="user-login"),
    path("api/auth/user", UserAPI.as_view(), name="user-account"),
    path("api/auth/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("api/auth/change-password", ChangePassAPI.as_view(), name="change_password"),
]
