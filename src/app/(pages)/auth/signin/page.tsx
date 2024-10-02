"use client"
import { signIn } from 'next-auth/react';

export default function Auth() {
  return (
      <div>
        <h2>Sign In</h2>
        <button onClick={() => signIn('google')}>Sign in with Google</button>
        <br />
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      </div>
  );
}
