import React from "react";
import { CONNECTIONS } from "@/lib/constants";
import ConnectionCard from "./_components/Card"
import { Connection } from "@/lib/types";

function Connections() {
  return (
    <div className="flex flex-wrap justify-start mx-[3vw]">
      {CONNECTIONS.map((connection: Connection, idx: number) => {
        return (
          <div key={idx} className="mx-1 my-3">
            <ConnectionCard
              connected={""}
              type={connection.title}
              icon={connection.image}
              title={connection.title}
              description={connection.description}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Connections;