import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertProfileSchema, insertFormSchema, insertFormSubmissionSchema, insertNotificationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users/:firebaseUid", async (req, res) => {
    try {
      const user = await storage.getUserByFirebaseUid(req.params.firebaseUid);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Profile routes
  app.get("/api/profiles/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const profile = await storage.getProfile(userId);
      if (!profile) {
        res.status(404).json({ error: "Profile not found" });
        return;
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/profiles", async (req, res) => {
    try {
      const profileData = insertProfileSchema.parse(req.body);
      const profile = await storage.createProfile(profileData);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/profiles/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const profileData = req.body;
      
      // Calculate completion percentage
      const totalFields = 15; // Total profile fields
      const filledFields = Object.values(profileData).filter(value => value && value !== '').length;
      const completionPercentage = Math.round((filledFields / totalFields) * 100);
      
      const updatedProfile = await storage.updateProfile(userId, {
        ...profileData,
        completionPercentage
      });
      res.json(updatedProfile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Form routes
  app.get("/api/forms", async (req, res) => {
    try {
      const { category } = req.query;
      let forms;
      
      if (category && category !== 'all') {
        forms = await storage.getFormsByCategory(category as string);
      } else {
        forms = await storage.getAllForms();
      }
      
      res.json(forms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/forms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const form = await storage.getForm(id);
      if (!form) {
        res.status(404).json({ error: "Form not found" });
        return;
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/forms", async (req, res) => {
    try {
      const formData = insertFormSchema.parse(req.body);
      const form = await storage.createForm(formData);
      res.json(form);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/forms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const formData = req.body;
      const updatedForm = await storage.updateForm(id, formData);
      res.json(updatedForm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/forms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteForm(id);
      if (!success) {
        res.status(404).json({ error: "Form not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Form submission routes
  app.get("/api/form-submissions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const submissions = await storage.getFormSubmissionsByUser(userId);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/form-submissions", async (req, res) => {
    try {
      const submissionData = insertFormSubmissionSchema.parse(req.body);
      const submission = await storage.createFormSubmission(submissionData);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/form-submissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const submissionData = req.body;
      const updatedSubmission = await storage.updateFormSubmission(id, submissionData);
      res.json(updatedSubmission);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Notification routes
  app.get("/api/notifications/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await storage.getNotificationsByUser(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const notificationData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(notificationData);
      res.json(notification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/notifications/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.markNotificationAsRead(id);
      if (!success) {
        res.status(404).json({ error: "Notification not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Search forms
  app.get("/api/search/forms", async (req, res) => {
    try {
      const { q } = req.query;
      const forms = await storage.getAllForms();
      
      if (!q) {
        res.json(forms);
        return;
      }
      
      const searchTerm = (q as string).toLowerCase();
      const filteredForms = forms.filter(form => 
        form.name.toLowerCase().includes(searchTerm) ||
        form.description?.toLowerCase().includes(searchTerm) ||
        form.category.toLowerCase().includes(searchTerm)
      );
      
      res.json(filteredForms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
