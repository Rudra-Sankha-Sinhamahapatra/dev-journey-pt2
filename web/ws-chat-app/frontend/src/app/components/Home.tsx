"use client"
import React from "react";
import { BackgroundLines } from "@/app/components/background-lines";
import { Button } from "./Button";
import { AceternityLogo } from "./Logo";
import { NavbarDemo } from "./Navbar";
import { useRouter } from "next/navigation";

export function Home() {
    const router = useRouter();
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <NavbarDemo/>
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Dark Chat 
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      Join Dark Chat to explore real-time conversations with friends, family, and communities in a seamless way!
      </p>
      <div className="mt-12">
     <Button
           onClick={()=>{
            router.push('/join');
           }}
           containerClassName="rounded-full"
           as="button"
           className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
         >
           <AceternityLogo />
           <span>Join a Room</span>
         </Button>
         </div>
    </BackgroundLines>
  );
}
