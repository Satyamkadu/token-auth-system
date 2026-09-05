import requests

url = "http://localhost:8000/auth/register/"

data = {
    "username": "testuser2",
    "password": "password123"
}

response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print(response.json())