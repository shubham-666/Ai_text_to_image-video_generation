import { ImplementationStep } from '../types';

export const implementationSteps: ImplementationStep[] = [
  {
    id: 'data-preparation',
    title: 'Data Preparation',
    description: 'Clean and preprocess datasets. Augment data if necessary to improve model robustness.',
    icon: 'Database'
  },
  {
    id: 'model-development',
    title: 'Model Development',
    description: 'Implement chosen architectures using TensorFlow or PyTorch. Train models on prepared datasets.',
    icon: 'Code2'
  },
  {
    id: 'testing',
    title: 'Testing & Fine-tuning',
    description: 'Conduct thorough testing to identify improvements. Fine-tune models based on feedback and metrics.',
    icon: 'TestTube'
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Containerize models with Docker for easy deployment. Deploy on cloud platforms for scalability.',
    icon: 'Cloud'
  },
  {
    id: 'ui-development',
    title: 'User Interface',
    description: 'Create intuitive interfaces for users to input text and receive generated visual content.',
    icon: 'Layout'
  }
];