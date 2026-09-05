import requests


def test_valid_registration():

    url = "http://localhost:8000/auth/register/"

    data = {
        "username": "srushti@123",
        "email": "srushti23@gmail.com",
        "password": "password123"
    }

    response = requests.post(url, json=data)

    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 400

    response_data = response.json()

    assert "username" in response_data