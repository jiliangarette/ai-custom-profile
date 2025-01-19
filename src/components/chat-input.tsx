"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";

interface ChatInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  handleSubmit: () => void;
  children?: React.ReactNode;
}

const ChatInput: React.FC<ChatInputProps> = ({
  children,
  prompt,
  setPrompt,
  isLoading,
  handleSubmit,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-2 lg:mx-auto rounded-t-md h-20 bg-white mx-2 place-items-center justify-center z-10 fixed bottom-0 right-0 left-0">
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
          onClick={handleSubmit}
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
