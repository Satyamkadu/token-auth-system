import requests

def test_no_access_token():

    url = "http://localhost:8000/auth/me/"

    response = requests.get(url)

    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 401

    response_data = response.json()
    assert "detail" in response_data