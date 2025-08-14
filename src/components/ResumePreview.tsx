import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { TemplateSpec } from '@/types';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ResumePreviewProps {
  template: TemplateSpec;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ template }) => {
  const { data, accentColor } = useResumeStore();

  const renderTemplate = () => {
    switch (template.id) {
      case 'modern':
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case 'classic':
        return <ClassicTemplate data={data} accentColor={accentColor} />;
      case 'minimal':
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      default:
        return <ModernTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="resume-container bg-white shadow-lg rounded-lg overflow-hidden">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
