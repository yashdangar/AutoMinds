import { getGoogleInstance } from "../index";

export async function createFile(data: {name : string , mimeType : string , body : string}) {
  const googleInstance = await getGoogleInstance();
  
  if(!googleInstance) {
    return { error: 'Unauthorized' };
  }

  const { drive } = googleInstance;

  const fileMetadata = {
    name: data.name,
    fields : "id"
  };

  const media = {
    mimeType: data.mimeType,
    body: data.body,
  };

  try {
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    console.log('File created successfully');
    return {  file };
  } catch (error) {
    console.error('Error creating file:');
    return { error: 'Failed to create file'};
  }

}

export async function deleteFile(data : {fileId : string}) {

  const googleInstance = await getGoogleInstance();
  
  if(!googleInstance) {
    return { error: 'Unauthorized' };
  }

  const { drive } = googleInstance;
  const fileId = data.fileId;

  if (!fileId) {
    return { error: 'File ID is required' };
  }

  try {
    await drive.files.delete({
      fileId: fileId,
    });
    
    console.log('File deleted successfully');
    return { message: 'File deleted successfully' };
  } catch (error) {
    console.error('Error deleting file:');
    return { error: 'Failed to delete file' };
  }
}

export async function getAllfiles (data : {pageSize : number}) {
  const googleInstance = await getGoogleInstance();
  
  if(!googleInstance) {
    return { error: 'Unauthorized' };
  }

  const { drive } = googleInstance;

  try {
    const files = await drive.files.list({
      pageSize: data.pageSize,
      fields: 'files(id, name)',
    });

    console.log('Files fetched successfully');
    return { files : files.data.files };
  } catch (error) {
    console.error('Error fetching files:');
    return { error: 'Failed to fetch files' };
  }
}

export async function readFile(data : {fileId : string}) {
  const googleInstance = await getGoogleInstance();

  if (!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const {drive} = googleInstance;
  const fileId = data.fileId;
  try {
    const file = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    });

    const content = file.data;

    console.log('File read successfully');
    return { content };
  } catch (error) {
    console.log('Error reading file');
    return { error: 'Failed to read file' };
  }
}

export async function updateFile(data : {fileId : string , body : string}) {
  const googleInstance = await getGoogleInstance();

  if (!googleInstance) {
    return { error: 'Unauthorized' };
  }
  const {drive} = googleInstance;

  const fileId = data.fileId;
  const newContent = data.body; 

  if (!fileId || !newContent) {
    return { error: 'File ID and new content are required' };
  }


  try {
    const existingFile = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    });

    const existingContent = existingFile.data;
    const updatedContent = existingContent + '\n' + newContent; 

    const media = {
      mimeType: 'text/plain',
      body: updatedContent,
    };

    await drive.files.update({
      fileId: fileId,
      media: media,
      fields: 'id',
    });

    console.log('File updated successfully');
    return { message: 'File updated successfully' };
  } catch (error) {
    console.error('Error updating file');
    return { error: 'Failed to update file' };
  }
}