import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from controllers.auth_controller import auth_bp
from controllers.course_controller import course_bp
from controllers.enrollment_controller import enrollment_bp
from flask_cors import CORS

# Initialize SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key')  # Use environment variable for security
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'DATABASE_URL', "mysql+pymysql://root:root@localhost/app"
    )  # Use DATABASE_URL env variable if available
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Debug statement to ensure configurations are loaded correctly
    print(f"Using database URL: {app.config['SQLALCHEMY_DATABASE_URI']}")

    # Initialize extensions
    CORS(app)  # Enable Cross-Origin Resource Sharing
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(course_bp, url_prefix='/api')
    app.register_blueprint(enrollment_bp, url_prefix='/api')

    return app

if __name__ == "__main__":
    app = create_app()

    # Running the application
    app.run(host='0.0.0.0', port=5000, debug=True)  # Enable debug mode during development
