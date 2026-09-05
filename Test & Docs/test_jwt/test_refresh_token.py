import requests


def test_refresh_token():

    # Step 1: Login
    login_url = "http://localhost:8000/auth/login/"

    login_data = {
        "username": "testuser2",
        "password": "password123"
    }

    login_response = requests.post(
        login_url,
        json=login_data
    )

    print("Login Status:", login_response.status_code)
    print("Login Response:", login_response.json())

    assert login_response.status_code == 200

    # Step 2: Get refresh token
    refresh_token = login_response.json()["refresh"]

    # Step 3: Send refresh token
    refresh_url = "http://localhost:8000/auth/refresh/"

    refresh_data = {
        "refresh": refresh_token
    }

    refresh_response = requests.post(
        refresh_url,
        json=refresh_data
    )

    print("Refresh Status:", refresh_response.status_code)
    print("Refresh Response:", refresh_response.json())

    # Step 4: Verify new access token
    assert refresh_response.status_code == 200

    response_data = refresh_response.json()

    assert "access" in response_data