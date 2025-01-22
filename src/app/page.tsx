"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Profile {
  id: string;
  username: string;
  image: string;
}

export default function LandingPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiledata")
        .select("id, username, image")
        .limit(10);

      if (error) {
        console.error("Error fetching profiles:", error.message);
      } else {
        setProfiles(data);
      }
    };

    fetchProfiles();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      window.location.href = `https://aiprofile.com/${username}`;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sm:h-screen bg-[#254f1a] w-screen flex sm:flex-row flex-col py-40 justify-center">
        <div className="flex flex-col justify-center w-full h-full gap-8 px-4 sm:px-8 lg:px-16">
          <div className="space-y-6   w-full">
            <h1
              className=" font-extrabold  leading-none tracking-tight text-[#d2e823]"
              style={{
                fontSize: "clamp(32px, 11.5vmin, 88px)",
              }}>
              Everything you are. In one, simple link in bio.
            </h1>
            <p className=" text-[#d2e823] font-semibold md:text-xl">
              Join 50M+ people using Linktree for their link in bio. One link to
              help you share everything you create, curate and sell from your
              Instagram, TikTok, Twitter, YouTube and other social media
              profiles.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <form
              onSubmit={handleSubmit}
              className="flex w-full  items-center flex-wrap space-x-2">
              <div className="relative max-w-[243px]   my-1">
                <div className="absolute inset-y-0 left-3 text-md font-semibold px-2 flex items-center pointer-events-none text-muted-foreground">
                  aiprofile.com/
                </div>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className=" p-8 px-10 pl-[122px] bg-white border-none min-w-[243px] h-[62px] text-md font-semibold text-slate-800"
                  placeholder="yourname"
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
        </div>
        <div className="w-full h-full">image</div>
      </div>
      <div className="relative flex-wrap flex gap-2 flex-row">
        {profiles.map((profile) => (
          <Link
            key={profile.id}
            href={`/${profile.username.replace(/\s+/g, "-").toLowerCase()}`}>
            <Card className="flex flex-col items-center space-y-4 p-6">
              <div className="relative h-24 w-24">
                <div className="absolute -inset-0.5 animate-tilt rounded-full bg-gradient-to-r from-slate-500 to-slate-700" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white bg-slate-50">
                  <Image
                    src={
                      profile.image ||
                      "https://i.pinimg.com/736x/9c/0b/44/9c0b4442c5eb323aa042644041c96414.jpg"
                    }
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">/{profile.username}</h2>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
