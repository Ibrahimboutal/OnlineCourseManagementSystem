from flask import Blueprint, request, jsonify
from models.enrollment_model import Enrollment
from database import SessionLocal
from models.course_model import Course
from models.user_model import User

enrollment_bp = Blueprint('enrollments', __name__)

@enrollment_bp.route('/enrollments', methods=['POST'])
def enroll_student():
    data = request.json
    with SessionLocal() as db:
        # Check if the course exists
        course = db.query(Course).filter(Course.id == data['course_id']).first()
        if not course:
            return jsonify({"error": "Course not found"}), 404
        
        # Check if the student exists
        student = db.query(User).filter(User.id == data['student_id'], User.role == 'student').first()
        if not student:
            return jsonify({"error": "Student not found or not a student"}), 404
        
        # Check if already enrolled
        existing_enrollment = db.query(Enrollment).filter(
            Enrollment.student_id == data['student_id'],
            Enrollment.course_id == data['course_id']
        ).first()
        if existing_enrollment:
            return jsonify({"error": "Student is already enrolled in this course"}), 400

        # Create new enrollment
        enrollment = Enrollment(
            student_id=data['student_id'],
            course_id=data['course_id']
        )
        db.add(enrollment)
        db.commit()
        db.refresh(enrollment)

    return jsonify({
        "id": enrollment.id,
        "student_id": enrollment.student_id,
        "course_id": enrollment.course_id
    }), 201
