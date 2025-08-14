import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, ResumeState, TemplateId, ValidationError } from '@/types';

const initialResumeData: ResumeData = {
  templateId: 'modern',
  contact: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    city: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  interests: [],
};

interface ResumeStore extends ResumeState {
  // Actions
  setTemplate: (templateId: TemplateId) => void;
  setCurrentSection: (section: string) => void;
  updateContact: (contact: Partial<ResumeData['contact']>) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;
  updateCertifications: (certifications: string[]) => void;
  updateAchievements: (achievements: string[]) => void;
  updateInterests: (interests: string[]) => void;
  setAccentColor: (color: string) => void;
  toggleDarkMode: () => void;
  setValidationErrors: (errors: ValidationError[]) => void;
  clearAllData: () => void;
  importData: (data: ResumeData) => void;
  exportData: () => ResumeData;
  autoSave: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      data: initialResumeData,
      selectedTemplate: 'modern',
      currentSection: 'contact',
      isDarkMode: false,
      accentColor: '#3b82f6',
      validationErrors: [],
      isAutoSaving: false,
      lastSaved: null,

      // Actions
      setTemplate: (templateId) => {
        set((state) => ({
          data: { ...state.data, templateId },
          selectedTemplate: templateId,
        }));
        get().autoSave();
      },

      setCurrentSection: (section) => {
        set({ currentSection: section });
      },

      updateContact: (contact) => {
        set((state) => ({
          data: {
            ...state.data,
            contact: { ...state.data.contact, ...contact },
          },
        }));
        get().autoSave();
      },

      updateSummary: (summary) => {
        set((state) => ({
          data: { ...state.data, summary },
        }));
        get().autoSave();
      },

      addExperience: () => {
        const newExperience = {
          id: generateId(),
          role: '',
          company: '',
          startDate: '',
          endDate: '',
          current: false,
          description: [''],
        };
        set((state) => ({
          data: {
            ...state.data,
            experience: [...state.data.experience, newExperience],
          },
        }));
        get().autoSave();
      },

      updateExperience: (id, data) => {
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((exp) =>
              exp.id === id ? { ...exp, ...data } : exp
            ),
          },
        }));
        get().autoSave();
      },

      removeExperience: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((exp) => exp.id !== id),
          },
        }));
        get().autoSave();
      },

      reorderExperience: (fromIndex, toIndex) => {
        set((state) => {
          const newExperience = [...state.data.experience];
          const [removed] = newExperience.splice(fromIndex, 1);
          newExperience.splice(toIndex, 0, removed);
          return {
            data: { ...state.data, experience: newExperience },
          };
        });
        get().autoSave();
      },

      addEducation: () => {
        const newEducation = {
          id: generateId(),
          degree: '',
          institution: '',
          year: '',
          score: '',
        };
        set((state) => ({
          data: {
            ...state.data,
            education: [...state.data.education, newEducation],
          },
        }));
        get().autoSave();
      },

      updateEducation: (id, data) => {
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((edu) =>
              edu.id === id ? { ...edu, ...data } : edu
            ),
          },
        }));
        get().autoSave();
      },

      removeEducation: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        }));
        get().autoSave();
      },

      addSkill: () => {
        const newSkill = {
          id: generateId(),
          name: '',
          proficiency: 'Intermediate' as const,
        };
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, newSkill],
          },
        }));
        get().autoSave();
      },

      updateSkill: (id, data) => {
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((skill) =>
              skill.id === id ? { ...skill, ...data } : skill
            ),
          },
        }));
        get().autoSave();
      },

      removeSkill: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((skill) => skill.id !== id),
          },
        }));
        get().autoSave();
      },

      addProject: () => {
        const newProject = {
          id: generateId(),
          name: '',
          link: '',
          description: '',
          stack: [],
        };
        set((state) => ({
          data: {
            ...state.data,
            projects: [...state.data.projects, newProject],
          },
        }));
        get().autoSave();
      },

      updateProject: (id, data) => {
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((project) =>
              project.id === id ? { ...project, ...data } : project
            ),
          },
        }));
        get().autoSave();
      },

      removeProject: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((project) => project.id !== id),
          },
        }));
        get().autoSave();
      },

      reorderProjects: (fromIndex, toIndex) => {
        set((state) => {
          const newProjects = [...state.data.projects];
          const [removed] = newProjects.splice(fromIndex, 1);
          newProjects.splice(toIndex, 0, removed);
          return {
            data: { ...state.data, projects: newProjects },
          };
        });
        get().autoSave();
      },

      updateCertifications: (certifications) => {
        set((state) => ({
          data: { ...state.data, certifications },
        }));
        get().autoSave();
      },

      updateAchievements: (achievements) => {
        set((state) => ({
          data: { ...state.data, achievements },
        }));
        get().autoSave();
      },

      updateInterests: (interests) => {
        set((state) => ({
          data: { ...state.data, interests },
        }));
        get().autoSave();
      },

      setAccentColor: (color) => {
        set({ accentColor: color });
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      setValidationErrors: (errors) => {
        set({ validationErrors: errors });
      },

      clearAllData: () => {
        set({
          data: initialResumeData,
          validationErrors: [],
        });
      },

      importData: (data) => {
        set({
          data,
          selectedTemplate: data.templateId,
          validationErrors: [],
        });
        get().autoSave();
      },

      exportData: () => {
        return get().data;
      },

      autoSave: () => {
        set({ isAutoSaving: true, lastSaved: new Date() });
        // Simulate auto-save delay
        setTimeout(() => {
          set({ isAutoSaving: false });
        }, 500);
      },
    }),
    {
      name: 'resume-builder-storage',
      partialize: (state) => ({
        data: state.data,
        selectedTemplate: state.selectedTemplate,
        isDarkMode: state.isDarkMode,
        accentColor: state.accentColor,
      }),
    }
  )
);
