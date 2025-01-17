'use client';

import * as React from 'react';
import { Loader2, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatProps {
  conversation: { prompt: string; response: string }[];
  prompt: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onSendPrompt: (e: React.FormEvent) => void;
}

export default function Chat({
  conversation,
  prompt,
  loading,
  onPromptChange,
  onSendPrompt,
}: ChatProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <Card className="w-full max-w-xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/jilian.jpg" alt="Jilian" />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          Chat with Jilian
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollRef}>
          <div className="flex flex-col gap-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.prompt ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-2 items-start max-w-[80%] ${
                    message.prompt ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    {message.prompt ? (
                      <>
                        <AvatarImage src="/user.jpg" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/jilian.jpg" alt="Jilian" />
                        <AvatarFallback>JL</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.prompt
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.prompt || message.response}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-start max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/jilian.jpg" alt="Jilian" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={onSendPrompt} className="flex w-full items-center space-x-2">
          <Input
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Ask Jilian anything..."
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
