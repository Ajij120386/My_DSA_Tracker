import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MathText from './MathText';
import './MCQExam.css'; // Importing the styled CSS

export default function MCQExam() {
  const [step, setStep] = useState('input'); // 'input' | 'exam' | 'result'
  const [jsonInput, setJsonInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Stores index: optionIndex
  const [timeLeft, setTimeLeft] = useState(0);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, blank: 0, score: 0 });

  // Helper: 0 -> A, 1 -> B
  const getLetter = (idx) => String.fromCharCode(65 + idx);

  // --- 1. START EXAM ---
  const startExam = () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      
      // Basic Validation
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error("Invalid Format");
      }

      setQuestions(parsedData);
      setAnswers({});
      setTimeLeft(parsedData.length * 60); // 1 Minute per question
      setStep('exam');
    } catch (e) {
      alert("Invalid JSON! Please check format: [{ \"text\": \"...\", \"options\": [...], \"correctAnswer\": 0 }]");
    }
  };

  // --- 2. SUBMIT EXAM ---
  const submitExam = () => {
    let correct = 0;
    let wrong = 0;
    let blank = 0;
    let score = 0;

    questions.forEach((q, index) => {
      const userAns = answers[index];
      
      if (userAns === undefined) {
        blank++;
      } else if (userAns === q.correctAnswer) {
        correct++;
        score += 1;
      } else {
        wrong++;
        score -= 0.25; // Negative Marking
      }
    });

    setStats({ correct, wrong, blank, score });
    setStep('result');
  };

  // --- TIMER EFFECT ---
  useEffect(() => {
    if (step === 'exam' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && step === 'exam') {
      submitExam(); // Auto Submit
    }
  }, [step, timeLeft]);

  // --- PIE CHART STYLE ---
  const getPieStyle = () => {
    const total = questions.length;
    if (total === 0) return {};
    const correctDeg = (stats.correct / total) * 360;
    const wrongDeg = (stats.wrong / total) * 360;
    
    // Conic Gradient: Green -> Red -> Yellow
    return {
      background: `conic-gradient(
        #22c55e 0deg ${correctDeg}deg, 
        #ef4444 ${correctDeg}deg ${correctDeg + wrongDeg}deg, 
        #f59e0b ${correctDeg + wrongDeg}deg 360deg
      )`
    };
  };

  // =========================================================
  // RENDER UI
  // =========================================================
  return (
    <div className="exam-wrapper-centered">
      
      {/* --- STEP 1: ADMIN PANEL --- */}
      {step === 'input' && (
        <div className="exam-container">
           
           {/* BACK BUTTON */}
           <div style={{marginBottom: '20px'}}>
             <Link to="/" className="exam-back-link">
               ← Back to All Topics
             </Link>
           </div>

           <div className="admin-card">
            <h2 className="admin-title">Exam Admin Panel</h2>
            <p style={{color:'#6b7280', marginBottom: 20}}>
              Paste your JSON Question set below to generate the exam.
            </p>
            <textarea 
              className="json-input" 
              placeholder='[ {"text":"Question 1...", "options":["A","B"], "correctAnswer":0} ]' 
              value={jsonInput} 
              onChange={(e) => setJsonInput(e.target.value)} 
            />
            <button className="exam-btn" onClick={startExam}>
              Start Exam 🚀
            </button>
          </div>
        </div>
      )}

      {/* --- STEP 2: EXAM INTERFACE --- */}
      {step === 'exam' && (
        <div className="exam-container">
          
          {/* Timer Bar */}
          <div className="timer-bar">
            <span>MCQ Exam</span>
            <span>⏱ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>

          {/* Question Cards */}
          {questions.map((q, idx) => (
            <div key={idx} className="question-card">
              <div className="question-header">
                <span style={{color: '#6b7280'}}>{idx + 1}.</span>
                <div style={{flex: 1}}><MathText text={q.text} /></div>
              </div>

              <div className="options-grid">
                {q.options.map((opt, optIdx) => (
                  <label key={optIdx} className="option-label">
                    <input 
                      type="radio" 
                      name={`question-${idx}`} 
                      checked={answers[idx] === optIdx} 
                      onChange={() => setAnswers({ ...answers, [idx]: optIdx })} 
                    />
                    <div className="option-circle">{getLetter(optIdx)}</div>
                    <div className="option-text"><MathText text={opt} /></div>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button className="exam-btn" onClick={submitExam}>
            Submit Answer Sheet
          </button>
        </div>
      )}

      {/* --- STEP 3: RESULT DASHBOARD --- */}
      {step === 'result' && (
        <div className="exam-container">
          
          {/* Dashboard Card */}
          <div className="result-dashboard">
            <div className="result-score-title">Your Total Score</div>
            <div className="result-score-value">
              {stats.score.toFixed(2)} 
              <span style={{fontSize:'1.5rem', color:'#9ca3af', fontWeight: 500}}>
                / {questions.length}
              </span>
            </div>

            <div className="pie-chart" style={getPieStyle()}></div>

            <div className="stats-grid">
              <div className="stat-card stat-correct">
                <span className="stat-num">{stats.correct}</span>
                <span className="stat-label">Correct</span>
              </div>
              <div className="stat-card stat-wrong">
                <span className="stat-num">{stats.wrong}</span>
                <span className="stat-label">Wrong</span>
              </div>
              <div className="stat-card stat-skip">
                <span className="stat-num">{stats.blank}</span>
                <span className="stat-label">Skipped</span>
              </div>
            </div>
          </div>

          {/* Detailed Review List */}
          {questions.map((q, idx) => {
            const uAns = answers[idx];
            const isCorr = uAns === q.correctAnswer;
            const isSkip = uAns === undefined;

            // Determine Border Color Class
            let statusClass = "status-skip";
            if (!isSkip) statusClass = isCorr ? "status-correct" : "status-wrong";

            return (
              <div key={idx} className={`review-card ${statusClass}`}>
                
                {/* Review Header */}
                <div className="review-header">
                  <div style={{flex:1, fontSize:'1.1rem', fontWeight:600}}>
                    <span style={{marginRight:10, color:'#6b7280'}}>{idx+1}.</span>
                    <MathText text={q.text}/>
                  </div>
                  <div>
                    {isSkip && <span className="status-badge badge-skip">Skipped</span>}
                    {!isSkip && isCorr && <span className="status-badge badge-correct">Correct</span>}
                    {!isSkip && !isCorr && <span className="status-badge badge-wrong">Wrong</span>}
                  </div>
                </div>

                {/* Options Logic */}
                <div style={{display:'flex', flexDirection:'column', gap:6}}>
                  {q.options.map((opt, oIdx) => {
                    let optClass = "review-option opt-default";
                    
                    // Logic for coloring options
                    if(oIdx === uAns && isCorr) optClass = "review-option opt-correct"; // User Picked Right
                    else if(oIdx === uAns && !isCorr) optClass = "review-option opt-wrong"; // User Picked Wrong
                    else if(oIdx === q.correctAnswer && !isCorr) optClass = "review-option opt-missed"; // Show Correct Answer if user missed

                    return (
                      <div key={oIdx} className={optClass}>
                        <div className="option-circle" style={{
                          width:28, height:28, fontSize:12, background:'transparent', border:'none'
                        }}>
                          {getLetter(oIdx)}
                        </div>
                        <div style={{flex:1}}><MathText text={opt}/></div>
                        
                        {/* Status Icons */}
                        {oIdx === uAns && isCorr && <span>✅</span>}
                        {oIdx === uAns && !isCorr && <span>❌</span>}
                        {/* Correct Answer Checkmark for missed questions */}
                        {oIdx === q.correctAnswer && !isCorr && oIdx !== uAns && (
                           <span style={{fontWeight:'bold', fontSize:'1.2rem', color:'#166534'}}>✔</span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Explanation Box */}
                {(q.explanation || q.explanationImage) && (
                  <div className="explanation-box">
                    <span className="expl-title">💡 Explanation</span>
                    {q.explanation && <div><MathText text={q.explanation} /></div>}
                    {q.explanationImage && (
                      <img src={q.explanationImage} className="expl-image" alt="Solution" />
                    )}
                  </div>
                )}

              </div>
            )
          })}

          <button className="exam-btn" onClick={() => setStep('input')}>
            Take New Exam
          </button>
        </div>
      )}
    </div>
  );
}