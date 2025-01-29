import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowLeft, Paperclip } from "lucide-react";
import Link from "next/link";

const AddProfileForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [showImageInput, setShowImageInput] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/addProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, data, image }),
    });

    if (res.ok) {
      setUsername("");
      setData("");
      setImage("");
      alert("Profile added successfully!");
    } else {
      const error = await res.json();
      alert(`Failed to add profile: ${error.error}`);
    }
  };

  const toggleImageInputVisibility = () => {
    setShowImageInput((prev) => !prev);
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center max-w-[800px] mx-auto w-full relative">
      <Link href="/" className="cursor-pointer">
        <div className="absolute top-8 left-8">
          <ArrowLeft />
        </div>
      </Link>
      <form onSubmit={handleSubmit} className="w-full max-w-[1300px] space-y-6">
        <div className="flex gap-2 group cursor-pointer w-[62px] ">
          <Avatar
            className="h-[62px] w-[62px] relative p-1 "
            onClick={toggleImageInputVisibility}>
            {!image && (
              <div className="absolute top-0 right-0  group-hover:bg-slate-200 opacity-90 group-hover:opacity-100 rounded-full hover:bg-slate-200 p-1">
                <Paperclip size={18} />
              </div>
            )}
            <AvatarImage src={image || undefined} alt="Profile" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="relative max-w-[243px] my-1">
            <div className="absolute inset-y-0 left-3 text-md font-medium px-2 flex items-center pointer-events-none text-muted-foreground">
              aiprofile.com/
            </div>
            <Input
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="pl-[118px] bg-white border min-w-[243px] sm:min-w-[254px] h-[62px] text-md font-medium text-slate-800"
              maxLength={15}
            />
          </div>
        </div>

        {showImageInput && (
          <div className="space-y-4">
            <Input
              id="image"
              type="url"
              placeholder="Enter profile picture URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="h-[62px] border-slate-200 focus-visible:ring-slate-400 placeholder:text-slate-400"
            />
          </div>
        )}

        <div className="space-y-4">
          <Label htmlFor="bio" className="text-slate-700 text-sm font-medium">
            Profile Data
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell me about your profile..."
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="h-[62px] resize-none border-slate-200 focus-visible:ring-slate-400 placeholder:text-slate-400"
          />
        </div>

        <Button
          type="submit"
          className="h-[62px] min-w-[212px] text-md rounded-full bg-[#e9c0e9] text-slate-700"
          size="default">
          Create profile
        </Button>
      </form>
    </div>
  );
};

export default AddProfileForm;
