import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const AddProfileForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [image, setImage] = useState<string>("");

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

  return (
    <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center max-w-[800px] mx-auto w-full border">
      <form onSubmit={handleSubmit} className="w-full max-w-[1300px] space-y-6">
        <div className="relative max-w-[243px] my-1">
          <div className="absolute inset-y-0 left-3 text-md font-semibold px-2 flex items-center pointer-events-none text-muted-foreground">
            aiprofile.com/
          </div>
          <Input
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="  pl-[122px] bg-white border-none min-w-[243px] sm:min-w-[254px] h-[62px] text-md font-semibold text-slate-800"
            maxLength={15}
          />
        </div>

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

        <div className="space-y-4">
          <Label htmlFor="image" className="text-slate-700 text-sm font-medium">
            Image URL
          </Label>
          <Input
            id="image"
            type="url"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="h-[62px] border-slate-200 focus-visible:ring-slate-400 placeholder:text-slate-400"
          />
        </div>

        <Button
          type="submit"
          className="h-[62px] min-w-[212px] text-md rounded-full font-semibold bg-[#e9c0e9] text-slate-800"
          size="default">
          Claim your AIprofile
        </Button>
      </form>
    </div>
  );
};

export default AddProfileForm;
