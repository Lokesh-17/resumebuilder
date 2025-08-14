import React from 'react';
import { ResumeData } from '@/types';

interface MinimalTemplateProps {
  data: ResumeData;
  accentColor: string;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, accentColor }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 font-sans p-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-light mb-2">
          {data.contact.fullName || 'Your Name'}
        </h1>
        {data.contact.title && (
          <p className="text-lg text-gray-600 mb-6">{data.contact.title}</p>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.city && <span>{data.contact.city}</span>}
          {data.contact.website && <span>{data.contact.website}</span>}
          {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
        </div>
      </div>

      {/* About */}
      {data.summary && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            About
          </h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Experience
          </h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium">{exp.role}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {exp.description.map((desc, index) => (
                      <p key={index} className="text-sm text-gray-700 leading-relaxed">
                        {desc.replace(/^[•\-\*]\s*/, '• ')}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Skills
          </h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 text-sm rounded-full border"
                style={{ 
                  borderColor: accentColor,
                  color: accentColor,
                  backgroundColor: `${accentColor}08`
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Education
          </h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="education-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{edu.year}</div>
                    {edu.score && <div>{edu.score}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Projects
          </h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      className="text-sm text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.link.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                {project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.stack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded"
                        style={{ 
                          backgroundColor: `${accentColor}15`,
                          color: accentColor
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Certifications
          </h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>
          <div className="space-y-1">
            {data.certifications.map((cert, index) => (
              <p key={index} className="text-sm text-gray-700">{cert}</p>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Achievements
          </h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>
          <div className="space-y-1">
            {data.achievements.map((achievement, index) => (
              <p key={index} className="text-sm text-gray-700">{achievement}</p>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {data.interests.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Interests
          </h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>
          <p className="text-sm text-gray-700">
            {data.interests.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
