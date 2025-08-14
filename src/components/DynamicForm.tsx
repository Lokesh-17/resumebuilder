import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { TemplateSpec, SectionSpec } from '@/types';

interface DynamicFormProps {
  template: TemplateSpec;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ template }) => {
  const {
    data,
    currentSection,
    updateContact,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    updateCertifications,
    updateAchievements,
    updateInterests
  } = useResumeStore();

  const currentSectionSpec = template.sections.find(s => s.key === currentSection);

  if (!currentSectionSpec) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Select a section to edit</p>
      </div>
    );
  }

  const renderContactForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {currentSectionSpec.label}
      </h2>
      {currentSectionSpec.fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type={field.type === 'phone' ? 'tel' : field.type === 'url' ? 'url' : field.type}
            value={data.contact[field.key as keyof typeof data.contact] || ''}
            onChange={(e) => updateContact({ [field.key]: e.target.value })}
            placeholder={field.placeholder}
            className="input-field"
          />
        </div>
      ))}
    </div>
  );

  const renderSummaryForm = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {currentSectionSpec.label}
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Summary
          {currentSectionSpec.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          value={data.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Brief professional summary highlighting your key skills and experience..."
          className="textarea-field"
          maxLength={600}
        />
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {data.summary.length}/600 characters
        </div>
      </div>
    </div>
  );

  const renderExperienceForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {currentSectionSpec.label}
        </h2>
        <button
          onClick={addExperience}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>
      
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="section-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Experience #{index + 1}
            </h3>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                placeholder="Senior Software Engineer"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                placeholder="Tech Corp"
                className="input-field"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date *
              </label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                disabled={exp.current}
                className="input-field"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { 
                    current: e.target.checked,
                    endDate: e.target.checked ? '' : exp.endDate
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Current</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Description *
            </label>
            <textarea
              value={exp.description.join('\n')}
              onChange={(e) => updateExperience(exp.id, { 
                description: e.target.value.split('\n').filter(line => line.trim()) 
              })}
              placeholder="• Developed and maintained web applications&#10;• Led a team of 5 developers&#10;• Improved system performance by 40%"
              className="textarea-field"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Use bullet points (•) or separate each point with a new line
            </div>
          </div>
        </div>
      ))}
      
      {data.experience.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No experience added yet. Click "Add Experience" to get started.
        </div>
      )}
    </div>
  );

  const renderEducationForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {currentSectionSpec.label}
        </h2>
        <button
          onClick={addEducation}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>
      
      {data.education.map((edu, index) => (
        <div key={edu.id} className="section-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Education #{index + 1}
            </h3>
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Degree *
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                placeholder="Bachelor of Science in Computer Science"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Institution *
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                placeholder="University of Technology"
                className="input-field"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year *
              </label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                placeholder="2020"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GPA/Score
              </label>
              <input
                type="text"
                value={edu.score || ''}
                onChange={(e) => updateEducation(edu.id, { score: e.target.value })}
                placeholder="3.8/4.0"
                className="input-field"
              />
            </div>
          </div>
        </div>
      ))}
      
      {data.education.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No education added yet. Click "Add Education" to get started.
        </div>
      )}
    </div>
  );

  const renderSkillsForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {currentSectionSpec.label}
        </h2>
        <button
          onClick={addSkill}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.skills.map((skill, index) => (
          <div key={skill.id} className="section-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Skill #{index + 1}
              </h3>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  placeholder="JavaScript"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proficiency Level
                </label>
                <select
                  value={skill.proficiency}
                  onChange={(e) => updateSkill(skill.id, { proficiency: e.target.value as any })}
                  className="input-field"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {data.skills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No skills added yet. Click "Add Skill" to get started.
        </div>
      )}
    </div>
  );

  const renderProjectsForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {currentSectionSpec.label}
        </h2>
        <button
          onClick={addProject}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>
      
      {data.projects.map((project, index) => (
        <div key={project.id} className="section-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Project #{index + 1}
            </h3>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  placeholder="E-commerce Platform"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Link
                </label>
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  placeholder="https://github.com/johndoe/project"
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                placeholder="Built a full-stack e-commerce platform using React and Node.js..."
                className="textarea-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tech Stack
              </label>
              <input
                type="text"
                value={project.stack.join(', ')}
                onChange={(e) => updateProject(project.id, { 
                  stack: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                })}
                placeholder="React, Node.js, MongoDB, Express"
                className="input-field"
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Separate technologies with commas
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {data.projects.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No projects added yet. Click "Add Project" to get started.
        </div>
      )}
    </div>
  );

  const renderGenericListForm = (items: string[], updateItems: (items: string[]) => void, placeholder: string) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {currentSectionSpec.label}
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {currentSectionSpec.label}
        </label>
        <textarea
          value={items.join('\n')}
          onChange={(e) => updateItems(e.target.value.split('\n').filter(line => line.trim()))}
          placeholder={placeholder}
          className="textarea-field"
        />
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Enter each item on a new line
        </div>
      </div>
    </div>
  );

  switch (currentSection) {
    case 'contact':
      return renderContactForm();
    case 'summary':
      return renderSummaryForm();
    case 'experience':
      return renderExperienceForm();
    case 'education':
      return renderEducationForm();
    case 'skills':
      return renderSkillsForm();
    case 'projects':
      return renderProjectsForm();
    case 'certifications':
      return renderGenericListForm(
        data.certifications,
        updateCertifications,
        'AWS Certified Solutions Architect\nGoogle Cloud Professional\nMicrosoft Azure Fundamentals'
      );
    case 'achievements':
      return renderGenericListForm(
        data.achievements,
        updateAchievements,
        'Employee of the Year 2023\nLed successful product launch\nIncreased team productivity by 30%'
      );
    case 'interests':
      return renderGenericListForm(
        data.interests,
        updateInterests,
        'Photography\nHiking\nOpen source contributions\nTech blogging'
      );
    default:
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Form for "{currentSection}" is not implemented yet.
          </p>
        </div>
      );
  }
};

export default DynamicForm;
