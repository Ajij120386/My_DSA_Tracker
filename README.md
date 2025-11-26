# Ultimate DSA Tracker & Exam Platform 🚀

A comprehensive, modern, and responsive web application designed to help developers master Data Structures and Algorithms. This isn't just a checklist; it's a complete learning platform featuring progress tracking and a **built-in MCQ Exam System** with support for Mathematical formulas and Code snippets.


**Live Demo:** [https://ajij-dsa-tracker.vercel.app/](https://ajij-dsa-tracker.vercel.app/)

## ✨ Features

### 🧠 DSA Progress Tracker
-   **Categorized Roadmap**: Problems are organized by topics (Arrays, Linked Lists, DP, Graph, etc.).
-   **Visual Progress Bars**: Track completion status globally and per topic.
-   **Persistent Data**: Your progress is saved automatically to LocalStorage.
-   **Platform Integration**: Direct links to LeetCode, GeeksforGeeks, and HackerEarth problems.
-   **Live Search**: Instantly filter problems by name within categories.

### 📝 Interactive MCQ Exam System
-   **Dynamic Exam Generation**: Create exams instantly by pasting a JSON question set.
-   **Rich Text Support**: Renders **Math Formulas** (LaTeX), **Code Blocks** (with syntax styling), and **Bold** text.
-   **Real-time Timer**: Auto-submits the exam when time runs out.
-   **Smart Result Dashboard**:
    -   Interactive Pie Chart for performance analysis.
    -   Detailed question review with "Correct", "Wrong", and "Skipped" indicators.
    -   Explanation section for deep learning.


## 📸 Screenshots

### Homepage                            

<img width="1920" height="2181" alt="image" src="https://github.com/user-attachments/assets/c16fcf20-140d-4c6f-ba4c-036d4d8cfb7a" />


### Topic Page

<img width="1920" height="1480" alt="image" src="https://github.com/user-attachments/assets/0717a9a1-61b1-40a8-a56f-60209b1df161" />

### MCQ Exam Admin Interface

<img width="1920" height="1061" alt="image" src="https://github.com/user-attachments/assets/5396e5b0-7626-4b1c-b486-f45f20bdc95d" />

### MCQ Exam Question Dashboard

<img width="1920" height="4232" alt="image" src="https://github.com/user-attachments/assets/bab788bb-edae-4d55-a4a2-cfa336ba7caf" />


### Exam Result Dashboard

<img width="1920" height="4585" alt="image" src="https://github.com/user-attachments/assets/a4dc8142-9eae-402f-b337-2e174e25f5fb" />


## 🛠️ Tech Stack

-   **Frontend:** [React](https://reactjs.org/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** Plain CSS with CSS Variables
-   **Deployment:** Ready for services like Vercel, Netlify, or GitHub Pages.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- npm (usually comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dsa-tracker.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd dsa-tracker
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is busy).

### Building for Production

To create an optimized build for deployment, run:
```bash
npm run build
