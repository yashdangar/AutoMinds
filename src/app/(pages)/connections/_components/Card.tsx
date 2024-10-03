"use client"
import { ConnectionTypes } from "@/lib/types";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { signIn } from "next-auth/react";

type Props = {
  type: ConnectionTypes;
  icon: string;
  title: ConnectionTypes;
  description: string;
  callback?: () => void;
  connected: {} & any;
};

const ConnectionCard = ({
  description,
  type,
  icon,
  title,
  connected,
}: Props) => {


  const handleClick = (type: ConnectionTypes) => {
    if(type === "Google") {
      signIn("google");
    }
    else if(type === "Slack") {
      signIn("slack");
    }
    else if(type === "Notion") {
      signIn("notion")
    }
    else if(type === "Discord") {
      signIn("discord");
    }
    else if(type === "Github") {
      signIn("github");
    }
  };
  

  return (
    <Card className="flex w-[45vw] items-center justify-between ">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Image
            src={icon}
            alt={title}
            height={30}
            width={30}
            className="object-contain"
          />
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col items-center gap-2 p-4">
        {connected[type] ? (
          <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold text-white">
            Connected
          </div>
        ) : (
          <div
            onClick={() => {handleClick(type)}}
            className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground cursor-pointer"
          >
            Connect
          </div>
        )}
      </div>
    </Card>
  );
};

export default ConnectionCard;
