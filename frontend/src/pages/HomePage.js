import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="header__logo">Online Course Management</div>
        <nav className="header__nav">
          <Link to="/" className="header__link">Home</Link>
          <Link to="/register" className="header__link">Register</Link>
          <Link to="/login" className="header__link">Login</Link>
        </nav>
      </header>
      
      <main className="main-content">
        <h1>Welcome to the Online Course Management System</h1>
        
        <section className="featured-courses">
          <h2>Featured Courses</h2>
          <div className="course-grid">
            {[
              { title: "Introduction to Python", description: "Learn the basics of Python programming in this beginner-friendly course." },
              { title: "Web Development Bootcamp", description: "Become a full-stack web developer with hands-on projects and expert guidance." },
              { title: "Data Science with R", description: "Dive into data science with R programming and real-world datasets." }
            ].map((course, index) => (
              <div className="course-card" key={index}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button className="course-card__btn">Learn More</button>
              </div>
            ))}
          </div>
        </section>

        <section className="upcoming-events">
          <h2>Upcoming Events</h2>
          <ul className="events-list">
            {[
              { title: "Webinar: AI in Modern Business", description: "Join our live webinar to learn how AI is transforming industries." },
              { title: "Workshop: Advanced CSS Techniques", description: "Level up your web design skills with our advanced CSS workshop." }
            ].map((event, index) => (
              <li className="events-list__item" key={index}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <button className="events-list__btn">Register Now</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="testimonials">
          <h2>What Our Students Say</h2>
          <div className="testimonial-grid">
            {[
              { feedback: "The Python course was fantastic! I now feel confident in my programming skills.", name: "Jane Doe" },
              { feedback: "The instructors are knowledgeable and the content is top-notch. Highly recommended!", name: "John Smith" }
            ].map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <p>"{testimonial.feedback}"</p>
                <h4>- {testimonial.name}</h4>
              </div>
            ))}
          </div>
        </section>

        <section className="call-to-action">
          <h2>Get Started Today!</h2>
          
          
          <Link to="/register" className="cta-btn signup-btn">
          Sign Up
          </Link>
          <Link to="/login" className="login-btn">
            Log In
          </Link>
        
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Online Course Management System. All rights reserved.</p>
        <div className="footer__social-media">
          <a href="#" className="footer__link">Facebook</a>
          <a href="#" className="footer__link">LinkedIn</a>
          <a href="#" className="footer__link">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
