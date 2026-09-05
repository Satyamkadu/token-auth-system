import requests


def test_access_token():

    BASE_URL = "http://localhost:8000/auth"

    # Step 1: Login
    login_data = {
        "username": "srushti@123",
        "password": "password123"
    }

    login_response = requests.post(
        f"{BASE_URL}/login/",
        json=login_data
    )

    assert login_response.status_code == 200

    # Step 2: Extract access token
    access_token = login_response.json()["access"]

    # Step 3: Send token in Authorization header
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    me_response = requests.get(
        f"{BASE_URL}/me/",
        headers=headers
    )

    print("Status Code:", me_response.status_code)
    print("Response:", me_response.json())

    # Step 4: Validate
    assert me_response.status_code == 200

    response_data = me_response.json()

    assert response_data["username"] == "srushti@123"