"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ChatInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  handleSubmit: () => void;
  children?: React.ReactNode;
  isTyping: boolean;
  suggestedPrompt: string[];
}

const ChatInput: React.FC<ChatInputProps> = ({
  children,
  prompt,
  setPrompt,
  isLoading,
  isTyping,
  suggestedPrompt,
  handleSubmit,
}) => {
  const [shouldSubmit, setShouldSubmit] = useState(false); // Track

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit();
      setShouldSubmit(false);
    }
  }, [shouldSubmit, handleSubmit]);

  const handleQuickPrompt = (value: string) => {
    setPrompt(value);
    setShouldSubmit(true);
  };

  return (
    <div className="flex flex-col gap-2 lg:mx-auto rounded-t-md h-20 bg-white mx-2 place-items-center justify-center z-10 fixed bottom-0 right-0 left-0">
      {!isTyping && suggestedPrompt.length > 0 && (
        <div className="flex justify-center fixed top-1/2 gap-2">
          {suggestedPrompt.map((prompt, index) => (
            <Button
              key={index}
              className="px-4 py-2 w-full"
              variant="secondary"
              onClick={() => handleQuickPrompt(prompt)}>
              {prompt}
            </Button>
          ))}
        </div>
      )}
      <div className="flex gap-2 w-full place-items-center justify-center mx-auto">
        {children}
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter question..."
          className="rounded-full w-full md:min-w-2xl max-w-2xl px-4 sm:px-8 text-md sm:text-lg h-[60px]"
        />
        <Button
          onClick={() => {
            setShouldSubmit(true);
          }}
          size="icon"
          className="rounded-full p-4 flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="animate-spin text-white" />
          ) : (
            <ArrowUp strokeWidth={3} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
