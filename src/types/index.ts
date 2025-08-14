export type FieldType = "text" | "textarea" | "email" | "phone" | "url" | "date" | "multiline" | "list";

export interface FieldSpec {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  visible?: boolean;
}

export interface SectionSpec {
  key: string;
  label: string;
  required?: boolean;
  repeatable?: boolean;
  fields: FieldSpec[];
}

export type TemplateId = "modern" | "classic" | "minimal";

export interface TemplateSpec {
  id: TemplateId;
  name: string;
  accentColor: string;
  fontPrefs: {
    heading: string;
    body: string;
  };
  sections: SectionSpec[];
}

export interface ContactInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  city: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  score?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced";
}

export interface ProjectItem {
  id: string;
  name: string;
  link?: string;
  description: string;
  stack: string[];
}

export interface ResumeData {
  templateId: TemplateId;
  contact: ContactInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: string[];
  achievements: string[];
  interests: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ResumeState {
  data: ResumeData;
  selectedTemplate: TemplateId;
  currentSection: string;
  isDarkMode: boolean;
  accentColor: string;
  validationErrors: ValidationError[];
  isAutoSaving: boolean;
  lastSaved: Date | null;
}
