import requests


def test_invalid_refresh_token():

    url = "http://localhost:8000/auth/refresh/"

    data = {
        "refresh": "invalid_refresh_token_123"
    }

    response = requests.post(
        url,
        json=data
    )

    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 401

    response_data = response.json()
    assert "detail" in response_data