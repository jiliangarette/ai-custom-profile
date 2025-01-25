"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/cool-card";
import { Facebook, Github, Instagram } from "lucide-react";

export function BannerThreeDCard() {
  return (
    <CardContainer className="inter-var w-full  min-w-80 ">
      <CardBody className="relative group/card w-full sm:w-[33rem] flex h-auto rounded-xl    ">
        <div className="absolute right-0 sm:right-4 top-20">
          <CardItem translateZ="25" className="w-full flex justify-center ">
            <Image
              src="https://i.pinimg.com/736x/d7/3d/8f/d73d8f2884276e5cf356653d505ea3dd.jpg"
              alt="image"
              className=" overflow-hidden w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full"
              width={100}
              height={100}
            />
          </CardItem>
        </div>
        <CardItem
          translateZ="50"
          className="w-full flex justify-center relative">
          <div className="w-8 h-8 bg-[#0a128e] rounded-full absolute top-8 mx-auto"></div>
          <Image
            src="https://i.pinimg.com/736x/f5/5b/2c/f55b2c1bbbaaad3072ca9c5a580bd8d0.jpg"
            alt="image"
            className="rounded-lg overflow-hidden  w-[160px] h-[375px] md:w-[252px] md:h-[545px]"
            width={252}
            height={545}
          />
        </CardItem>
        <div className="absolute left-0  bottom-12">
          <CardItem translateZ="75" className="w-full flex justify-center ">
            <Image
              src="https://i.pinimg.com/736x/21/39/81/2139816f87347258818d727024407802.jpg"
              alt="image"
              className="rounded-lg overflow-hidden w-[120px] h-[160px] md:w-[185px] md:h-[220px]"
              width={150}
              height={200}
            />
          </CardItem>
        </div>

        <div className="absolute right-0 sm:right-8 bottom-20 sm:bottom-24">
          <CardItem
            translateZ="75"
            className="w-full flex justify-center  gap-1 sm:pr-8">
            <div className="bg-[#0744c2]  p-2 rounded-full text-slate-200">
              <Instagram size={20} />
            </div>
            <div className="bg-[#0744c2] p-2 rounded-full text-slate-200">
              <Facebook size={20} />
            </div>
            <div className="bg-[#0744c2]  p-2 rounded-full text-slate-200">
              <Github size={20} />
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
