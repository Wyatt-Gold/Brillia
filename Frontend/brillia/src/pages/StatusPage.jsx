import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./StatusPage.css";

const lessons = [
  { name: "Math", progress: 80 },
  { name: "Science", progress: 45 },
  { name: "History", progress: 100 },
  { name: "English", progress: 60 },
];

function StatusPage() {
  return (
    <>
      <Header />
      <div className="status-page">
        <h2>Lesson Completion Status</h2>
        <div className="lesson-status-list">
          {lessons.map((lesson, idx) => (
            <div className="lesson-status" key={idx}>
              <div className="lesson-title">{lesson.name}</div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${lesson.progress}%` }}
                ></div>
              </div>
              <div className="progress-label">{lesson.progress}% Complete</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StatusPage;
