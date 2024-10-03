import { signOut } from 'next-auth/react'
import React from 'react'

function Settings() {
  return (
    <div>
      <button onClick={()=>{signOut()}}>Signout</button>
    </div>
  )
}

export default Settings