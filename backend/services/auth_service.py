from werkzeug.security import generate_password_hash, check_password_hash
from backend.models.user_model import User
from backend.database import get_db_session
import jwt
import datetime
import os

class AuthService:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')  # Use an environment variable for better security

    @staticmethod
    def register_user(data):
        try:
            with get_db_session() as db:
                # Check if user already exists
                existing_user = db.query(User).filter(User.email == data['email']).first()
                if existing_user:
                    return {"status": 400, "message": "User already exists"}

                # Create a new user with a hashed password
                hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
                user = User(
                    name=data['name'],
                    role=data['role'],  # Ensure data['role'] aligns with your RoleEnum values
                    email=data['email'],
                    password_hash=hashed_password
                )
                db.add(user)
                db.commit()
                db.refresh(user)

                # Generate JWT token
                token = AuthService._generate_token(user.id, user.role.value)

                return {
                    "status": 201,
                    "message": "User registered successfully",
                    "data": {"token": token, "role": user.role.value}
                }
        except jwt.PyJWTError as e:
            return {"status": 500, "message": "Error generating token", "error": str(e)}
        except Exception as e:
            return {"status": 500, "message": "An unexpected error occurred during registration", "error": str(e)}

    @staticmethod
    def login_user(data):
        try:
            with get_db_session() as db:
                # Find user by email
                user = db.query(User).filter(User.email == data['email']).first()
                if not user:
                    return {"status": 401, "message": "Invalid credentials"}

                # Verify password
                if not check_password_hash(user.password_hash, data['password']):
                    return {"status": 401, "message": "Invalid credentials"}

                # Generate JWT token
                token = AuthService._generate_token(user.id, user.role.value)

                return {
                    "status": 200,
                    "message": "Login successful",
                    "data": {"token": token, "role": user.role.value}
                }
        except jwt.PyJWTError as e:
            return {"status": 500, "message": "Error generating token", "error": str(e)}
        except Exception as e:
            return {"status": 500, "message": "An unexpected error occurred during login", "error": str(e)}

    @staticmethod
    def _generate_token(user_id, role):
        """
        Generate a JWT token with user_id, role, and expiration.
        """
        payload = {
            'user_id': user_id,
            'role': role,  # RoleEnum should be converted to a string if necessary
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        return jwt.encode(payload, AuthService.SECRET_KEY, algorithm='HS256')
