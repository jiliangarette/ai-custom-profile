"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");

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
      const result = await model.generateContent(userPrompt);
      setResponse(result.response.text());
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
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center w-screen h-screen">
      <h1>Gemini Wrapper</h1>
      <div className="flex place-items-center justify-center gap-1">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          className="p-2 outline-slate-500 rounded-md border border-slate-600"
        />
        <button
          onClick={handleSubmit}
          className="bg-slate-200 text-slate-800 px-4 py-2 text-md rounded-md">
          Submit
        </button>
      </div>
      {loading && <p>Loading AI response...</p>}
      {error && <p>{error}</p>}
      {response && (
        <div>
          <h2>AI Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
