interface AiProfileName {
  userProfileName?: string | null;
}

const AiProfileName: React.FC<AiProfileName> = ({
  userProfileName = "Agent",
}) => {
  return (
    <h1 className="flex place-items-center justify-center text-md text-slate-600 sm:text-lg font-sans font-semibold right-0 left-0 fixed top-0 z-10 w-full h-12 lg:h-20   ">
      Ask about {userProfileName || "AI"}
    </h1>
  );
};

export default AiProfileName;
