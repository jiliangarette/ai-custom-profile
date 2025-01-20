import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationItem {
  prompt: string;
  response: string;
}

interface ChatConversationProps {
  conversation: ConversationItem[];
  children?: React.ReactNode;
  avatarUrl: string | null;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
  conversation,
  children,
  avatarUrl,
}) => {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 w-full mx-auto h-full">
        {conversation.map((item, index) => (
          <div key={index} className="flex flex-col mb-4">
            <div className="text-slate-800 bg-slate-100 rounded-lg p-2 mr-2 px-4 self-end">
              {item.prompt}
            </div>
            {item.response && (
              <div className="text-slate-700 p-3 rounded-md flex flex-row gap-2 self-start">
                <strong className="block text-sm -mt-2 font-medium">
                  <Avatar>
                    <AvatarImage
                      src={
                        avatarUrl ||
                        "https://i.pinimg.com/originals/26/6b/e8/266be8ffd47b293b5aa0f3d35c19775d.gif "
                      }
                      alt="AI"
                    />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                </strong>
                <span className="chat-message-content overflow-x-auto max-w-[278px] sm:mx-w-[500px] md:max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {item.response}
                  </ReactMarkdown>
                </span>
              </div>
            )}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
};

export default ChatConversation;
