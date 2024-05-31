const docModel = require("../models/doc-model");
const userModel = require("../models/user-model");

const getAllDocs = async (req, res) => {
  try {
    const docs = await docModel.getDocs();
    if (!docs) {
      res.status(404).json({ message: "No documents found" });
    }

    for (let doc of docs) {
      if (doc.certifier_id) {
        const certifier = await userModel.getUser(
          doc.certifier_id,
          "certifier"
        );
        doc.certifier = certifier;
      }
    }
    res.json({ docs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await docModel.getDoc(id);
    if (!doc) {
      res.status(404).json({ message: "Document not found" });
    }
    res.json({ doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocsByClient = async (req, res) => {
  try {
    const { client_id } = req.query;
    const docs = await docModel.getDocsByClient(client_id);
    if (!docs) {
      res.status(404).json({ message: "No documents found" });
    }

    // Add the two files original and copy to each document, the files are stored in the uploads folder prefixed with the client_id
    for (let doc of docs) {
      const originalPath = `uploads/${client_id}_${doc.original_name}`;
      const copyPath = `uploads/${client_id}_${doc.copy_name}`;
      doc.original = originalPath;
      doc.copy = copyPath;
    }

    res.json({ docs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveDoc = async (req, res) => {
  try {
    const { client_id, document_type } = req.body;
    const newDoc = await docModel.saveDoc({
      client_id,
      document_type,
    });
    res.json(newDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoc = async (req, res) => {
  try {
    const doc = req.body;
    const updatedDoc = await docModel.updateDoc(doc);
    res.json(updatedDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDoc = async (req, res) => {
  try {
    const { id } = req.params;
    await docModel.deleteDoc(id);
    res.json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignCertifier = async (req, res) => {
  try {
    const { doc_id, certifier_id } = req.body;
    const doc = await docModel.assignCertifier(doc_id, certifier_id);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocsByCertifier = async (req, res) => {
  try {
    const { client_id } = req.query;
    const docs = await docModel.getDocsByCertifier(client_id);
    if (!docs) {
      res.status(404).json({ message: "No documents found" });
    }

    for (let doc of docs) {
      const client = await userModel.getUser(doc.client_id, "client");
      doc.client = client;
    }
    res.json({ docs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const rejectDoc = async (req, res) => {
  try {
    const { doc_id } = req.body;
    const doc = await docModel.rejectDoc(doc_id);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const certifyDoc = async (req, res) => {
  try {
    const { doc_id } = req.body;
    const doc = await docModel.certifyDoc(doc_id);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDoc,
  rejectDoc,
  certifyDoc,
  saveDoc,
  updateDoc,
  deleteDoc,
  getAllDocs,
  assignCertifier,
  getDocsByClient,
  getDocsByCertifier,
};
