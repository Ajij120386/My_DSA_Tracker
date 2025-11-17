export default function QuestionTable({ questions, solved, toggleSolved }) {
  return (
    <div className="table-wrapper">
      <table className="questions-table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Problem</th>
            <th>Status</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => {
            const isDone = solved[q.id];
            return (
              <tr key={q.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={!!isDone}
                    onChange={() => toggleSolved(q.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>
                  <a href={q.url} target="_blank" rel="noreferrer">
                    {q.title}
                  </a>
                </td>
                <td>
                  <span
                    className={
                      "status-badge " +
                      (isDone ? "status-complete" : "status-pending")
                    }
                  >
                    {isDone ? "Complete" : "Pending"}
                  </span>
                </td>
                <td>
                  <img
                    src={q.platformLogo}
                    alt={`${q.platform} logo`}
                    className="platform-logo"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}