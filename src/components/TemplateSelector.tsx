import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { getAllTemplates } from '@/templates';

const TemplateSelector: React.FC = () => {
  const { selectedTemplate, setTemplate } = useResumeStore();
  const templates = getAllTemplates();

  const handleTemplateChange = (templateId: string) => {
    if (templateId !== selectedTemplate) {
      const confirmSwitch = window.confirm(
        'Switching templates may cause some fields to be lost. Do you want to continue?'
      );
      if (confirmSwitch) {
        setTemplate(templateId as any);
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Template
      </h3>
      <div className="space-y-2">
        {templates.map((template) => (
          <label
            key={template.id}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <input
              type="radio"
              name="template"
              value={template.id}
              checked={selectedTemplate === template.id}
              onChange={() => handleTemplateChange(template.id)}
              className="sr-only"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {template.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {template.id === 'modern' && 'Two-column with accent colors'}
                {template.id === 'classic' && 'Traditional single-column'}
                {template.id === 'minimal' && 'Clean and spacious'}
              </div>
            </div>
            <div
              className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: selectedTemplate === template.id ? template.accentColor : '#d1d5db',
                backgroundColor: selectedTemplate === template.id ? template.accentColor : 'transparent'
              }}
            >
              {selectedTemplate === template.id && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
