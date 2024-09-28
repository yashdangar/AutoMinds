'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [driveFiles, setDriveFiles] = useState([]);
  const [emails, setEmails] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    if (session) {
      // fetchDriveFiles();
      // fetchEmails();
    }
  }, [session]);

  const fetchDriveFiles = async () => {
    const res = await fetch('/api/drive');
    const data = await res.json();
    setDriveFiles(data);
  };

  const fetchFileContent = async (fileId: string) => {
    const res = await fetch(`/api/drive/read?fileId=${fileId}`);
    const data = await res.json();

    if (data.error) {
      console.error(data.error);
      setFileContent(null);
    } else {
      setFileContent(data.content);
    }
  };

  const fetchEmails = async () => {
    const res = await fetch('/api/gmail/read');
    const data = await res.json();
    setEmails(data);
  };

  const sendTestEmail = async () => {
    const emailBody = {
      raw: btoa(`To: devitaliya22@gmail.com\nSubject: Test Email\n\nThis is a test email from dev.kehs2@gajeratrust.org.`),
    };

    const res = await fetch('/api/gmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    if (res.ok) {
      setEmailSent(true);
    } else {
      console.error('Failed to send email');
    }
  };

  return (
    <div>
      <h1>Google API Integration</h1>
      {!session ? (
        <button onClick={() => 
          // signIn('google')
          signIn()
          // signIn('github', { scope: 'repo user user:email' })
        }>Sign in with Google</button>
      ) : (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>

          <h2>Your Google Drive Files:</h2>
          <ul>
            {driveFiles.map((file: any) => (
              <li key={file?.id}>
                <button onClick={() => fetchFileContent(file.id)}>
                  {file?.name}
                </button>
              </li>
            ))}
          </ul>

          <h2>Your Gmail Messages:</h2>
          <ul>
            {emails && emails.map((email: any) => (
              <li key={email?.id} className="">
                <p>Subject: {email?.payload?.headers?.find((header: any) => header.name === 'Subject')?.value}</p>
                <p>From: {email?.payload?.headers?.find((header: any) => header.name === 'From')?.value}</p>
              </li>
            ))}
          </ul>

          <button onClick={sendTestEmail}>Send Test Email</button>
          {emailSent && <p>Email sent successfully!</p>}

          {fileContent && (
            <div>
              <h3>File Content:</h3>
              <pre>{fileContent}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

