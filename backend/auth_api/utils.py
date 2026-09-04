import uuid
from django.core.cache import cache
from django.utils.timezone import now

def add_device_session(user_id, refresh_token, user_agent, ip_address):
    """Stores a new active session in Redis mapped to the user."""
    session_id = str(uuid.uuid4())
    cache_key = f"user_{user_id}_sessions"
    
    # Retrieve existing sessions or start a new dictionary
    sessions = cache.get(cache_key, {})
    
    # Map the unique session ID to the device metadata and token
    sessions[session_id] = {
        "refresh_token": refresh_token,
        "device": user_agent,
        "ip": ip_address,
        "login_time": now().isoformat()
    }
    
    # Save back to Redis (Timeout is set to 7 days in seconds to match refresh token lifespan)
    cache.set(cache_key, sessions, timeout=604800)
    
    return session_id

def get_user_sessions(user_id):
    """Retrieves all active sessions for a user."""
    cache_key = f"user_{user_id}_sessions"
    return cache.get(cache_key, {})

def remove_device_session(user_id, session_id):
    """Removes a specific session and returns its refresh token for blacklisting."""
    cache_key = f"user_{user_id}_sessions"
    sessions = cache.get(cache_key, {})
    
    if session_id in sessions:
        refresh_token = sessions.pop(session_id).get('refresh_token')
        cache.set(cache_key, sessions, timeout=604800)
        return refresh_token
        
    return None