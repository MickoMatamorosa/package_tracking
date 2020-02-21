from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from knox.models import AuthToken
from rest_framework import status


class AccountAPITestCase(APITestCase):

    # create user and its token
    def setUp(self):
        self.username = "lgp-drg1"
        self.password = "daraga123"
        data = {"username": self.username, "password": self.password}

        self.user = User.objects.create_user(**data)
        self.token = AuthToken.objects.create(self.user)[1]

    def test_user_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token)
        response = self.client.get("/api/auth/user")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_un_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION="Invalid Token")
        response = self.client.get("/api/auth/user")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get("/api/auth/user")

        self.assertEqual(
            response.data,
            {
                "id": self.user.id,
                "username": self.user.username,
                "email": self.user.email,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_change_password(self):
        self.client.force_authenticate(user=self.user)
        data = {"username": "lgp-drg", "password": "123daraga"}
        response = self.client.get("/api/auth/user", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
