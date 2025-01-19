"use client";

import { useEffect, useRef, useState } from "react";
import { fetchAIResponse } from "../services/aiService";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatConversation from "../components/chat-conversation";
import AiProfileName from "../components/ai-profile";
import ChatInput from "../components/chat-input";
import { supabase } from "@/lib/supabaseClient";

const Home = () => {
  const [conversation, setConversation] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [agentsData, setAgentsData] = useState<string | null>(null);
  const [agentsName, setAgentsName] = useState<string | null>(null);
  const conversationEndRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://mocki.io/v1/9b33ddfd-403f-44f2-b5e5-caa89b0c6001"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setAgentsData(data?.data || "No data available");
  //       setAgentsName(data?.user || "Agent");
  //     } catch (error: unknown) {
  //       setError(
  //         error instanceof Error ? error.message : "An unknown error occurred"
  //       );
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("profiledata").select("*");

      if (error) {
        setError(error.message);
        console.error("Error fetching data:", error.message);
      } else {
        console.log("Fetched data:", data);
        setAgentsData(data[0]?.data || "No data available");
        setAgentsName(data?.[0]?.username || "Agent");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    if (prompt) {
      fetchAIResponse(
        prompt,
        agentsName,
        agentsData,
        setLoading,
        setError,
        setConversation
      );
      setPrompt("");
    }
  };

  return (
    <div className="bg-gray h-screen w-screen fixed sm:px-8 lg:px-40">
      <AiProfileName userProfileName={agentsName} />
      <ScrollArea className="h-full p-2 pt-[52px] lg:pt-[84px] pb-[84px] w-full hide-scrollbar">
        <ChatConversation conversation={conversation}>
          <div ref={conversationEndRef} />
        </ChatConversation>
      </ScrollArea>

      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        isLoading={loading}
        handleSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm my-1">{error}</p>}
      </ChatInput>
    </div>
  );
};

export default Home;
