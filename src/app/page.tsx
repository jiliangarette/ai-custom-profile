"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import ChatConversation from "./components/chat-conversation";
import AiProfileName from "./components/ai-profile";
import ChatInput from "./components/chat-input";

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
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
      Act as a human personality and mimics emotions and normal flow of conversation and act as person ${
        agentsName || "user agent"
      }. 
      
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

       The following is a detailed JSON object containing all available information about ${
         agentsName || "user agent"
       }:

      ${JSON.stringify(agentsData, null, 2)}

      Respond to the user's questions based on this detailed information in the context of ${
        agentsName || "user agent"
      }.
      Be concise, accurate, and engaging.
      Act as ${agentsName || "user agent"}, be a ${
        agentsName || "user agent"
      }, act as a human ai agent, dont tell you are an agent but tell you are an ${
        agentsName || "user agent"
      }, use bisaya english language only if users ask in bisaya language.

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
    <div className="bg-gray h-screen w-screen fixed  sm:px-8 lg:px-40">
      <AiProfileName userProfileName={agentsName} />
      <ScrollArea className=" h-full p-2 pt-[52px] lg:pt-[84px] pb-[84px]  w-full">
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
