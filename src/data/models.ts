import { ModelType } from '../types';

export const models: ModelType[] = [
  {
    id: 'image-generation',
    title: 'Image Generation',
    description: 'Create stunning images from textual descriptions using advanced generative models.',
    features: [
      {
        id: 'high-quality',
        title: 'High Quality Output',
        description: 'Generate photorealistic images with incredible detail and precision.',
        icon: 'Image'
      },
      {
        id: 'style-control',
        title: 'Style Control',
        description: 'Define artistic styles and visual characteristics through text prompts.',
        icon: 'Palette'
      },
      {
        id: 'instant-results',
        title: 'Instant Results',
        description: 'Get results in seconds, allowing for rapid iteration and experimentation.',
        icon: 'Zap'
      }
    ],
    imageUrl: 'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techDescription: 'Our image generation model uses diffusion models and transformers to convert text descriptions into vivid images. The system is trained on diverse datasets to ensure wide creative range.'
  },
  {
    id: 'video-generation',
    title: 'Video Generation',
    description: 'Transform text prompts into dynamic video clips with coherent motion and storytelling.',
    features: [
      {
        id: 'narrative',
        title: 'Narrative Control',
        description: 'Create short stories and scenarios through detailed text descriptions.',
        icon: 'Film'
      },
      {
        id: 'temporal',
        title: 'Temporal Consistency',
        description: 'Generate videos with smooth transitions and consistent subjects across frames.',
        icon: 'Layers'
      },
      {
        id: 'customizable',
        title: 'Customizable Duration',
        description: 'Control the length and pacing of generated video content.',
        icon: 'Clock'
      }
    ],
    imageUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techDescription: 'Our video generation model uses a combination of 3D CNNs and transformer architectures to create temporal coherence. We emphasize both visual quality and narrative flow.'
  },
  {
    id: 'gif-creation',
    title: 'GIF Creation',
    description: 'Convert static images into engaging animated GIFs with customizable effects.',
    features: [
      {
        id: 'animation-styles',
        title: 'Animation Styles',
        description: 'Choose from various animation patterns and visual effects.',
        icon: 'Sparkles'
      },
      {
        id: 'loop-control',
        title: 'Loop Control',
        description: 'Define perfect loops for seamless continuous playback.',
        icon: 'Repeat'
      },
      {
        id: 'lightweight',
        title: 'Lightweight Output',
        description: 'Create optimized GIFs that load quickly on any platform.',
        icon: 'Feather'
      }
    ],
    imageUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techDescription: 'Our GIF creation model uses frame interpolation techniques and specialized animation networks to transform static images into lively animations.'
  }
];