from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from knox.models import AuthToken


class LoginAPITestCase(APITestCase):
    def test_login(self):
        data = {"username": "lgp-drg1", "password": "daraga123"}
        self.user = User.objects.create_user(**data)
        response = self.client.post("/api/auth/login", data)
        self.assertEqual(
            response.data,
            {
                "user": {
                    "id": self.user.id,
                    "username": self.user.username,
                    "email": self.user.email,
                },
                "token": AuthToken.objects.first(),
            },
        )
