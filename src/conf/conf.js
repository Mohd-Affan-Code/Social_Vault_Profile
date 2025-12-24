const conf = {
  appwriteUrl: String(process.env.VITE_APPWRITE_ENDPOINT),
  projectId: String(process.env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(process.env.VITE_APPWRITE_DATABASE_ID),
  collectionId: String(process.env.VITE_APPWRITE_COLLECTION_ID),
};

export default conf;
