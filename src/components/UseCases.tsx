import React from 'react';
import UseCaseCard from './UseCaseCard';
import { useCases } from '../data/useCases';

const UseCases: React.FC = () => {
  return (
    <section id="use-cases" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Example Use Cases</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI models can be applied across different industries and scenarios.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;