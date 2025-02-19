"use client";

import "../app/globals.css";
import {  useRef, useState } from "react";
import { fetchAIResponse } from "../services/aiService";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatConversation from "@/components/chat-conversation";
import AiProfileName from "@/components/ai-profile";
import ChatInput from "@/components/chat-input";

interface UserPageClientProps {
  agentsName: string;
  profilesImage: string;
  agentsData: string;
  suggestedPrompts: string[];
}

const UserPageClient: React.FC<UserPageClientProps> = ({
  agentsName,
  profilesImage,
  agentsData,
  suggestedPrompts,
}) => {
  const [conversation, setConversation] = useState<{ prompt: string; response: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const conversationEndRef = useRef<HTMLDivElement | null>(null);

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
        handleSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 text-sm my-1">{error}</p>}
      </ChatInput>
    </div>
  );
};

export default UserPageClient;
