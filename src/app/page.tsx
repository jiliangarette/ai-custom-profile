"use client";

import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAIResponse = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      if (!apiKey) {
        setError("API key is missing");
        return;
      }

      try {
        setLoading(true);
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Explain how AI works";
        const result = await model.generateContent(prompt);
        setResponse(result.response.text());
      } catch (err) {
        setError("Failed to fetch AI response");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAIResponse();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
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
