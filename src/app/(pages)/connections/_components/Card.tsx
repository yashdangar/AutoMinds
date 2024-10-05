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
import crypto from "crypto";

type Props = {
  type: ConnectionTypes;
  icon: string;
  title: ConnectionTypes;
  description: string;
  callback?: () => void;
  connected: string[];
};

const ConnectionCard = ({
  description,
  type,
  icon,
  title,
  connected,
}: Props) => {


  const generateRandomString = () => {
    return crypto.randomBytes(20).toString('hex');
  }
  const handleClick = (type: ConnectionTypes) => {
    if (type === "Google") {
      signIn("google");
    } else if (type === "Github") {
      console.log(process.env.GITHUB_CLIENT_ID);
      
      window.location.href = `https://github.com/login/oauth/authorize?client_id=Ov23liF8APtIGZxmwZtz&scope=repo%20user%20gist%20notifications%20read%3Aorg&response_type=code&redirect_uri=https%3A%2F%2Fauto-minds-six.vercel.app%2Fapi%2Fgithub%2Fcallback&state=${generateRandomString()}`;
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
        {connected.includes(type) ? (
          <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold text-white">
            Connected
          </div>
        ) : (
          <div
            onClick={() => { handleClick(type); }}
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
