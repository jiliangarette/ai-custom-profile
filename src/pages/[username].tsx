import { GetServerSideProps } from "next";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";
import UserPageClient from "@/components/UserPageClient";

interface SuggestedPrompt {
  prompt: string;
}

interface PageProps {
  agentsName: string;
  profilesImage: string;
  agentsData: string;
  suggestedPrompts: string[];
  shareUrl: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { username } = context.params as { username: string };
  const slug = username.toLowerCase();
  const { data: profileData, error } = await supabase
    .from("profiledata")
    .select("id, username, image, data")
    .ilike("username", slug)
    .single();
  if (error || !profileData) {
    return { notFound: true };
  }
  const { data: promptsData, error: promptsError } = await supabase
    .from("suggested_prompts")
    .select("prompt")
    .eq("profile_id", profileData.id);
  let suggestedPrompts: string[] = [];
  if (!promptsError && promptsData) {
    const typedPrompts = promptsData as SuggestedPrompt[];
    suggestedPrompts = typedPrompts.map((p) => p.prompt);
  }
  const agentsName = profileData.username;
  const profilesImage = profileData.image || "/default-image.png";
  const agentsData = profileData.data || "No data available";
  const shareUrl = `https://aiprofile.sbs/${agentsName}`;
  return {
    props: {
      agentsName,
      profilesImage,
      agentsData,
      suggestedPrompts,
      shareUrl,
    },
  };
};

const ProfilePage: React.FC<PageProps> = ({
  agentsName,
  profilesImage,
  agentsData,
  suggestedPrompts,
  shareUrl,
}) => {
  return (
    <>
      <Head>
        <title>Chat with {agentsName}</title>
        <meta name="description" content={`Have a conversation with ${agentsName} on our platform.`} />
        <meta property="og:title" content={`Chat with ${agentsName}`} />
        <meta property="og:description" content={`Have a conversation with ${agentsName} on our platform.`} />
        <meta property="og:image" content={profilesImage} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Chat with ${agentsName}`} />
        <meta name="twitter:description" content={`Have a conversation with ${agentsName} on our platform.`} />
        <meta name="twitter:image" content={profilesImage} />
        <link rel="icon" href="/bot.svg" />
      </Head>
      <UserPageClient
        agentsName={agentsName}
        profilesImage={profilesImage}
        agentsData={agentsData}
        suggestedPrompts={suggestedPrompts}
      />
    </>
  );
};

export default ProfilePage;
