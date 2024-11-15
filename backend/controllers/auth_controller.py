from flask import Blueprint, request, jsonify, redirect, url_for
from services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register_user_route():
    try:
        # Validate input data
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        
        required_fields = ['name', 'role', 'email', 'password']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Attempt user registration
        result = AuthService.register_user(data)
        if result.get('status') == 201:
            # Registration successful, redirect to login page
            return redirect(url_for('auth.login_user_route')), 201
        
        # Return failure response from the service
        return jsonify(result), result.get('status', 500)

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


@auth_bp.route('/login', methods=['POST'])
def login_user_route():
    try:
        # Validate input data
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        
        required_fields = ['email', 'password']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Attempt user login
        result = AuthService.login_user(data)

        # Return login response
        return jsonify(result), result.get('status', 500)

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
