from django.contrib.auth.models import User
from knox.models import AuthToken
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework import status


class TestCaseSetUp(APITestCase):

    # create user and its token
    def setUp(self):
        self.username = "lgp-drg1"
        self.password = "daraga123"
        self.user = User.objects.create_user(
            username=self.username, password=self.password
        )


class AuthenticationTestCase(TestCaseSetUp):
    """Test user authetication"""

    def setUp(self):
        super().setUp()
        self.token = AuthToken.objects.create(self.user)[1]

    def test_user_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token)
        response = self.client.get(reverse("user-account"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_un_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION="Invalid Token")
        response = self.client.get(reverse("user-account"))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class UserTestCase(TestCaseSetUp):
    """Check authenticated user get correct data"""

    def test_user_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("user-account"))

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
    """ Test:
         * Update password using incorrect password
         * Update password using correct password
         * Login user with old password
         * Login user with new password
    """

    def setUp(self):
        super().setUp()

        # change password fields
        self.old_password = self.password
        self.new_password = "123daraga"
        self.client.force_authenticate(user=self.user)

    def change_password(self, data):
        return self.client.patch(reverse("change_password"), data)

    def user_login(self, data):
        # execute change password
        self.test_change_with_correct_password()

        return self.client.post(reverse("user-login"), data)

    def test_change_with_incorrect_password(self):
        # change password
        data = {"old_password": "incorrect-password", "new_password": self.new_password}
        response = self.change_password(data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_with_correct_password(self):
        # change password
        data = {"old_password": self.old_password, "new_password": self.new_password}
        response = self.change_password(data)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_login_old_password(self):
        # login using old password
        data = {"username": self.username, "password": self.old_password}

        response = self.user_login(data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_new_password(self):
        # login using new password
        data = {"username": self.username, "password": self.new_password}

        response = self.user_login(data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
