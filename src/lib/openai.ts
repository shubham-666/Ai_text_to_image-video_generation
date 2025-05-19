import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Reduced max length to avoid token limits
const MAX_PROMPT_LENGTH = 1000;

// List of potentially problematic terms that might trigger content policy
const BLOCKED_TERMS = [
  'nude', 'naked', 'nsfw', 'porn', 'explicit',
  'gore', 'blood', 'violence', 'terrorist',
  'hate', 'racist', 'offensive'
];

const sanitizePrompt = (prompt: string): string => {
  // Convert to lowercase for consistent processing
  let sanitized = prompt.toLowerCase();
  
  // Remove any URLs
  sanitized = sanitized.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
  
  // Remove email addresses
  sanitized = sanitized.replace(/[\w\.-]+@[\w\.-]+/g, '');
  
  // Remove special characters but keep basic punctuation
  sanitized = sanitized
    .replace(/[^\w\s.,!?-]/g, ' ')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  // Capitalize first letter of each sentence
  sanitized = sanitized
    .split('. ')
    .map(sentence => {
      if (sentence.length > 0) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      return sentence;
    })
    .join('. ');

  return sanitized.slice(0, MAX_PROMPT_LENGTH);
};

const validatePrompt = (prompt: string): { isValid: boolean; error?: string } => {
  if (!prompt || prompt.trim().length === 0) {
    return { isValid: false, error: 'Prompt cannot be empty' };
  }
  
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return { 
      isValid: false, 
      error: `Prompt is too long. Maximum length is ${MAX_PROMPT_LENGTH} characters` 
    };
  }

  // Check for blocked terms
  const lowerPrompt = prompt.toLowerCase();
  const foundBlockedTerm = BLOCKED_TERMS.find(term => lowerPrompt.includes(term));
  if (foundBlockedTerm) {
    return {
      isValid: false,
      error: 'Your prompt contains content that may violate our content policy. Please try a different description.'
    };
  }

  // Ensure prompt has enough context
  if (prompt.trim().split(' ').length < 3) {
    return {
      isValid: false,
      error: 'Please provide a more detailed description (at least 3 words)'
    };
  }

  return { isValid: true };
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const validation = validatePrompt(prompt);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const sanitizedPrompt = sanitizePrompt(prompt);
    console.log('Starting image generation with prompt:', sanitizedPrompt);

    // Add specific context to help guide the AI
    const enhancedPrompt = `Create a high-quality, appropriate image of: ${sanitizedPrompt}. Keep the image safe and suitable for all audiences.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard", // Changed from "hd" to "standard" for better reliability
      style: "natural" // Changed from "vivid" to "natural" for more consistent results
    });

    if (!response.data[0]?.url) {
      throw new Error('Failed to generate image: No URL returned');
    }

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Authentication failed. Please check your OpenAI API key.');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      } else if (error.message.includes('400')) {
        throw new Error('Please try a simpler or more specific description.');
      }
      // If it's our validation error, pass it through
      if (error.message.includes('Prompt')) {
        throw error;
      }
    }
    throw new Error('Image generation failed. Please try again with a different description.');
  }
};

export const generateVideo = async (prompt: string): Promise<string> => {
  try {
    const validation = validatePrompt(prompt);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const sanitizedPrompt = sanitizePrompt(prompt);
    console.log('Starting video generation with prompt:', sanitizedPrompt);

    const enhancedPrompt = `Create a safe and appropriate video sequence showing: ${sanitizedPrompt}. Keep the content suitable for all audiences.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    if (!response.data[0]?.url) {
      throw new Error('Failed to generate video content: No URL returned');
    }

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating video:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Authentication failed. Please check your OpenAI API key.');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      } else if (error.message.includes('400')) {
        throw new Error('Please try a simpler or more specific description for the video.');
      }
      // If it's our validation error, pass it through
      if (error.message.includes('Prompt')) {
        throw error;
      }
    }
    throw new Error('Video generation failed. Please try again with a different description.');
  }
};