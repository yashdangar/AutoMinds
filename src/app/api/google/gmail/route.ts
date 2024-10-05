import { getGoogleInstance } from "../index";

export async function addLabel(data : {emailId: string, labelId: string}) {
  const googleInstance = await getGoogleInstance();
  if(!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const { gmail } = googleInstance;

  try {
    const res = await gmail.users.messages.modify({
      userId: 'me',
      id: data.emailId,
      requestBody: {
        addLabelIds: [data.labelId],
      },
    })
    console.log('Label added to email');
    return {res};
  } catch (error) {
    console.log('Error adding label to email');
    return { error: 'Failed to add label to email' };
  }
}

export async function removeLabel( data : { emailId : string , labelId : string }){
  const googleInstance = await getGoogleInstance();
  if(!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const { gmail } = googleInstance;

  try {
    const res = await gmail.users.messages.modify({
      userId: 'me',
      id: data.emailId,
      requestBody: {
        removeLabelIds: [data.labelId],
      },
    })
    console.log('Label removed from email');
    return {res};
  } catch (error) {
    console.log('Error removing label from email');
    return { error: 'Failed to remove label from email' };
  }
}

export async function createLabel( data : {labelName: string}) {
  const googleInstance = await getGoogleInstance();
  if (!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const { gmail } = googleInstance;

  try {
    const response = await gmail.users.labels.create({
      userId: 'me',
      requestBody: {
        name: data.labelName,
        labelListVisibility: 'labelShow',
        messageListVisibility: 'show',
      },
    });

    return { response };
  } catch (error) {
    return { error: 'Failed to create label' };
  }
}

export async function deleteEmail( data : { id : string}){
  // before this step we need to get the email id , and so we need to get the email id first
  // so we can get id of email by seraching the email by subject or by sender
  const googleInstance = await getGoogleInstance();
  if(!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const { gmail } = googleInstance;
  try {
    const res = await gmail.users.messages.delete({
      userId: 'me',
      id: data.id,
    })
    console.log('Email deleted');
    return {res};
  } catch (error) {
    console.log('Error deleting email');
    return { error: 'Failed to delete email' };
  }
}

export async function sendEmail(data : {to: string, subject: string, body: string}) {
  const googleInstance = await getGoogleInstance();
  if (!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const { gmail } = googleInstance;

  const email = `To: ${data.to}\r\nSubject: ${data.subject}\r\n\r\n${data.body}`;
  const base64EncodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  try {
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: base64EncodedEmail,
      },
    });

    return { response };
  } catch (error) {
    return { error: 'Failed to send email' };
  }
}

export async function searchEmails(data : {query: string , maxResults: number}) {
  const googleInstance = await getGoogleInstance();
  if (!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const { gmail } = googleInstance;

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: data.query, 
      maxResults: data.maxResults, 
    });

    if (!response.data.messages || response.data.messages.length === 0) {
      return { emails: [], message: 'No emails found' };
    }

    return { emails: response.data };
  } catch (error) {
    return { error: 'Failed to search emails' };
  }
}

export async function createAndSendDraftEmail(data : {to: string, subject: string, body: string}) {
  const googleInstance = await getGoogleInstance();
  if (!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const { gmail } = googleInstance;

  const emailContent = `To: ${data.to}\r\nSubject: ${data.subject}\r\n\r\n${data.body}`;

  const encodedMessage = Buffer.from(emailContent)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); 

  try {
    const draftResponse = await gmail.users.drafts.create({
      userId: 'me',
      requestBody: {
        message: {
          raw: encodedMessage,
        },
      },
    });

    const draftId = draftResponse.data.id;

    const sendResponse = await gmail.users.drafts.send({
      userId: 'me',
      requestBody: {
        id: draftId,
      },
    });

    return { success: true, draftId: draftId, sendResponse: sendResponse.data };
  } catch (error) {
    console.error('Error creating or sending draft:', error);
    return { error: 'Failed to create and send draft' };
  }
}
