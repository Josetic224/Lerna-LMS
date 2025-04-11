// utils/ipfs.js
import { create } from 'ipfs-http-client';

// Configure IPFS - use Infura
const projectId = '100620cc5590464db96f85936292c1ee';

const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Basic ' + btoa(projectId)
  },
});

export const uploadToIPFS = async (content) => {
  try {
    const result = await ipfsClient.add(content);
    return result.path;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};

export const getFromIPFS = async (cid) => {
  try {
    const stream = ipfsClient.cat(cid);
    let data = '';
    
    for await (const chunk of stream) {
      data += new TextDecoder().decode(chunk);
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching from IPFS:", error);
    throw error;
  }
};