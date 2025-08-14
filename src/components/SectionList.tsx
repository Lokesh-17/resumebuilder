import React from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen,
  Award,
  Trophy,
  Heart
} from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { TemplateSpec } from '@/types';

interface SectionListProps {
  template: TemplateSpec;
}

const sectionIcons = {
  contact: User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  projects: FolderOpen,
  certifications: Award,
  achievements: Trophy,
  interests: Heart,
};

const SectionList: React.FC<SectionListProps> = ({ template }) => {
  const { currentSection, setCurrentSection } = useResumeStore();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Sections
      </h3>
      <div className="space-y-1">
        {template.sections.map((section) => {
          const Icon = sectionIcons[section.key as keyof typeof sectionIcons] || FileText;
          const isActive = currentSection === section.key;
          
          return (
            <button
              key={section.key}
              onClick={() => setCurrentSection(section.key)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {section.label}
                  {section.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </div>
                {section.repeatable && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Multiple items
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionList;
