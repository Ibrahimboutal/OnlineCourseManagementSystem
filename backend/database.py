import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
import logging

# Replace with your MySQL connection details
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:root@localhost/app")

# Set up SQLAlchemy engine and session
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Context manager for database sessions
@contextmanager
def get_db_session():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        db.rollback()
        raise
    finally:
        db.close()

# Database initialization function
def init_db():
    try:
        # Import all models here to ensure they are registered with Base.metadata
        import models.user_model
        import models.course_model
        import models.enrollment_model
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully.")
    except Exception as e:
        logger.exception("Error initializing the database: %s", e)
