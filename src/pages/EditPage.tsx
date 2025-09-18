import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Eye, 
  Download, 
  Trash2, 
  Upload, 
  Save,
  Moon,
  Sun,
  Palette
} from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { getTemplate } from '@/templates';
import TemplateSelector from '@/components/TemplateSelector';
import SectionList from '@/components/SectionList';
import DynamicForm from '@/components/DynamicForm';
import ResumePreview from '@/components/ResumePreview';
import ColorPicker from '@/components/ColorPicker';

const EditPage: React.FC = () => {
  const navigate = useNavigate();
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const {
    selectedTemplate,
    isDarkMode,
    toggleDarkMode,
    clearAllData,
    exportData,
    importData,
    isAutoSaving,
    lastSaved
  } = useResumeStore();

  const template = getTemplate(selectedTemplate);

  const handleBack = () => {
    navigate('/');
  };

  const handlePreview = () => {
    navigate('/preview');
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearAllData();
    }
  };

  const handleExportJSON = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${selectedTemplate}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          importData(data);
        } catch (error) {
          alert('Invalid JSON file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Template not found
          </h2>
          <button onClick={handleBack} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Resume Builder
              </h1>
              {isAutoSaving && (
                <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                  <Save className="w-4 h-4 animate-pulse" />
                  <span>Saving...</span>
                </div>
              )}
              {lastSaved && !isAutoSaving && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Saved {lastSaved.toLocaleTimeString()}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
              >
                <Palette className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-2">
                <button
                  onClick={handlePreview}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                
                <button
                  onClick={handleDownloadPDF}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-2">
                <label className="btn-secondary flex items-center space-x-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={handleExportJSON}
                  className="btn-secondary"
                >
                  Export
                </button>
                
                <button
                  onClick={handleClearAll}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {showColorPicker && (
          <div className="absolute top-full right-4 z-50">
            <ColorPicker onClose={() => setShowColorPicker(false)} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <TemplateSelector />
          </div>
          <div className="flex-1 overflow-y-auto">
            <SectionList template={template} />
          </div>
        </div>

        {/* Center - Form */}
        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="p-6">
            <DynamicForm template={template} />
          </div>
        </div>

        {/* Right - Preview */}
        <div className="w-96 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Live Preview
            </h3>
            <div className="transform scale-50 origin-top-left w-[200%] h-[200%]">
              <ResumePreview template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
