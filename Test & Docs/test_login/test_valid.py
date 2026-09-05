import requests


def test_valid_login():

    url = "http://localhost:8000/auth/login/"

    data = {
        "username": "testuser2",
        "password": "password123"
    }

    response = requests.post(url, json=data)

    assert response.status_code == 200

    print(response.status_code)
    print(response.json())

    response_data = response.json()

    assert "access" in response_data
    assert "refresh" in response_data