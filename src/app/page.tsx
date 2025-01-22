"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { BannerThreeDCard } from "@/components/BannerThreeDCard";
import { ActionThreeDCard } from "@/components/ActionThreeDCard";

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
    <div className="flex min-h-screen flex-col overflow-hidden">
      <div className="bg-[#254f1a]  flex justify-center w-full">
        <div className="sm:h-screen flex sm:flex-row flex-col pt-40 sm:py-40 justify-center w-full  max-w-[1300px]">
          <div className="flex flex-col justify-center w-full  h-full gap-8 px-4 ">
            <div className="space-y-6   w-full">
              <h1
                className=" font-extrabold  leading-none tracking-tight text-[#d2e823]"
                style={{
                  fontSize: "clamp(32px, 10.5vmin, 88px)",
                }}>
                Everything you are. In one, simple link in bio.
              </h1>
              <p className=" text-[#d2e823] font-semibold md:text-xl">
                Join people using aiprofile for their link in bio. One link to
                help you share everything you create, curate and sell from your
                Instagram, TikTok, Twitter, YouTube and other social media
                profiles.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-">
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-row gap-x-4 flex-wrap ">
                <div className="relative max-w-[243px] my-1">
                  <div className="absolute inset-y-0 left-3 text-md font-semibold px-2 flex items-center pointer-events-none text-muted-foreground">
                    aiprofile.com/
                  </div>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="  pl-[122px] bg-white border-none min-w-[243px] sm:min-w-[254px] h-[62px] text-md font-semibold text-slate-800"
                    maxLength={15}
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
          <div className="w-full sm:h-full flex flex-col  justify-center place-items-center">
            <div className="w-[545px]  h-[545px]  flex justify-center place-items-center ">
              <BannerThreeDCard />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#e9c0e9]  flex justify-center w-full">
        <div className="sm:h-screen flex sm:flex-row-reverse flex-col py-28 justify-center w-full  max-w-[1300px]">
          <div className="flex flex-col justify-center w-full  h-full gap-8 px-4 ">
            <div className="space-y-3   w-full">
              <h1
                className=" font-extrabold  leading-none tracking-tight text-[#502274]"
                style={{
                  fontSize: "clamp(32px, 10.5vmin, 88px)",
                }}>
                Create and customize your Linktree in minutes
              </h1>
              <p className=" text-[#502274] font-medium md:text-xl">
                Connect your TikTok, Instagram, Twitter, website, store, videos,
                music, podcast, events and more. It all comes together in a link
                in bio landing page designed to convert.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-row gap-x-4 flex-wrap ">
                <Button
                  type="submit"
                  className="h-[62px] min-w-[212px]  text-md rounded-full font-semibold bg-[#502274] text-slate-100"
                  size="default">
                  Get started for free
                </Button>
              </form>
            </div>
          </div>
          <div className="w-full h-full flex py-20 justify-center place-items-center">
            <div className="w-[545px]  h-[545px]  flex justify-center place-items-center ">
              <ActionThreeDCard />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#50be5033]  flex justify-center w-full">
        <div className="sm:h-screen flex sm:flex-row flex-col py-40 justify-center w-full  max-w-[1300px]">
          <div className="relative flex-wrap flex gap-2 flex-row">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/${profile.username
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}>
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
                    <h2 className="text-xl font-semibold">
                      /{profile.username}
                    </h2>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div>wow</div>
        </div>
      </div>
    </div>
  );
}
