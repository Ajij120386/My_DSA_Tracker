# DSA Progress Tracker 🚀

A clean, modern, and responsive web application to track your progress in solving Data Structures and Algorithms problems. Built with React and designed for simplicity, this tracker helps you stay organized and motivated on your coding journey.

The entire problem list is managed in a single, easy-to-edit `data.jsx` file, making it incredibly simple to customize and add your own DSA sheets.

## ✨ Features

-   **Categorized Topics**: Problems are neatly organized into topics like Arrays, Strings, Dynamic Programming, and more.
-   **Visual Progress Tracking**: A global progress bar shows your overall completion percentage.
-   **Per-Topic Progress**: Each category card displays your progress for that specific topic.
-   **Persistent State**: Your progress is automatically saved in your browser's local storage, so you'll never lose your work.
-   **Live Search**: Instantly filter problems within a topic page.
-   **Direct Problem Links**: Click on any problem to go directly to the corresponding LeetCode or GeeksforGeeks page.
-   **Fully Customizable**: Add, remove, or edit topics and questions with ease by modifying a single data file.
-   **Responsive Design**: A beautiful and functional layout that works on all devices, from desktops to mobile phones.

## 📸 Screenshots

### Homepage                            
<img width="1920" height="1840" alt="image" src="https://github.com/user-attachments/assets/fb80e83d-ab3b-485b-8bbc-4ee1eeee5349" />

### Topic Page

<img width="1920" height="1480" alt="image" src="https://github.com/user-attachments/assets/0717a9a1-61b1-40a8-a56f-60209b1df161" />


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
