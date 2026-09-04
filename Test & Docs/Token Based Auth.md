# Token-Based Authentication

A full-stack authentication system using JWT access and refresh tokens.

## Features
- Registration and login
- Password hashing
- Access tokens
- Refresh tokens
- Token rotation
- Token expiration
- Token revocation or blacklist
- Role-based authorization
- Multi-device session management

## Suggested Stack
- Frontend: React
- Backend: FastAPI/Node/Flask/Django/Flask
- Database: PostgreSQL/MySQL/SQLite
- Cache/Blacklist(Optional): Redis

## Core Flow
1. User logs in.
2. Server returns access and refresh tokens.
3. Client uses the access token for protected APIs.
4. Expired access tokens are renewed using refresh tokens.
5. Refresh tokens are rotated and can be revoked.

## API Ideas
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout
- GET /auth/me
- GET /auth/devices
- DELETE /auth/devices/{device_id}

## Learning Goals
JWT, token lifecycle, refresh token rotation, authorization, and API security.
