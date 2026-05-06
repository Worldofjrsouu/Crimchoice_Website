import { useState } from "react";
import { Link } from "react-router-dom";
import "./quiz.css";

export default function QuizQuestions() {
  const [questions, setQuestions] = useState([]);

  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const handleSave = () => {
    if (!form.question.trim() || form.options.some(o => !o.trim())) {
      alert("Please complete all fields");
      return;
    }

    if (editIndex !== null) {
      const updated = [...questions];
      updated[editIndex] = { ...form };
      setQuestions(updated);
      setEditIndex(null);
    } else {
      setQuestions([...questions, { ...form }]);
    }

    setForm({
      question: "",
      options: ["", "", "", ""],
    });
  };

  const handleEdit = (index) => {
    setForm({
      question: questions[index].question,
      options: [...questions[index].options],
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);

    if (editIndex === index) {
      setForm({
        question: "",
        options: ["", "", "", ""],
      });
      setEditIndex(null);
    }
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="sidebar-title">Pathly</h1>

        <ul className="sidebar-menu">
          <li><Link to="/AdminDashboard">Dashboard</Link></li>
          <li><Link to="/manageCourses">Manage Courses</Link></li>
          <li className="active">Quiz Questions</li>
          <li><Link to="/users">Users</Link></li>
          <li>
            <a href="http://127.0.0.1:3000/Website/index/loginforms.html?vscode-livepreview=true">
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main-content quiz-page">

        <h2 className="page-title">Quiz Questions</h2>

        <div className="quiz-layout">

          {/* LEFT: LIST */}
          <div className="quiz-list-panel">
            <h3>Questions</h3>

            {questions.length === 0 && (
              <p className="empty">No questions yet</p>
            )}

            {questions.map((q, index) => (
              <div
                key={index}
                className={`quiz-item ${editIndex === index ? "active" : ""}`}
              >
                <div onClick={() => handleEdit(index)}>
                  <p className="quiz-q">{q.question}</p>
                  <small>{q.options.length} options</small>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: FORM */}
          <div className="quiz-editor">

            <h3>{editIndex !== null ? "Edit Question" : "Create Question"}</h3>

            <div className="form-card">

              <input
                className="input"
                type="text"
                placeholder="Enter your question..."
                value={form.question}
                onChange={(e) =>
                  setForm({ ...form, question: e.target.value })
                }
              />

              <div className="options-grid">
                {form.options.map((opt, i) => (
                  <input
                    key={i}
                    className="input"
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(i, e.target.value)
                    }
                  />
                ))}
              </div>

              <button className="save-btn" onClick={handleSave}>
                {editIndex !== null ? "Update Question" : "Add Question"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}