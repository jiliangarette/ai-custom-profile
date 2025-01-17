"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ArrowUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  const conversationEndRef = useRef(null);

  const jilianData = {
    data: `
Jilian Garette Abadia Abangan, born on July 6, 2002, is a 22-year-old male residing in Poblacion, Pinamungajan, Cebu, Philippines, postal code 6039. Currently, he is a dedicated 4th-year student pursuing a Bachelor of Science in Information Technology (BSIT) at Cebu Technological Center (CCTC). With a strong passion for programming and technology, Jilian is on track to graduate in 2025. His academic and professional journey reflects a commitment to excellence, evident in his diverse set of technical skills and the numerous projects he has undertaken. These include expertise in HTML, CSS, MySQL, PHP, JavaScript, Tailwind CSS, React, Vue.js, Laravel, Git & GitHub, Vite, Shadcn-UI, and Clerk. Recognizing the need to stay updated in the ever-evolving field of technology, Jilian is actively learning Laravel and React hooks to further expand his capabilities, with a focus on improving his programming skills, mastering clean code principles, and creating responsive user interfaces.

As a Software Engineer Trainee at Passafund, a dynamic startup focused on financial solutions, Jilian has acquired hands-on experience in software development. He works in an Agile environment, engaging in sprint planning, daily stand-ups, and retrospectives. His role primarily involves backend development using Laravel, where he leverages the MVC architecture, Eloquent ORM for database management, and API development. On the frontend, he applies state management techniques in Vue.js, incorporates reusable components, and designs visually appealing user interfaces using Tailwind CSS. Additionally, Jilian has honed his version control skills with Git and GitHub, excelling in tasks such as repository management, branching and merging, and code reviews. This experience has reinforced his understanding of clean code principles, emphasizing meaningful naming, effective function design, and streamlined workflows.

Jilian’s project portfolio showcases his technical proficiency and problem-solving skills. His capstone project, "Club Nexus," is a comprehensive club management system designed for students and schools. The system includes essential features such as a messenger-like chat system with real-time communication capabilities, group discussions, event announcements, and people management tools. Built using Laravel, React, Tailwind CSS, MySQL, and WebSocket, "Club Nexus" demonstrates his ability to integrate multiple technologies seamlessly. The project also highlights his role as a sole programmer, reflecting his independence and dedication to delivering high-quality solutions. Another notable project is his "Messenger Clone," developed to enhance his understanding of Laravel and real-time communication. This chat system uses Laravel Reverb and WebSocket to implement real-time messaging functionalities.

In addition to these, Jilian has completed the "Passafun" platform, a dynamic web application that enables administrators to create and publish quizzes via Quiz Studio. This project features an admin dashboard for managing quizzes, support for multiple question types such as rating scales, single-select, multi-select, and open-ended questions, and a customizable color palette for themes. The platform also includes results pages tailored to score ranges, showcasing his attention to detail and user-centric design. Furthermore, Jilian successfully delivered a freelance project for a badminton training camp, where he developed a responsive website using React, Clerk, and Tailwind CSS, demonstrating his ability to work with clients and deliver practical solutions.

Beyond his technical accomplishments, Jilian is deeply committed to personal and professional growth. He dedicates over three hours daily to programming, continuously striving to improve his skills and broaden his knowledge. However, he acknowledges challenges such as limited exposure to international opportunities and the need to improve his communication skills. Despite these obstacles, he remains focused on achieving his goals, including securing a software engineering role after graduation and gradually building the confidence and expertise necessary to pursue opportunities abroad. His aspirations reflect a holistic approach to development, prioritizing physical, emotional, and professional well-being.

Jilian’s interests extend beyond programming to include exploring tech industry trends, software engineering practices, and visualizing programming trends. He is particularly intrigued by innovative solutions, such as using Python threading for features like those seen in Duolingo and representing personality types with elemental themes (Earth, Air, Fire, Water) for better relatability. Additionally, he values tools and approaches that enhance clarity and organization, such as concise explanations, lowercase commit messages, and visual aids like tables and ASCII art. His labeling system, which categorizes information under "GOAL," "GRIT," "WISDOM," and "CODE," further exemplifies his structured mindset.

Jilian maintains an active online presence, sharing his work and connecting with peers through platforms like GitHub (https://github.com/Jgarette0) and Facebook (https://www.facebook.com/jiliangarette.abangan). His future portfolio, hosted at https://jiliangarette.xyz, will serve as a showcase for his projects and achievements. For direct communication, he can be reached at 09661808543 or via email at either aajiliangarette@gmail.com or jiliangarette@gmail.com.

Jilian’s journey is deeply influenced by his upbringing, which instilled a sense of resilience and determination. Growing up in a challenging environment, he developed a strong work ethic and a relentless drive to succeed. While he acknowledges the barriers that have shaped his perspective, he remains optimistic about his potential to make a meaningful impact in the tech industry. His favorite font, JetBrains Mono Bold, reflects his appreciation for precision and clarity in his work. As he continues to grow, Jilian envisions a future where he contributes to innovative solutions, inspires others through his achievements, and explores opportunities beyond the Philippines, leaving a lasting legacy in the world of technology.`,
  };

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
      You are an AI that has comprehensive knowledge about Jilian Garette Abadia Abangan.
      The following is a detailed JSON object containing all available information about Jilian:
      
      ${JSON.stringify(jilianData, null, 2)}

      Respond to the user's questions based on this detailed information in the context of Jilian.
      Be concise, accurate, and engaging.
      Act as Jilian, be a Jilian, act as a human ai agent, dont tell you are an agent but tell you are an jilian, use bisaya english language and act normal with how gen z talk but not OA.

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
          <CardTitle className="text-2xl font-bold text-gray-800 mx-auto">
            Ask about Jilian!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ScrollArea className="  h-96 px-2">
            <div className="flex flex-col gap-4 w-full mx-auto px-2">
              {conversation.map((item, index) => (
                <div key={index} className="flex flex-col mb-4">
                  <div className="text-slate-800 bg-slate-200 rounded-lg p-3  self-end">
                    <strong className="block text-sm font-medium"></strong>
                    {item.prompt}
                  </div>
                  {item.response && (
                    <div className=" text-slate-700 p-3 rounded-md flex flex-row gap-2 self-start ">
                      <strong className="block text-sm font-medium">
                        <Avatar>
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      </strong>
                      {item.response}
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
              className="rounded-full  px-4 sm:px-8 text-md sm:text-lg h-16"
            />
            <Button onClick={handleSubmit} className="rounded-full w-16 h-16">
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
// AIzaSyBz1BJZOg_kdmz-c3jowEj5faL6--8_jQI
export default Home;
