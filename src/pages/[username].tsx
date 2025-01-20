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
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]); // New state for suggested prompts
  const conversationEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      const slug = String(username).toLowerCase();

      const { data: profileData, error: profileError } = await supabase
        .from("profiledata")
        .select("id, username, image, data")
        .ilike("username", slug);

      if (profileError) {
        setError(profileError.message);
        console.error("Error fetching profile data:", profileError.message);
        return;
      }

      if (profileData && profileData.length > 0) {
        const profileId = profileData[0]?.id;

        setAgentsData(profileData[0]?.data || "No data available");
        setAgentsName(profileData[0]?.username || "Agent");
        setProfilesImage(profileData[0]?.image || "");

        const { data: promptsData, error: promptsError } = await supabase
          .from("suggested_prompts")
          .select("prompt")
          .eq("profile_id", profileId);

        if (promptsError) {
          console.error(
            "Error fetching suggested prompts:",
            promptsError.message
          );
        } else if (promptsData) {
          setSuggestedPrompts(promptsData.map((p) => p.prompt));
        }
      } else {
        setError("No profile data found");
      }
    };

    fetchData();
  }, [username]);

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
    <div className="h-screen w-screen fixed sm:px-8 lg:px-40">
      <AiProfileName userProfileName={agentsName} />
      <ScrollArea className="h-full p-2 pt-[52px] lg:pt-[84px] pb-[84px] w-full hide-scrollbar">
        <ChatConversation conversation={conversation} avatarUrl={profilesImage}>
          <div ref={conversationEndRef} />
        </ChatConversation>
      </ScrollArea>

      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        suggestedPrompt={suggestedPrompts}
        isTyping={!!prompt || conversation.length > 0}
        isLoading={loading}
        handleSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm my-1">{error}</p>}
      </ChatInput>
    </div>
  );
};

export default UserPage;
