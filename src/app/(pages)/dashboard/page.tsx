"use client";
import React from 'react';
import { createFile, deleteFile, getAllfiles, readFile, updateFile, addLabel, removeLabel, createLabel, deleteEmail, searchEmails, sendEmail, createAndSendDraftEmail,getGoogleInstance } from "../../api/google/index";


function Dashboard() {

  const handeClick = () => {
    
  }

  return (
    <div>
      <button onClick={handeClick}>
        Touch it to see the magic
      </button>
    </div>
  )
}

export default Dashboard