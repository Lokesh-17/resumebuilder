import React from 'react';
import { Check } from 'lucide-react';
import { TemplateSpec } from '@/types';

interface TemplateCardProps {
  template: TemplateSpec;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
  return (
    <div
      className={`template-card relative ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template.id)}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1">
          <Check className="w-4 h-4" />
        </div>
      )}
      
      {/* Template Preview */}
      <div className="mb-4 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <div className="p-4 h-full">
          {template.id === 'modern' && (
            <div className="flex h-full">
              <div className="w-1/3 bg-blue-600 text-white p-3 rounded-l">
                <div className="text-xs font-bold mb-2">JOHN DOE</div>
                <div className="text-xs mb-2">Software Engineer</div>
                <div className="space-y-1">
                  <div className="text-xs">📧 john@email.com</div>
                  <div className="text-xs">📱 (555) 123-4567</div>
                </div>
                <div className="mt-3">
                  <div className="text-xs font-semibold mb-1">SKILLS</div>
                  <div className="text-xs">• JavaScript</div>
                  <div className="text-xs">• React</div>
                  <div className="text-xs">• Node.js</div>
                </div>
              </div>
              <div className="w-2/3 p-3 bg-white text-gray-800">
                <div className="text-xs font-bold mb-2">EXPERIENCE</div>
                <div className="text-xs font-semibold">Senior Developer</div>
                <div className="text-xs text-gray-600">Tech Corp • 2020-Present</div>
                <div className="text-xs mt-1">• Built web applications</div>
                <div className="text-xs">• Led development team</div>
              </div>
            </div>
          )}
          
          {template.id === 'classic' && (
            <div className="h-full bg-white text-gray-800 p-3">
              <div className="text-center border-b pb-2 mb-2">
                <div className="text-sm font-bold font-serif">JOHN DOE</div>
                <div className="text-xs">Software Engineer</div>
                <div className="text-xs">john@email.com • (555) 123-4567</div>
              </div>
              <div className="text-xs font-serif font-bold mb-1">OBJECTIVE</div>
              <div className="text-xs mb-2">Seeking challenging opportunities...</div>
              <div className="text-xs font-serif font-bold mb-1">EDUCATION</div>
              <div className="text-xs font-semibold">BS Computer Science</div>
              <div className="text-xs">University • 2020</div>
              <div className="text-xs font-serif font-bold mb-1 mt-2">EXPERIENCE</div>
              <div className="text-xs font-semibold">Senior Developer</div>
              <div className="text-xs">Tech Corp • 2020-Present</div>
            </div>
          )}
          
          {template.id === 'minimal' && (
            <div className="h-full bg-white text-gray-800 p-3">
              <div className="mb-3">
                <div className="text-lg font-light">John Doe</div>
                <div className="text-xs text-gray-600">john@email.com</div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Experience</div>
                  <div className="text-xs">Senior Developer at Tech Corp</div>
                  <div className="text-xs text-gray-600">2020 - Present</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Skills</div>
                  <div className="text-xs">JavaScript • React • Node.js</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Education</div>
                  <div className="text-xs">BS Computer Science</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Template Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {template.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {template.id === 'modern' && 'Two-column layout with accent colors and bold headings'}
          {template.id === 'classic' && 'Traditional single-column design with serif fonts'}
          {template.id === 'minimal' && 'Clean layout with lots of whitespace and subtle dividers'}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;
