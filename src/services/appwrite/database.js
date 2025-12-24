import { tablesDB, ID } from "./config";
import conf from "../../conf/conf";

// Base configuration ek jagah define karo
const DB_CONFIG = {
  databaseId: conf.databaseId,
  tableId: conf.collectionId,
};

export const databaseService = {
  // Create Document
  async createDocument(data) {
    try {
      const response = await tablesDB.createRow({
        ...DB_CONFIG, // Spread operator se IDs automatically add ho jayengi
        rowId: ID.unique(),
        data: {
          username: data.username,
          fullName: data.fullName,
          profileLink: data.profileLink,
          imageUrl: data.imageUrl,
          plateform: data.plateform,
          note: data.note,
        },
      });
      console.log("Document created:", response);
      return response;
    } catch (error) {
      console.error("Create document error:", error);
      throw error;
    }
  },

  // Get Document
  async getDocument(documentId) {
    try {
      const response = await tablesDB.getRow({
        ...DB_CONFIG,
        rowId: documentId,
      });
      return response;
    } catch (error) {
      console.error("Get document error:", error);
      throw error;
    }
  },

  // Update Document
  async updateDocument(documentId, data) {
    try {
      const response = await tablesDB.updateRow({
        ...DB_CONFIG,
        rowId: documentId,
        data: data,
      });
      return response;
    } catch (error) {
      console.error("Update document error:", error);
      throw error;
    }
  },

  // Delete Document
  async deleteDocument(documentId) {
    try {
      const response = await tablesDB.deleteRow({
        ...DB_CONFIG,
        rowId: documentId,
      });
      return response;
    } catch (error) {
      console.error("Delete document error:", error);
      throw error;
    }
  },

  // List Documents
  async listDocuments(queries = []) {
    try {
      const response = await tablesDB.listRows({
        ...DB_CONFIG,
        queries: queries,
      });
      return response;
    } catch (error) {
      console.error("List documents error:", error);
      throw error;
    }
  },
};
