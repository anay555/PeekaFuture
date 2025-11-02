# Peekafuture - Your AI-Powered Career Guidance Ecosystem

![Peekafuture Hero Banner]([https://drive.google.com/file/d/1W7hAyyLuPh0zNz9RePAyo0zqYCeZQJ4D/view?usp=sharing]) <!-- Placeholder: Replace with an actual screenshot or banner -->

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Google Gemini">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

**Peekafuture is a comprehensive, AI-powered career guidance platform designed to eliminate career-related anxiety for 10th-grade students in India. By leveraging the power of Google's Gemini AI, it provides a full suite of tools for personalized stream selection, academic planning, college exploration, and more, turning uncertainty into a clear, actionable plan for the future.**

---

## ✨ Key Features

Peekafuture is more than just a guidance tool; it's an integrated ecosystem for academic and career planning.

| Feature                      | Description                                                                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔮 **AI Stream Guidance**        | Take a personalized AI survey to discover your unique persona, ideal academic stream (Science, Commerce, Arts), and a top career recommendation tailored to your personality and interests.                  |
| 🎭 **"Day in the Life" Sim**   | Experience your potential future firsthand. Our AI generates an immersive narrative simulation of a day in your recommended career, making your choice tangible and exciting.                             |
| 🗺️ **Academic Navigator**      | Generate a custom 2-year roadmap for Grades 11 & 12. Track your progress with an interactive checklist and get AI-powered "deep dive" guides for any skill you want to master.                   |
| 🎓 **College Insights**         | Use natural language to find colleges (e.g., "Top private science colleges in Mumbai with fees under 10 lakhs"). Select up to three for a side-by-side comparison with an AI-generated summary.     |
| 🚀 **Entrepreneurship Hub**    | Spark your inner founder. Get AI-generated startup ideas based on your degree and interests, then instantly draft a comprehensive one-page business plan, complete with a SWOT analysis.              |
| 📈 **Future Trends Analysis**  | Stay ahead of the curve. Get a personalized report on the 5-10 year outlook for your chosen career, grounded with Google Search for the most up-to-date insights on required skills and opportunities. |
| 📊 **Live Market Insights**    | Get a real-time pulse on the job market for your recommended career. See up-to-date salary ranges, current demand levels, top hiring locations, and the key skills employers are looking for right now. |
| 🎨 **Artists' Corner**         | A dedicated space for creative minds. Generate a specialized roadmap for artistic careers and use the AI Grant & Scholarship Finder to discover funding for your projects.                                 |
| 🏆 **Competition Finder**     | Discover relevant competitions, Olympiads, and hackathons based on your career path, with live results powered by Google Search to ensure you never miss an opportunity.                              |

---

## 🛠️ Technology Stack & Architecture

Peekafuture is built on a modern, serverless architecture designed for scalability, performance, and a rich user experience.

### Core Technologies

-   **Frontend:** [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/) with [Vite](https://vitejs.dev/) for a fast development experience.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first, responsive design system.
-   **Backend (BaaS):** [Firebase](https://firebase.google.com/) for:
    -   **Authentication:** Secure user sign-up and login (Email/Password & Google OAuth).
    -   **Firestore:** NoSQL database for storing core application data (colleges, streams, etc.).
-   **AI Engine:** [Google Gemini API](https://ai.google.dev/) via the `@google/genai` SDK.

### Gemini AI Usage

The application intelligently utilizes different Gemini models and features for optimal performance:

-   **`gemini-2.5-pro`:** Used for tasks requiring deep reasoning, creativity, and high-quality prose, such as the initial career guidance, business plan generation, future trends analysis, and live market insights.
-   **`gemini-2.5-flash`:** Leveraged for faster, more structured, or creative tasks like generating roadmaps, "Day in the Life" simulations, and quick summaries.
-   **JSON Mode with Schema:** Heavily used to ensure the AI's output is structured and reliable, allowing the frontend to parse and render complex data for roadmaps, search filters, business ideas, market analysis, and more flawlessly.
-   **Google Search Grounding:** A key feature for the Competition Finder, Art Grant Finder, Future Trends, and Live Market Insights tabs to provide users with current, verifiable information from the web, preventing outdated responses.

### Architecture Overview

The application follows a simple yet powerful client-serverless model:

1.  **Client-Side SPA:** The React application is a Single-Page Application that runs entirely in the user's browser. It manages all UI, state, and user interactions.
2.  **Firebase Integration:** The client communicates directly with Firebase services for authentication and to fetch foundational data from Firestore.
3.  **Direct AI Communication:** The client makes calls **directly to the Gemini API** using the official SDK. This simplifies the architecture by removing the need for an intermediary backend server for AI tasks.

```
+------------------+      +---------------------+      +---------------------+
|                  |      |                     |      |                     |
|   React Client   |----->| Firebase Services   |----->|      Firestore      |
| (Vite + TS)      |      | (Auth, Firestore)   |      |      Database       |
|                  |      |                     |      |                     |
+--------^---------+      +---------------------+      +---------------------+
         |
         |
         +-------------------------------------------->+   Google Gemini API   |
                                                       | (generateContent, etc.)|
                                                       +---------------------+
```

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   `npm` or `yarn`

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/peekafuture.git
cd peekafuture
```

### 2. Install Dependencies

Install the required packages for the main application:

```bash
npm install
```

### 3. Set Up Environment Variables

You need a Google Gemini API key to run this project.

1.  Obtain your API key from [Google AI Studio](https://ai.studio.google.com/app/apikey).
2.  Create a file named `.env` in the root of the project.
3.  Add your API key to the `.env` file:

    ```env
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

### 4. Set Up Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  In your project, create a new Web App.
3.  Copy the `firebaseConfig` object provided.
4.  Open `src/services/firebase.ts` and replace the placeholder `firebaseConfig` with your own.
5.  **Enable Authentication:**
    -   Go to the "Authentication" section in the Firebase Console.
    -   Enable the "Email/Password" and "Google" sign-in providers.
6.  **Authorize Domain:**
    -   Under Authentication > Settings > Authorized domains, add `localhost` to allow local testing.
7.  **Set up Firestore:**
    -   Go to the "Firestore Database" section and create a new database in **Test mode** for easy setup.

### 5. Seed the Firestore Database

The application relies on initial data for colleges, streams, etc. A seeder script is provided to populate your Firestore instance.

1.  **Get Firebase Service Account Key:**
    -   In your Firebase project settings, go to the "Service accounts" tab.
    -   Click "Generate new private key" and download the JSON file.
    -   Rename the downloaded file to `serviceAccountKey.json`.
    -   Move this file into the `scripts/` directory.

2.  **Run the Seeder:**
    -   Navigate to the scripts directory, install its dependency, and run the script.

    ```bash
    cd scripts
    npm install
    node seed.js
    cd ..
    ```

    This will safely populate your `colleges`, `streams`, `entrepreneurship`, and `careers` collections in Firestore.

### 6. Run the Application

Now you're ready to start the development server!

```bash
npm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

---

## 🤝 Author

This project was created with ❤️ by **Anany Sharma**.

-   **LinkedIn:** [Anany Sharma](https://www.linkedin.com/in/anany-sharma-955603144/)

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
