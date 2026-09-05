import requests


def test_valid_registration():

    url = "http://localhost:8000/auth/register/"

    data = {
        "username": "satyam@12",
        "email": "satyam@gmail.com",
        "password": "password123"
    }

    response = requests.post(url, json=data)

    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 201

    response_data = response.json()


    