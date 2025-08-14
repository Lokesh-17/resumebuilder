import React from 'react';
import { X } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

interface ColorPickerProps {
  onClose: () => void;
}

const colors = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#84cc16', // Lime
  '#ec4899', // Pink
  '#6b7280', // Gray
  '#1f2937', // Dark Gray
  '#059669', // Emerald
];

const ColorPicker: React.FC<ColorPickerProps> = ({ onClose }) => {
  const { accentColor, setAccentColor } = useResumeStore();

  const handleColorSelect = (color: string) => {
    setAccentColor(color);
    onClose();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-64">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Accent Color
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorSelect(color)}
            className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
              accentColor === color
                ? 'border-gray-900 dark:border-white ring-2 ring-offset-2 ring-gray-400'
                : 'border-gray-200 dark:border-gray-600'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Custom Color
        </label>
        <input
          type="color"
          value={accentColor}
          onChange={(e) => handleColorSelect(e.target.value)}
          className="w-full h-10 rounded border border-gray-300 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
