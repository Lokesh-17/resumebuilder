import React from 'react';
import { ResumeData } from '@/types';

interface ClassicTemplateProps {
  data: ResumeData;
  accentColor: string;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, accentColor }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 font-serif p-8">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">
          {data.contact.fullName || 'Your Name'}
        </h1>
        <p className="text-lg mb-4">{data.contact.title || 'Your Title'}</p>
        
        <div className="flex justify-center items-center space-x-4 text-sm">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span>•</span>}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.city && <span>•</span>}
          {data.contact.city && <span>{data.contact.city}</span>}
        </div>
        
        {data.contact.website && (
          <div className="mt-2 text-sm">
            <span>{data.contact.website}</span>
          </div>
        )}
      </div>

      {/* Objective/Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-center">
            Objective
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-center border-b border-gray-400 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="education-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600 italic">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div>{edu.year}</div>
                    {edu.score && <div className="text-gray-600">GPA: {edu.score}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-center border-b border-gray-400 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-gray-600 italic">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    {exp.description.map((desc, index) => (
                      <li key={index} className="text-sm leading-relaxed">
                        {desc.replace(/^[•\-\*]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-center border-b border-gray-400 pb-2">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-gray-600 text-sm">{skill.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-center border-b border-gray-400 pb-2">
            Notable Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  {project.link && (
                    <span className="text-sm text-blue-600">{project.link}</span>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                {project.stack.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <strong>Technologies:</strong> {project.stack.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-center border-b border-gray-400 pb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {data.certifications.map((cert, index) => (
              <li key={index} className="text-sm">{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-center border-b border-gray-400 pb-2">
            Achievements
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {data.achievements.map((achievement, index) => (
              <li key={index} className="text-sm">{achievement}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Interests */}
      {data.interests.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-center border-b border-gray-400 pb-2">
            Personal Interests
          </h2>
          <p className="text-gray-700 text-sm text-center">
            {data.interests.join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
