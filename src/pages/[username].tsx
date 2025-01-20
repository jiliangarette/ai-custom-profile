"use client";

import "../app/globals.css";
import { useEffect, useRef, useState } from "react";
import { fetchAIResponse } from "../services/aiService";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatConversation from "../components/chat-conversation";
import AiProfileName from "../components/ai-profile";
import ChatInput from "../components/chat-input";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const [conversation, setConversation] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [agentsData, setAgentsData] = useState<string | null>(null);
  const [agentsName, setAgentsName] = useState<string | null>(null);
  const [profilesImage, setProfilesImage] = useState<string | null>(null);
  const conversationEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      const slug = String(username).toLowerCase();

      const { data, error } = await supabase
        .from("profiledata")
        .select("*")
        .ilike("username", slug);
      if (error) {
        setError(error.message);
        console.error("Error fetching data:", error.message);
      } else if (data && data.length > 0) {
        setAgentsData(data[0]?.data || "No data available");
        setAgentsName(data[0]?.username || "Agent");
        setProfilesImage(data[0]?.image || "");
      } else {
        setError("");
      }
    };
    fetchData();
  }, [username]);
  console.log(conversation);

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
    <div className=" h-screen w-screen fixed sm:px-8 lg:px-40">
      <AiProfileName userProfileName={agentsName} />
      <ScrollArea className="h-full p-2 pt-[52px] lg:pt-[84px] pb-[84px] w-full hide-scrollbar">
        <ChatConversation conversation={conversation} avatarUrl={profilesImage}>
          <div ref={conversationEndRef} />
        </ChatConversation>
      </ScrollArea>

      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        isTyping={!!prompt || conversation.length > 0}
        isLoading={loading}
        handleSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm my-1">{error}</p>}
      </ChatInput>
    </div>
  );
};

export default UserPage;
