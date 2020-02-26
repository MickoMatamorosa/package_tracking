# from rest_framework.reverse import reverse
from rest_framework import status
from accounts.tests import TestCaseSetUp
from .models import Branch


class UserBranchTestCase(TestCaseSetUp):
    def setUp(self):
        super().setUp()
        self.client.force_authenticate(user=self.user)

    def test_create_user_branch(self):
        data = {"name": "Test Branch Name", "address": "Test Branch Address"}
        data["user"] = self.user.id
        response = self.client.post("/api/branch/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_udpate_user_branch(self):
        self.test_create_user_branch()
        user_branch = self.user.branch
        data = {
            "name": "Test Updated Branch Name",
            "address": "Test Updated Branch Address",
        }
        response = self.client.patch(f"/api/branch/{user_branch.id}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserStatusFlowTestCase(TestCaseSetUp):
    def setUp(self):
        super().setUp()
        self.client.force_authenticate(user=self.user)
        Branch.objects.create(
            user=self.user, name="Branch Name", address="Branch Address"
        )

    def test_create_branch_status_flow(self):
        data = {"branch_type": "sending", "description": "transaction description"}
        response = self.client.post("/api/branch/statusflow/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data

    def test_get_branch_status_flow(self):
        self.test_create_branch_status_flow()
        response = self.client.get("/api/branch/statusflow/")
        self.assertEqual(len(response.data), 1)

    def test_update_branch_status_flow(self):
        stat_flow = self.test_create_branch_status_flow()
        data = {
            "queue": stat_flow["queue"],
            "branch_type": "sending",
            "description": "update transaction description",
        }
        response = self.client.patch(f"/api/branch/statusflow/{stat_flow['id']}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class StatusFlowQueuingTestCase(TestCaseSetUp):

    pass
