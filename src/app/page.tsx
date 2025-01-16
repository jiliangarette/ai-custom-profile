"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader } from "lucide-react";

const Home = () => {
  const [conversation, setConversation] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");

  const jilianData = {
    name: "Jilian Garette Abadia Abangan",
    age: 22,
    dateOfBirth: "July 6, 2002",
    gender: "Male",
    location: {
      address: "Poblacion, Pinamungajan, Cebu",
      country: "Philippines",
      postalCode: 6039,
    },
    education: {
      degree: "Bachelor of Science in Information Technology (BSIT)",
      year: "4th Year",
      expectedGraduation: "2025",
      institution: "CCTC - Cebu Technological Center",
    },
    contact: {
      phoneNumber: "09661808543",
      emailAddresses: ["aajiliangarette@gmail.com", "jiliangarette@gmail.com"],
      github: "https://github.com/Jgarette0",
      facebook: "https://www.facebook.com/jiliangarette.abangan",
      futurePortfolio: "https://jiliangarette.xyz",
    },
    skills: [
      "HTML",
      "CSS",
      "MySQL",
      "PHP",
      "JavaScript",
      "Tailwind CSS",
      "React",
      "Vue.js",
      "Laravel",
      "Git & GitHub",
      "Version Control",
      "Vite",
      "Shadcn-UI",
      "Clerk",
    ],
    currentFocus: {
      learning: ["Laravel", "React hooks"],
      improving: [
        "Programming skills",
        "Responsiveness in UI development",
        "Clean code principles",
      ],
    },
    projects: {
      ongoing: [
        {
          name: "Club Nexus",
          description:
            "A club management system supporting group chats, discussions, event announcements, and people management functionalities.",
          technologies: [
            "Laravel",
            "React",
            "Tailwind CSS",
            "MySQL",
            "WebSocket",
          ],
          features: [
            "Messenger-like chat system with admin abilities to block users and manage roles",
            "Feed page for group discussions",
            "Announcement page similar to Google Classroom",
          ],
          role: "Sole programmer",
        },
        {
          name: "Messenger Clone",
          description:
            "A chat system using Laravel Reverb, developed to enhance my understanding of Laravel and real-time communication.",
          focus: "Real-time chat functionality using WebSocket",
          role: "Developer",
        },
      ],
      completed: [
        {
          name: "Passafun",
          description:
            "A dynamic web platform supporting quizzes created and published via Quiz Studio.",
          technologies: ["React", "Laravel", "Tailwind CSS"],
          features: [
            "Admin dashboard for quiz creation and management",
            "Dynamic question types: rating scale, single-select, multi-select, open-ended",
            "Thematic color palettes for quiz customization",
            "Results pages based on score ranges",
          ],
        },
        {
          name: "Freelance Project",
          description:
            "A website for a badminton training camp using React, Clerk, and Tailwind CSS.",
          role: "Freelance Developer",
        },
      ],
    },
    hobbies: ["Music", "Manhwa", "Exploring tech jobs", "Programming"],
    interests: [
      "Programming languages and frameworks",
      "Tech industry trends",
      "Software engineering practices",
      "Visualization of programming trends",
      "Exploring personality types using elemental representations",
    ],
    employmentExperience: {
      currentRole: {
        position: "Software Engineer Trainee",
        company: "Passafund",
        focus: [
          "Agile methodology",
          "Laravel backend development",
          "Vue.js frontend development",
          "Git version control",
        ],
      },
      skillsAcquired: [
        "MVC architecture in Laravel",
        "Eloquent ORM for database management",
        "State management in Vue.js",
        "Clean code principles",
      ],
    },
    personalDevelopment: {
      dailyRoutine: "3+ hours of programming daily",
      challenges: [
        "Limited exposure to international opportunities",
        "Improving communication skills",
      ],
      goals: [
        "Secure a software engineering job after graduation",
        "Gradually build confidence and skills for international opportunities",
      ],
    },
    personalityQuizPreference: {
      type: "Elemental representations",
      options: ["Earth", "Air", "Fire", "Water"],
      rationale: "Clear and relatable representation for users.",
    },
    additionalInfo: {
      interestsIn2024: [
        "In-demand programming languages",
        "Clean and responsive UI development",
        "Python threading for application features like Duolingo",
      ],
      favoriteFont: "JetBrains Mono Bold",
      customPreferences: [
        "Commit messages in lowercase",
        "Concise explanations with less text",
        "Visual aids like tables and ASCII art",
      ],
      labelingSystem: {
        organizationMethod: ["GOAL", "GRIT", "WISDOM", "CODE"],
      },
      aspirations: [
        "Pursue opportunities beyond the Philippines",
        "Focus on holistic well-being: physical, emotional, and professional growth.",
      ],
    },
  };

  const fetchAIResponse = async (userPrompt: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      setError("API key is missing");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const customPrompt = `
      You are an AI that has comprehensive knowledge about Jilian Garette Abadia Abangan.
      The following is a detailed JSON object containing all available information about Jilian:
      
      ${JSON.stringify(jilianData, null, 2)}

      Respond to the user's questions based on this detailed information in the context of Jilian.
      Be concise, accurate, and engaging.

      Now, answer the following prompt: ${userPrompt}
    `;

      const result = await model.generateContent(customPrompt);
      const aiResponse = result.response.text();

      setConversation((prev) => [
        ...prev,
        { prompt: userPrompt, response: aiResponse },
      ]);
    } catch (err) {
      setError("Failed to fetch AI response");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (prompt) {
      fetchAIResponse(prompt);
      setPrompt("");
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center w-screen h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Ask about Jilian!</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {conversation.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="bg-blue-100 p-2 rounded-md mb-2">
              <strong>You:</strong> {item.prompt}
            </div>
            <div className="bg-gray-200 p-2 rounded-md">
              <strong>AI:</strong> {item.response}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a question about Jilian"
          className="p-2 outline-slate-500 rounded-md border border-slate-600 flex-grow"
        />
        <button
          onClick={handleSubmit}
          className="bg-slate-200 text-slate-800 px-4 py-2 text-md rounded-md">
          Ask
        </button>
      </div>

      {loading && (
        <div className="mt-4">
          <Loader />
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Home;
