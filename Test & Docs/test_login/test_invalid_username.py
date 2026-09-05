import requests


def test_invalid_username():

    url = "http://localhost:8000/auth/login/"

    data = {
        "username": "@guser123",
        "password": "password123"
    }

    response = requests.post(url, json=data)

    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 401

    response_data = response.json()

    assert "detail" in response_data