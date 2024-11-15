from flask import Blueprint, request, jsonify
from services.course_service import CourseService
from middleware import token_required

course_bp = Blueprint('courses', __name__)

@course_bp.route('/courses', methods=['POST'])
@token_required
def create_course(current_user):
    data = request.json
    result = CourseService.create_course(data, current_user)
    return jsonify(result), result['status']

@course_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    result = CourseService.get_course(course_id)
    return jsonify(result), result['status']

@course_bp.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    data = request.json
    result = CourseService.update_course(course_id, data)
    return jsonify(result), result['status']

@course_bp.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    result = CourseService.delete_course(course_id)
    return jsonify(result), result['status']
