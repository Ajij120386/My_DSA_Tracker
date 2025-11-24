import { Routes, Route, useParams, Link } from "react-router-dom";
import Layout from "./components/Layout";
import ProgressBar from "./components/ProgressBar";
import TopicGrid from "./components/TopicGrid";
import QuestionTable from "./components/QuestionTable";
import MCQExam from "./components/MCQExam"; // <--- Import the Exam Component
import { topics, getAllQuestions } from "./data";
import { useEffect, useState } from "react";
import './App.css'; // Ensure CSS is imported

const STORAGE_KEY = "dsa-tracker-progress";

export default function App() {
  const [solved, setSolved] = useState({});

  // 1. Load progress from LocalStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSolved(JSON.parse(saved));
    }
  }, []);

  // 2. Save progress to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solved));
  }, [solved]);

  const toggleSolved = (id) => {
    setSolved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 3. Calculate Progress Stats
  const completed = Object.values(solved).filter(Boolean).length;
  const total = getAllQuestions().length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Routes>
      {/* --- HOMEPAGE ROUTE --- */}
      <Route
        path="/"
        element={
          <Layout>
            <div className="homepage-header">
              <h1 className="page-title">My DSA Tracker</h1>
              <ProgressBar percentage={percentage} />

              {/* --- NEW PRACTICE EXAM CARD --- */}
              {/* This matches the style of your other cards */}
              <div className="exam-card-container">
                <div className="exam-card-home">
                  <div>
                    <h2 className="exam-card-title">Practice Exam</h2>
                    <p className="exam-card-subtitle">Test your knowledge with MCQs</p>
                  </div>
                  <Link to="/exam" className="exam-card-btn">
                    Take MCQ Exam 
                  </Link>
                </div>
              </div>
              {/* ------------------------------- */}

            </div>
            
            {/* The Grid of Topics (Arrays, Strings, etc.) */}
            <TopicGrid topics={topics} solved={solved} />
          </Layout>
        }
      />

      {/* --- EXAM ROUTE --- */}
      <Route path="/exam" element={<MCQExam />} />

      {/* --- INDIVIDUAL TOPIC PAGE ROUTE --- */}
      <Route
        path="/topic/:topicId"
        element={
          <TopicPage
            topics={topics}
            solved={solved}
            toggleSolved={toggleSolved}
          />
        }
      />
    </Routes>
  );
}

// --- INTERNAL COMPONENT FOR TOPIC PAGE ---
function TopicPage({ topics, solved, toggleSolved }) {
  const { topicId } = useParams();
  const topic = topics.find((t) => t.id === topicId);
  const [search, setSearch] = useState("");

  if (!topic) {
    return (
      <Layout>
        <h1 className="page-title">Topic Not Found</h1>
        <Link to="/" className="back-link">
          ← Back to All Topics
        </Link>
      </Layout>
    );
  }

  const filteredQuestions = topic.questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Link to="/" className="back-link">
        ← Back to All Topics
      </Link>
      <h1 className="page-title">{topic.name}</h1>
      
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Questions Table */}
      <QuestionTable
        questions={filteredQuestions}
        solved={solved}
        toggleSolved={toggleSolved}
      />
    </Layout>
  );
}