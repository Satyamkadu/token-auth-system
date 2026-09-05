# API Test Cases – Token-Based Authentication

## Test Case Summary

| Test Case ID | Module | Test Scenario | Test Steps / Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-REG-001 | Registration | Valid user registration | Send valid username, email and password | 201 Created; user registered successfully | 201; user registered successfully | PASS |
| TC-REG-002 | Registration | Duplicate username | Register using an existing username | 400 Bad Request; username error | 400; "A user with that username already exists." | PASS |
| TC-REG-003 | Registration | Missing password | Send username and email without password | 400 Bad Request; password error | 400; "This field is required." | PASS |
| TC-LOGIN-001 | Login | Valid login | Send valid username and password | 200 OK; access and refresh tokens returned | 200; access and refresh tokens received | PASS |
| TC-LOGIN-002 | Login | Invalid password | Send valid username with incorrect password | 401 Unauthorized | 401; authentication failed | PASS |
| TC-LOGIN-003 | Login | Invalid username | Send invalid username and password | 401 Unauthorized | 401; authentication failed | PASS |
| TC-JWT-001 | JWT | Valid access token | Login → get access token → call `/auth/me/` with Bearer token | 200 OK; user profile returned | 200; user profile returned | PASS |
| TC-JWT-002 | JWT | No access token | Call `/auth/me/` without Authorization header | 401 Unauthorized | 401; "Authentication credentials were not provided." | PASS |
| TC-JWT-003 | JWT | Invalid access token | Call `/auth/me/` with fake token | 401 Unauthorized | 401; token is invalid | PASS |
| TC-JWT-004 | JWT | Valid refresh token | Login → get refresh token → call `/auth/refresh/` | 200 OK; new access token returned | 200; new access token received | PASS |
| TC-JWT-005 | JWT | Invalid refresh token | Send fake refresh token to `/auth/refresh/` | 401 Unauthorized | 401; invalid refresh token rejected | PASS |

## Execution Summary

| Total Test Cases | Passed | Failed |
|---:|---:|---:|
| 11 | 11 | 0 |