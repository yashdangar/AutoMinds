"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

function Settings() {
  return (
    <div>
      <button onClick={() => signOut({callbackUrl:"/"})}>Signout</button>
    </div>
  )
}

export default Settings
