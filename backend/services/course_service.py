from models.course_model import Course
from database import get_db_session

class CourseService:
    @staticmethod
    def create_course(data, current_user):
        with get_db_session() as db:
            course = Course(title=data['title'], description=data['description'], instructor_id=current_user.id, schedule=data['schedule'])
            db.add(course)
            db.commit()
            db.refresh(course)
            return {"id": course.id, "title": course.title, "description": course.description, "instructor_id": course.instructor_id, "schedule": course.schedule, "status": 201}

    @staticmethod
    def get_course(course_id):
        db = get_db_session()
        course = db.query(Course).filter(Course.id == course_id).first()
        db.close()
        if course:
            return {"id": course.id, "title": course.title, "description": course.description, "instructor_id": course.instructor_id, "schedule": course.schedule, "status": 200}
        else:
            return {"error": "Course not found", "status": 404}

    @staticmethod
    def update_course(course_id, data):
        db = get_db_session()
        course = db.query(Course).filter(Course.id == course_id).first()
        if course:
            course.title = data['title']
            course.description = data['description']
            course.instructor_id = data['instructor_id']
            course.schedule = data['schedule']
            db.commit()
            db.close()
            return {"id": course.id, "title": course.title, "description": course.description, "instructor_id": course.instructor_id, "schedule": course.schedule, "status": 200}
        else:
            db.close()
            return {"error": "Course not found", "status": 404}

    @staticmethod
    def delete_course(course_id):
        db = get_db_session()
        course = db.query(Course).filter(Course.id == course_id).first()
        if course:
            db.delete(course)
            db.commit()
            db.close()
            return {"message": "Course deleted", "status": 200}
        else:
            db.close()
            return {"error": "Course not found", "status": 404}
