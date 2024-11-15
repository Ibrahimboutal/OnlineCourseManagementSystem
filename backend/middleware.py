from functools import wraps
from flask import request, jsonify
import jwt
from models.user_model import User
from database import SessionLocal

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Extract the Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({'error': 'Token is missing or malformed!'}), 403

        # Extract the token from the header
        token = auth_header.split(" ")[1]

        try:
            # Decode the JWT token and ensure expiration is validated
            data = jwt.decode(
                token,
                'your_secret_key',
                algorithms=['HS256'],
                options={"require": ["exp"]}
            )
            user_id = data.get('user_id')
            if not user_id:
                return jsonify({'error': 'Invalid token payload!'}), 403

            # Query the user from the database
            with SessionLocal() as db:
                current_user = db.query(User).filter_by(id=user_id).first()
                if not current_user:
                    return jsonify({'error': 'User not found!'}), 404

        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token is invalid!'}), 403
        except Exception as e:
            return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

        # Pass the user to the decorated function
        return f(current_user, *args, **kwargs)

    return decorated
