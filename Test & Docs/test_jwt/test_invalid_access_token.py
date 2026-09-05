import requests

def test_invalid_access_token():

    url = "http://localhost:8000/auth/me/"

    headers = {
        "Authorization": "Bearer invalid_token_123"
    }

    response = requests.get(
        url,
        headers=headers
    )

    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 401

    response_data = response.json()
    assert "detail" in response_data