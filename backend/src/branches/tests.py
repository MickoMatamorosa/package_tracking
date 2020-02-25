# from rest_framework.reverse import reverse
from rest_framework import status
from accounts.tests import TestCaseSetUp


class UserBranchTestCase(TestCaseSetUp):
    def setUp(self):
        super().setUp()

        self.client.force_authenticate(user=self.user)

    def test_user_branch(self):
        data = {"name": "Test Branch Name", "address": "Test Branch Address"}
        response = self.client.post(f"/api/branch/{self.user.id}/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
