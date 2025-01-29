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
import SocialImageStacking from "@/components/SocialImageStacking";
import { Bot } from "lucide-react";

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
            <div className="flex flex-col gap-2 sm:gap-1 sm:flex-col">
              <div className="relative max-w-[243px] ">
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
              <Link href="/admin/create-profile">
                <Button
                  type="submit"
                  className="h-[62px] min-w-[212px] text-md rounded-full font-semibold bg-[#e9c0e9] text-slate-800"
                  size="default">
                  Claim your AIprofile
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full sm:h-full flex flex-col  justify-center place-items-center">
            <div className="w-[545px]  h-[545px]  flex justify-center place-items-center ">
              <BannerThreeDCard />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#502274]  flex justify-center w-full">
        <div className="sm:h-screen flex sm:flex-row-reverse flex-col sm:py-28 justify-center w-full  max-w-[1300px]">
          <div className="flex flex-col justify-center w-full  h-full pt-20 sm:pt-0 gap-8 px-4 ">
            <div className="space-y-3   w-full">
              <h1
                className=" font-extrabold  leading-none tracking-tight text-[#e9c0e9]"
                style={{
                  fontSize: "clamp(32px, 10.5vmin, 88px)",
                }}>
                Create and customize your Profile in minutes
              </h1>
              <p className=" text-[#e9c0e9] font-medium md:text-xl">
                Connect your TikTok, Instagram, Twitter, website, store, videos,
                music, podcast, events and more. It all comes together in a link
                in bio landing page designed to convert.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/admin/create-profile">
                <Button
                  type="submit"
                  className="h-[62px] min-w-[212px]  text-md rounded-full font-semibold bg-[#e9c0e9] text-slate-700"
                  size="default">
                  Get started for free
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full h-full flex  sm:py-20 justify-center place-items-center">
            <div className="w-[545px]  h-[545px]  flex justify-center place-items-center ">
              <ActionThreeDCard />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#780016]  flex justify-center w-full ">
        <div className="sm:h-screen flex sm:flex-row flex-col sm:py-28 justify-center w-full  max-w-[1300px]">
          <div className="flex flex-col justify-center w-full  h-full pt-20 sm:pt-0 gap-8 px-4 ">
            <div className="space-y-6   w-full">
              <h1
                className=" font-extrabold  leading-none tracking-tight text-[#e9c0e9]"
                style={{
                  fontSize: "clamp(32px, 10.5vmin, 80px)",
                }}>
                Share your profile from your Instagram, X, TikTok and other bios
              </h1>
              <p className=" text-[#e9c0e9] font-semibold md:text-xl">
                Add your unique profile URL to all the platforms and places you
                find your audience. Then use your QR code to drive your offline
                traffic online.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-1 sm:flex-col">
              <Link href="/admin/create-profile">
                <Button
                  type="submit"
                  className="h-[62px] min-w-[212px] text-md rounded-full font-semibold bg-[#e9c0e9] text-slate-800"
                  size="default">
                  Get started for free
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full sm:h-full flex flex-col  justify-center place-items-center ">
            <div className="sm:w-[545px] w-full h-[545px]  flex justify-center place-items-center relative ">
              <div className=" absolute top-1/2 left-6 sm:left-16  z-50 bg-white p-3 rounded-full flex place-items-center">
                <div className=" text-sm font-semibold flex flex-row gap-1 ">
                  <Bot size={18} />
                  <span> aiprofile.com/kendrick</span>
                </div>
              </div>
              <SocialImageStacking />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-200  flex justify-center w-full h-screen place-items-center">
        <div className="relative overflow-x-scroll flex gap-2 flex-row w-screen place-items-center h-full">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/${profile.username.replace(/\s+/g, "-").toLowerCase()}`}
              className="flip-card w-full h-fit flex place-items-center p-1 bg-black"
              tabIndex={0}>
              <Card className="flex flex-col flip-card-inner  w-full relative place-item-center justify-center border bg-white z-50 h-[550px]">
                <div className="flip-card-front absolute bg-red-200 w-full h-full">
                  <Image
                    src={
                      profile.image ||
                      "https://i.pinimg.com/736x/9c/0b/44/9c0b4442c5eb323aa042644041c96414.jpg"
                    }
                    alt="Avatar"
                    className="object-cover"
                    fill={true} // Correct usage
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="h-full absolute flip-card-back bg-red-400 border w-full flex place-items-center justify-center">
                  <h2 className="text-xl font-semibold bg-pink-800 h-full w-full text-green-200 text-center flex place-items-center justify-center">
                    /{profile.username}
                  </h2>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
