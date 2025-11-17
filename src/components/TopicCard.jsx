import { Link } from "react-router-dom";

export default function TopicCard({ topic, solved }) {
  const total = topic.questions.length;
  const completed = topic.questions.filter((q) => solved[q.id]).length;

  return (
    <div className="topic-card">
      <div className="topic-info">
        <div className="topic-title">{topic.name}</div>
        <div className="topic-subtitle">
          {completed} / {total} Completed
        </div>
      </div>

      <Link to={`/topic/${topic.id}`}>
        <button className="btn-primary">Solve Now</button>
      </Link>
    </div>
  );
}