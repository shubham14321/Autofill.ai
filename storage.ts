import { users, profiles, forms, formSubmissions, notifications, type User, type InsertUser, type Profile, type InsertProfile, type Form, type InsertForm, type FormSubmission, type InsertFormSubmission, type Notification, type InsertNotification } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  
  // Profile operations
  getProfile(userId: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: number, profile: Partial<Profile>): Promise<Profile>;
  
  // Form operations
  getAllForms(): Promise<Form[]>;
  getFormsByCategory(category: string): Promise<Form[]>;
  getForm(id: number): Promise<Form | undefined>;
  createForm(form: InsertForm): Promise<Form>;
  updateForm(id: number, form: Partial<Form>): Promise<Form>;
  deleteForm(id: number): Promise<boolean>;
  
  // Form submission operations
  getFormSubmissionsByUser(userId: number): Promise<FormSubmission[]>;
  getFormSubmission(id: number): Promise<FormSubmission | undefined>;
  createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission>;
  updateFormSubmission(id: number, submission: Partial<FormSubmission>): Promise<FormSubmission>;
  
  // Notification operations
  getNotificationsByUser(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, Profile>;
  private forms: Map<number, Form>;
  private formSubmissions: Map<number, FormSubmission>;
  private notifications: Map<number, Notification>;
  private currentUserId: number;
  private currentProfileId: number;
  private currentFormId: number;
  private currentSubmissionId: number;
  private currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.forms = new Map();
    this.formSubmissions = new Map();
    this.notifications = new Map();
    this.currentUserId = 1;
    this.currentProfileId = 1;
    this.currentFormId = 1;
    this.currentSubmissionId = 1;
    this.currentNotificationId = 1;
    
    this.seedForms();
  }

  private seedForms() {
    const sampleForms: InsertForm[] = [
      {
        name: "Aadhaar Update",
        category: "Government",
        description: "Update your Aadhaar details including address, phone, and email.",
        icon: "fas fa-id-card",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "aadhaarNumber", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "PAN Card Application",
        category: "Government",
        description: "Apply for new PAN card or reissue existing one.",
        icon: "fas fa-credit-card",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "aadhaarNumber", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "Bank Account Opening",
        category: "Banking",
        description: "Open savings or current account with required documents.",
        icon: "fas fa-university",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "aadhaarNumber", "panNumber", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "School Admission",
        category: "Education",
        description: "Apply for school admission with all required details.",
        icon: "fas fa-school",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "Voter ID",
        category: "Government",
        description: "Register as a voter and get your voter ID card.",
        icon: "fas fa-vote-yea",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "aadhaarNumber", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "Income Certificate",
        category: "Government",
        description: "Apply for income certificate for various purposes.",
        icon: "fas fa-file-invoice-dollar",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "Domicile Certificate",
        category: "Government",
        description: "Apply for domicile certificate for state residency proof.",
        icon: "fas fa-home",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "Scholarship Form",
        category: "Education",
        description: "Apply for government scholarships and educational aid.",
        icon: "fas fa-graduation-cap",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "aadhaarNumber", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "Hospital OPD Form",
        category: "Health",
        description: "Register for hospital OPD services.",
        icon: "fas fa-hospital",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "streetAddress", "city", "state", "pinCode"]
        }
      },
      {
        name: "Job Application",
        category: "Job",
        description: "Apply for government job positions.",
        icon: "fas fa-briefcase",
        template: {
          fields: ["fullName", "dateOfBirth", "fatherName", "motherName", "mobileNumber", "email", "aadhaarNumber", "streetAddress", "city", "state", "pinCode"]
        }
      }
    ];

    sampleForms.forEach(form => {
      this.createForm(form);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.firebaseUid === firebaseUid);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error('User not found');
    
    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Profile operations
  async getProfile(userId: number): Promise<Profile | undefined> {
    return Array.from(this.profiles.values()).find(profile => profile.userId === userId);
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.currentProfileId++;
    const profile: Profile = {
      ...insertProfile,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(userId: number, updates: Partial<Profile>): Promise<Profile> {
    const profile = Array.from(this.profiles.values()).find(p => p.userId === userId);
    if (!profile) throw new Error('Profile not found');
    
    const updatedProfile: Profile = {
      ...profile,
      ...updates,
      updatedAt: new Date(),
    };
    this.profiles.set(profile.id, updatedProfile);
    return updatedProfile;
  }

  // Form operations
  async getAllForms(): Promise<Form[]> {
    return Array.from(this.forms.values()).filter(form => form.isActive);
  }

  async getFormsByCategory(category: string): Promise<Form[]> {
    return Array.from(this.forms.values()).filter(form => form.category === category && form.isActive);
  }

  async getForm(id: number): Promise<Form | undefined> {
    return this.forms.get(id);
  }

  async createForm(insertForm: InsertForm): Promise<Form> {
    const id = this.currentFormId++;
    const form: Form = {
      ...insertForm,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.forms.set(id, form);
    return form;
  }

  async updateForm(id: number, updates: Partial<Form>): Promise<Form> {
    const form = this.forms.get(id);
    if (!form) throw new Error('Form not found');
    
    const updatedForm: Form = {
      ...form,
      ...updates,
      updatedAt: new Date(),
    };
    this.forms.set(id, updatedForm);
    return updatedForm;
  }

  async deleteForm(id: number): Promise<boolean> {
    return this.forms.delete(id);
  }

  // Form submission operations
  async getFormSubmissionsByUser(userId: number): Promise<FormSubmission[]> {
    return Array.from(this.formSubmissions.values()).filter(submission => submission.userId === userId);
  }

  async getFormSubmission(id: number): Promise<FormSubmission | undefined> {
    return this.formSubmissions.get(id);
  }

  async createFormSubmission(insertSubmission: InsertFormSubmission): Promise<FormSubmission> {
    const id = this.currentSubmissionId++;
    const submission: FormSubmission = {
      ...insertSubmission,
      id,
      submittedAt: new Date(),
      updatedAt: new Date(),
    };
    this.formSubmissions.set(id, submission);
    return submission;
  }

  async updateFormSubmission(id: number, updates: Partial<FormSubmission>): Promise<FormSubmission> {
    const submission = this.formSubmissions.get(id);
    if (!submission) throw new Error('Form submission not found');
    
    const updatedSubmission: FormSubmission = {
      ...submission,
      ...updates,
      updatedAt: new Date(),
    };
    this.formSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }

  // Notification operations
  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(notification => notification.userId === userId);
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const notification: Notification = {
      ...insertNotification,
      id,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;
    
    const updatedNotification: Notification = {
      ...notification,
      isRead: true,
    };
    this.notifications.set(id, updatedNotification);
    return true;
  }
}

export const storage = new MemStorage();
