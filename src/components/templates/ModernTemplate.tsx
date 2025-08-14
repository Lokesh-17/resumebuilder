import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData } from '@/types';

interface ModernTemplateProps {
  data: ResumeData;
  accentColor: string;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, accentColor }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 font-sans">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div 
          className="w-1/3 p-6 text-white"
          style={{ backgroundColor: accentColor }}
        >
          {/* Contact Info */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 uppercase tracking-wide">
              {data.contact.fullName || 'Your Name'}
            </h1>
            <p className="text-lg opacity-90 mb-4">
              {data.contact.title || 'Your Title'}
            </p>
            
            <div className="space-y-2 text-sm">
              {data.contact.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">{data.contact.email}</span>
                </div>
              )}
              {data.contact.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{data.contact.phone}</span>
                </div>
              )}
              {data.contact.city && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{data.contact.city}</span>
                </div>
              )}
              {data.contact.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">{data.contact.website}</span>
                </div>
              )}
              {data.contact.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">{data.contact.linkedin}</span>
                </div>
              )}
              {data.contact.github && (
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">{data.contact.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
                Skills
              </h2>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs opacity-75">{skill.proficiency}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all"
                        style={{
                          width: skill.proficiency === 'Advanced' ? '90%' : 
                                 skill.proficiency === 'Intermediate' ? '70%' : '50%'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-sm opacity-90">{edu.institution}</p>
                    <div className="flex justify-between text-xs opacity-75">
                      <span>{edu.year}</span>
                      {edu.score && <span>{edu.score}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {data.interests.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/20 rounded text-xs"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-6">
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 
                className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
                style={{ borderColor: accentColor }}
              >
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
                style={{ borderColor: accentColor }}
              >
                Work Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold" style={{ color: accentColor }}>
                          {exp.role}
                        </h3>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-500 text-right">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
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

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
                style={{ borderColor: accentColor }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id} className="project-item">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold" style={{ color: accentColor }}>
                        {project.name}
                      </h3>
                      {project.link && (
                        <a 
                          href={project.link}
                          className="text-sm text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                    {project.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded"
                            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
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
            <div className="mb-8">
              <h2 
                className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
                style={{ borderColor: accentColor }}
              >
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
            <div>
              <h2 
                className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
                style={{ borderColor: accentColor }}
              >
                Achievements
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {data.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm">{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
