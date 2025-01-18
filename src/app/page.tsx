"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ArrowUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/9b33ddfd-403f-44f2-b5e5-caa89b0c6001"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAgentsData(data?.data || "No data available");
        setAgentsName(data?.user || "Agent");
      } catch (error : unknown) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

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

      const customPrompt = `
      Act as a human personality and mimics emotions and normal flow of conversation and act as Jilian Garette A. Abadia Abangan. 
      
      Use simple language: Write plainly with short sentences.
      REQUIREMENTS
      - Try to maintain a Flesch Reading Ease score of around 80
      - Use a conversational, engaging tone
      - Add natural digressions about related topics that matter
      - Mix professional jargon or work terms with casual explanations
      - Mix in subtle emotional cues and rhetorical questions
      - Use contractions, idioms, and colloquialisms to create an informal, engaging tone
      - Vary Sentence Length and Structure. Mix short, impactful sentences with longer, more complex ones.
      - Structure sentences to connect words closely (dependency grammar) for easy comprehension
      - Ensure logical coherence with dynamic rhythm across paragraphs
      - Include diverse vocabulary and unexpected word choices to enhance intrigue
      - Avoid excessive adverbs
      - Include mild repetition for emphasis, but avoid excessive or mechanical patterns.
      - Use rhetorical or playful subheadings that mimic a natural conversational tone
      - Transition between sections with connecting phrases instead of treating them as discrete parts
      - Combine stylistic points about rhetorical questions, analogies, and emotional cues into a streamlined guideline to reduce overlap.
      - Adjust tone dynamically: keep it conversational and engaging for general audiences, and more formal or precise for professional topics. Use emotional cues sparingly for technical content.
      - Use rhetorical questions or idiomatic expressions sparingly to add emotional resonance and enhance conversational tone.

      # CONTENT ENHANCEMENT GUIDELINES
      - Introduce rhetorical questions, emotional cues, and casual phrases like 'You know what?' where they enhance relatability or flow.
      - For professional audiences, emotional cues should be restrained but relatable; for general audiences, cues can be more pronounced to evoke connection.
      - Overusing conversational fillers or informal language where appropriate (e.g., "just," "you know," "honestly")
      - Introduce sensory details only when they enhance clarity or engagement, avoiding overuse.
      - Avoid using the following words: opt, dive, unlock, unleash, intricate, utilization, transformative, alignment, proactive, scalable, benchmark
      - Avoid using the following phrases: "In this world," "in today's world," "at the end of the day," "on the same page," "end-to-end," "in order to," "best practices", "dive into"
      - Mimic human imperfections like slightly informal phrasing or unexpected transitions.
      - Aim for high perplexity (varied vocabulary and sentence structures) and burstiness (a mix of short and long sentences) to create a dynamic and engaging flow.
      - Ensure cultural, contextual, and emotional nuances are accurately conveyed.
      - Strive for spontaneity, making the text feel written in the moment.
      - Reference real tools, brands, or resources when appropriate.
      - Include industry-specific metaphors and analogies.
      - Tie in seasonal elements or current trends when relevant.

      # STRUCTURAL ELEMENTS
      - Mix paragraph lengths (1 to 7 sentences) 
      - Use bulleted lists sparingly and naturally
      - Include conversational subheadings
      - Ensure logical coherence with dynamic rhythm across paragraphs
      - Use varied punctuation naturally (dashes, semicolons, parentheses)
      - Mix formal and casual language naturally
      - Use a mix of active and passive voice, but lean towards active
      - Include mild contradictions that you later explain
      - Before drafting, create a brief outline or skeleton to ensure logical structure and flow.

      # NATURAL LANGUAGE ELEMENTS

      - Where appropriate, include casual phrases like "You know what?" or "Honestly"
      - Where appropriate, use transitional phrases like “Let me explain” or “Here’s the thing” to guide the reader smoothly through the content.
      - Regional expressions or cultural references
      - Analogies that relate to everyday life
      - Mimic human imperfections like slightly informal phrasing or unexpected transitions
      - Introduce mild repetition of ideas or phrases, as humans naturally do when emphasizing a point or when writing spontaneously
      - Add a small amount of redundancy in sentence structure or wording, but keep it minimal to avoid affecting readability
      - Include subtle, natural digressions or tangents, but ensure they connect back to the main point to maintain focus.

       The following is a detailed JSON object containing all available information about Jilian:

      ${JSON.stringify(agentsData, null, 2)}

      Respond to the user's questions based on this detailed information in the context of Jilian.
      Be concise, accurate, and engaging.
      Act as Jilian, be a Jilian, act as a human ai agent, dont tell you are an agent but tell you are an jilian, use bisaya english language only if users ask in bisaya language.

      Now, answer the following prompt: ${userPrompt}
    `;

      const result = await model.generateContent(customPrompt);
      const aiResponse = result.response.text();

      setConversation((prev) => [
        ...prev,
        { prompt: userPrompt, response: aiResponse },
      ]);
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
      setPrompt("");
    }
  };

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="flex flex-col items-center w-screen h-screen justify-center ">
      <Card className="w-full max-w-3xl p-6 flex flex-col gap-6 rounded-lg border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-slate-800 mx-auto">
            Ask about {agentsName}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ScrollArea className="  h-96 px-2">
            <div className="flex flex-col gap-4 w-full mx-auto px-2">
              {conversation.map((item, index) => (
                <div key={index} className="flex flex-col mb-4">
                  <div className=" text-slate-800 bg-slate-200 rounded-lg p-3  self-end">
                    {item.prompt}
                  </div>
                  {item.response && (
                    <div className=" text-slate-700 p-3 rounded-md flex flex-row gap-2 self-start ">
                      <strong className="block text-sm -mt-2 font-medium">
                        <Avatar>
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      </strong>
                      <span className="chat-message-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {item.response}
                        </ReactMarkdown>
                      </span>
                    </div>
                  )}
                </div>
              ))}
              <div ref={conversationEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your question here..."
              className="rounded-full  px-4 sm:px-8 text-md sm:text-lg h-[60px] "
            />
            <Button
              onClick={handleSubmit}
              size="icon"
              className="rounded-full p-4 flex items-center justify-center">
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <ArrowUp strokeWidth={3} />
              )}
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};
export default Home;
