export interface ModelFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  industry: string;
  image: string;
}

export interface ModelType {
  id: string;
  title: string;
  description: string;
  features: ModelFeature[];
  imageUrl: string;
  techDescription: string;
}

export interface ImplementationStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}