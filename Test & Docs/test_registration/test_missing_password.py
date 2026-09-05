import requests


def test_missing_password():

    url = "http://localhost:8000/auth/register/"

    data = {
        "username": "kondji456",
        "email": "kondji456@gmail.com"
    }

    response = requests.post(url, json=data)

    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 400

    response_data = response.json()

    assert "password" in response_data