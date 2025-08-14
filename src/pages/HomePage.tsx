import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Palette, Zap, Moon, Sun } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { getAllTemplates } from '@/templates';
import TemplateCard from '@/components/TemplateCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setTemplate, selectedTemplate, isDarkMode, toggleDarkMode } = useResumeStore();
  const templates = getAllTemplates();

  const handleTemplateSelect = (templateId: string) => {
    setTemplate(templateId as any);
  };

  const handleStartBuilding = () => {
    navigate('/edit');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Builder
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Create professional resumes with our beautiful templates. 
            Choose from modern, classic, or minimal designs that showcase your skills perfectly.
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Palette className="w-5 h-5" />
              <span>3 Beautiful Templates</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Zap className="w-5 h-5" />
              <span>Live Preview</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <FileText className="w-5 h-5" />
              <span>PDF Export</span>
            </div>
          </div>
        </div>
      </header>

      {/* Template Selection */}
      <main className="container mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Template
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Select a template that best represents your professional style
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onSelect={handleTemplateSelect}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleStartBuilding}
            className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Building Your Resume
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
