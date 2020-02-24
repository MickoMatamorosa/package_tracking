from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from knox.models import AuthToken
from rest_framework import status


class TestCaseSetUp(APITestCase):

    # create user and its token
    def setUp(self):
        self.username = "lgp-drg1"
        self.password = "daraga123"
        data = {"username": self.username, "password": self.password}

        self.user = User.objects.create_user(**data)
        self.token = AuthToken.objects.create(self.user)[1]


class AuthenticationTestCase(TestCaseSetUp):
    """Test user authetication"""

    def test_user_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token)
        response = self.client.get("/api/auth/user")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_un_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION="Invalid Token")
        response = self.client.get("/api/auth/user")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class UserTestCase(TestCaseSetUp):
    """Check user authenticated user has correct data"""

    def test_user_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get("/api/auth/user")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            {
                "id": self.user.id,
                "username": self.user.username,
                "email": self.user.email,
            },
        )


class ChangePassWordTestCase(TestCaseSetUp):
    def setUp(self):
        super().setUp()

        # change password fields
        self.old_password = self.password
        self.new_password = "123daraga"

    def test_change_with_incorrect_password(self):
        self.client.force_authenticate(user=self.user)

        # change password
        response = self.client.patch(
            "/api/auth/change-password",
            {"old_password": "incorrect-password", "new_password": self.new_password},
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_with_correct_password(self):
        self.client.force_authenticate(user=self.user)

        # change password
        response = self.client.patch(
            "/api/auth/change-password",
            {"old_password": self.old_password, "new_password": self.new_password},
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        return response

    def test_login_old_password(self):
        # execute change password
        self.test_change_with_correct_password()

        # login using old password
        login_data = {"username": self.username, "password": self.old_password}
        response = self.client.post("/api/auth/login", login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_new_password(self):
        # execute change password
        self.test_change_with_correct_password()

        # login using new password
        login_data = {"username": self.username, "password": self.new_password}
        response = self.client.post("/api/auth/login", login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
