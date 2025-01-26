"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/cool-card";
// import { Facebook, Github, Instagram } from "lucide-react";

export function ActionThreeDCard() {
  return (
    <CardContainer className="inter-var w-full  min-w-80 ">
      <CardBody className="relative group/card w-full sm:w-[33rem] flex h-auto rounded-xl    ">
        <div className="absolute right-0 sm:right-4 top-20"></div>
        <CardItem translateZ="50" className="w-full flex justify-center ">
          <Image
            src="https://i.pinimg.com/736x/2f/54/3b/2f543b8234a3bb8bf76d3c86c04a84fb.jpg"
            alt="image"
            className="rounded-lg overflow-hidden  w-full h-[375px] md:w-full md:h-[545px]"
            width={400}
            height={545}
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
