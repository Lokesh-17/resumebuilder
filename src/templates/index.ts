import { TemplateSpec } from '@/types';
import modernTemplate from './modern.json';
import classicTemplate from './classic.json';
import minimalTemplate from './minimal.json';

export const templates: Record<string, TemplateSpec> = {
  modern: modernTemplate as TemplateSpec,
  classic: classicTemplate as TemplateSpec,
  minimal: minimalTemplate as TemplateSpec,
};

export const getTemplate = (id: string): TemplateSpec | undefined => {
  return templates[id];
};

export const getAllTemplates = (): TemplateSpec[] => {
  return Object.values(templates);
};
