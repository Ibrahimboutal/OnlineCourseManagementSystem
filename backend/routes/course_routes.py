from flask import Blueprint, request, jsonify
from models.course_model import Course
from database import SessionLocal
from functools import wraps
import jwt
from models.user_model import User
import os

course_bp = Blueprint('courses', __name__)

# Use environment variable for the JWT secret key
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_secret_key")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            with SessionLocal() as db:
                current_user = db.query(User).get(data['user_id'])
                if current_user is None:
                    return jsonify({'error': 'User not found!'}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token!'}), 403

        return f(current_user, *args, **kwargs)
    return decorated

@course_bp.route('/courses', methods=['POST'])
@token_required
def create_course(current_user):
    if current_user.role != 'instructor':
        return jsonify({'error': 'Permission denied!'}), 403

    data = request.json
    try:
        with SessionLocal() as db:
            course = Course(
                title=data['title'],
                description=data['description'],
                instructor_id=current_user.id,
                schedule=data['schedule']
            )
            db.add(course)
            db.commit()
            db.refresh(course)
        return jsonify({
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "instructor_id": course.instructor_id,
            "schedule": course.schedule
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@course_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    with SessionLocal() as db:
        course = db.query(Course).filter(Course.id == course_id).first()
        if course:
            return jsonify({
                "id": course.id,
                "title": course.title,
                "description": course.description,
                "instructor_id": course.instructor_id,
                "schedule": course.schedule
            }), 200
        else:
            return jsonify({"error": "Course not found"}), 404

@course_bp.route('/courses/<int:course_id>', methods=['PUT'])
@token_required
def update_course(current_user, course_id):
    if current_user.role != 'instructor':
        return jsonify({'error': 'Permission denied!'}), 403

    data = request.json
    with SessionLocal() as db:
        course = db.query(Course).filter(Course.id == course_id).first()
        if course:
            course.title = data['title']
            course.description = data['description']
            course.schedule = data['schedule']
            db.commit()
            return jsonify({
                "id": course.id,
                "title": course.title,
                "description": course.description,
                "instructor_id": course.instructor_id,
                "schedule": course.schedule
            }), 200
        else:
            return jsonify({"error": "Course not found"}), 404

@course_bp.route('/courses/<int:course_id>', methods=['DELETE'])
@token_required
def delete_course(current_user, course_id):
    if current_user.role != 'instructor':
        return jsonify({'error': 'Permission denied!'}), 403

    with SessionLocal() as db:
        course = db.query(Course).filter(Course.id == course_id).first()
        if course:
            db.delete(course)
            db.commit()
            return jsonify({"message": "Course deleted"}), 200
        else:
            return jsonify({"error": "Course not found"}), 404
