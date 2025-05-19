import React from 'react';
import ModelCard from './ModelCard';
import { models } from '../data/models';

const ModelsShowcase: React.FC = () => {
  return (
    <section id="models" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our AI Models</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our advanced AI models designed to transform ideas into visuals with unprecedented quality and flexibility.
          </p>
        </div>
        
        <div className="space-y-12 divide-y divide-gray-200">
          {models.map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsShowcase;