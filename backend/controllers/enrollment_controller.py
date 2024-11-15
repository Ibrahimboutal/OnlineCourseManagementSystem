from flask import Blueprint, request, jsonify
from services.enrollment_service import EnrollmentService

enrollment_bp = Blueprint('enrollments', __name__)

@enrollment_bp.route('/enrollments', methods=['POST'])
def enroll_student():
    data = request.json
    result = EnrollmentService.enroll_student(data)
    return jsonify(result), result['status']

@enrollment_bp.route('/enrollments/<int:enrollment_id>', methods=['GET'])
def get_enrollment(enrollment_id):
    result = EnrollmentService.get_enrollment(enrollment_id)
    return jsonify(result), result['status']

@enrollment_bp.route('/enrollments/<int:enrollment_id>', methods=['DELETE'])
def delete_enrollment(enrollment_id):
    result = EnrollmentService.delete_enrollment(enrollment_id)
    return jsonify(result), result['status']
