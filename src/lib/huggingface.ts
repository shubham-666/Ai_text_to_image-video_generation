import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    console.log('Starting image generation with prompt:', prompt);
    const result = await hf.textToImage({
      inputs: prompt,
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      parameters: {
        negative_prompt: "blurry, bad quality, distorted, disfigured",
        num_inference_steps: 50,
        guidance_scale: 7.5,
      }
    });

    if (!result) {
      throw new Error('Failed to generate image: No result returned');
    }

    const imageUrl = URL.createObjectURL(result);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    if (error instanceof Error) {
      if (error.message.includes('API token')) {
        throw new Error('Authentication failed. Please check your HuggingFace API key.');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
    }
    throw new Error('Image generation failed. Please try again.');
  }
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const POLL_INTERVAL = 2000;
const MAX_POLL_ATTEMPTS = 60; // 2 minutes maximum waiting time

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'API request failed' }));
      throw new Error(error.detail || 'API request failed');
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying request... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await sleep(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const generateVideo = async (prompt: string): Promise<string> => {
  try {
    console.log('Starting video generation with prompt:', prompt);
    
    const initialResponse = await fetchWithRetry("/api/replicate/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        version: "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
        input: {
          prompt,
          num_frames: 50,
          width: 768,
          height: 432,
          num_inference_steps: 50,
          guidance_scale: 12.5,
          negative_prompt: "blurry, bad quality, distorted, disfigured",
          fps: 24
        }
      })
    });

    const prediction = await initialResponse.json();
    
    if (prediction.detail?.toLowerCase().includes('billing')) {
      throw new Error('Billing setup required. Please visit https://replicate.com/account/billing#billing to set up billing for video generation. If you have recently set up billing, please wait a few minutes before trying again.');
    }
    
    if (!prediction.id) {
      throw new Error('Failed to start video generation: Invalid response from server');
    }
    
    console.log('Video generation started:', prediction);

    // Poll for completion
    let result = prediction;
    let pollAttempts = 0;
    
    while (pollAttempts < MAX_POLL_ATTEMPTS) {
      if (result.status === "succeeded") {
        if (result.output && result.output[0]) {
          console.log('Video generation completed successfully');
          return result.output[0];
        }
        throw new Error('Video generation completed but no output was received');
      }
      
      if (result.status === "failed") {
        throw new Error(result.error || 'Video generation failed');
      }
      
      await sleep(POLL_INTERVAL);
      pollAttempts++;
      
      const pollResponse = await fetchWithRetry(`/api/replicate/v1/predictions/${prediction.id}`, {
        headers: {
          Authorization: `Token ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
          "Accept": "application/json"
        }
      });
      
      result = await pollResponse.json();
      console.log('Video generation status:', result.status, `(attempt ${pollAttempts}/${MAX_POLL_ATTEMPTS})`);
    }

    throw new Error('Video generation timed out. Please try again.');
  } catch (error) {
    console.error('Error generating video:', error);
    if (error instanceof Error) {
      if (error.message.includes('billing')) {
        throw error; // Pass through the billing error message
      } else if (error.message.includes('API token')) {
        throw new Error('Authentication failed. Please check your Replicate API token.');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
    }
    throw new Error('Video generation failed. Please try again.');
  }
};