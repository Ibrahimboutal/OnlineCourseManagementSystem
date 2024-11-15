from models.enrollment_model import Enrollment
from database import SessionLocal

class EnrollmentService:
    @staticmethod
    def enroll_student(data):
        db = SessionLocal()
        existing_enrollment = db.query(Enrollment).filter(Enrollment.student_id == data['student_id'], Enrollment.course_id == data['course_id']).first()
        if existing_enrollment:
            db.close()
            return {"error": "Student is already enrolled in this course", "status": 400}

        enrollment = Enrollment(student_id=data['student_id'], course_id=data['course_id'])
        db.add(enrollment)
        db.commit()
        db.refresh(enrollment)
        db.close()
        return {"id": enrollment.id, "student_id": enrollment.student_id, "course_id": enrollment.course_id, "status": 201}

    @staticmethod
    def get_enrollment(enrollment_id):
        db = SessionLocal()
        enrollment = db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()
        db.close()
        if enrollment:
            return {"id": enrollment.id, "student_id": enrollment.student_id, "course_id": enrollment.course_id, "status": 200}
        else:
            return {"error": "Enrollment not found", "status": 404}

    @staticmethod
    def delete_enrollment(enrollment_id):
        db = SessionLocal()
        enrollment = db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()
        if enrollment:
            db.delete(enrollment)
            db.commit()
            db.close()
            return {"message": "Enrollment deleted", "status": 200}
        else:
            db.close()
            return {"error": "Enrollment not found", "status": 404}
