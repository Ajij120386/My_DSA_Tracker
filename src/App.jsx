import { Routes, Route, useParams, Link } from "react-router-dom";
import Layout from "./components/Layout";
import ProgressBar from "./components/ProgressBar";
import TopicGrid from "./components/TopicGrid";
import QuestionTable from "./components/QuestionTable";
import { topics, getAllQuestions } from "./data";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dsa-tracker-progress";

export default function App() {
  const [solved, setSolved] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSolved(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solved));
  }, [solved]);

  const toggleSolved = (id) => {
    setSolved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completed = Object.values(solved).filter(Boolean).length;
  const total = getAllQuestions().length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <div className="homepage-header">
              <h1 className="page-title">My DSA Tracker</h1>
              <ProgressBar percentage={percentage} />
            </div>
            <TopicGrid topics={topics} solved={solved} />
          </Layout>
        }
      />
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <QuestionTable
        questions={filteredQuestions}
        solved={solved}
        toggleSolved={toggleSolved}
      />
    </Layout>
  );
}