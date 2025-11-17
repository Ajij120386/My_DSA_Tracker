import TopicCard from "./TopicCard";

export default function TopicGrid({ topics, solved }) {
  return (
    <div className="topics-grid">
      {topics.map(topic => (
        <TopicCard
          key={topic.id}
          topic={topic}
          solved={solved}
        />
      ))}
    </div>
  );
}
