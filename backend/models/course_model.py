from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String)
    instructor_id = Column(Integer, ForeignKey('users.id'))
    schedule = Column(String, nullable=False)

    instructor = relationship("User")
    enrollments = relationship("Enrollment", back_populates="course")
