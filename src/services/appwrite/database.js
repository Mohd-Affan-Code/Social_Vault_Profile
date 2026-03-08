import { tablesDB, ID, Role, Permission } from "./config";

import conf from "../../conf/conf";

const DB_CONFIG = {
  databaseId: conf.databaseId,
  tableId: conf.collectionId,
};

export const databaseService = {
  async createDocument(data, userId) {
    try {
      const response = await tablesDB.createRow({
        ...DB_CONFIG,
        rowId: ID.unique(),
        data: {
          username: data.username,
          fullName: data.fullName,
          profileLink: data.profileLink,
          imageUrl: data.imageUrl,
          plateform: data.plateform,
          note: data.note,
        },
        permissions: [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ],
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
