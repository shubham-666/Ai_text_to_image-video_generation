import React from 'react';
import { XIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ModelType } from '../types';

interface ModelCardProps {
  model: ModelType;
  index: number;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, index }) => {
  const isEven = index % 2 === 0;

  // Dynamically get the Lucide icon based on the icon name
  const getIcon = (iconName: string) => {
    return LucideIcons[iconName as keyof typeof LucideIcons];
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 py-16">
      <div className={`lg:w-1/2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="h-72 md:h-96 overflow-hidden rounded-xl shadow-xl">
          <img 
            src={model.imageUrl} 
            alt={model.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
          />
        </div>
      </div>
      
      <div className={`lg:w-1/2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{model.title}</h2>
          <p className="text-lg text-gray-600 mb-6">{model.description}</p>
          
          <div className="space-y-4">
            {model.features.map((feature) => {
              const IconComponent = getIcon(feature.icon as keyof typeof LucideIcons);
              
              return (
                <div key={feature.id} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Technical Approach</h4>
            <p className="text-sm text-gray-600">{model.techDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;