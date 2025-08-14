import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { useResumeStore } from '@/store/resumeStore';
import { getTemplate } from '@/templates';
import ResumePreview from '@/components/ResumePreview';

const PreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);
  const { selectedTemplate } = useResumeStore();
  
  const template = getTemplate(selectedTemplate);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `Resume-${selectedTemplate}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
    `,
  });

  const handleBack = () => {
    navigate('/edit');
  };

  const handleEdit = () => {
    navigate('/edit');
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 no-print">
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
                Resume Preview
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleEdit}
                className="btn-secondary flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Resume</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={resumeRef}
            className="bg-white shadow-2xl rounded-lg overflow-hidden"
            style={{ aspectRatio: '210/297' }} // A4 aspect ratio
          >
            <ResumePreview template={template} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;
