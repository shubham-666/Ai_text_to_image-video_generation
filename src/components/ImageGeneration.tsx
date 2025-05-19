import React, { useState, useEffect } from 'react';
import { generateImage, generateVideo } from '../lib/huggingface';

import { Wand2, Video, Image as ImageIcon, Loader, History, Trash2, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneratedItem {
  type: 'image' | 'video';
  prompt: string;
  url: string;
  timestamp: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'image' | 'video';
  url: string;
  prompt: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, url, prompt }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="relative max-w-7xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-4">
          {type === 'image' ? (
            <img
              src={url}
              alt={prompt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          ) : (
            <video
              src={url}
              controls
              autoPlay
              loop
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          )}
          <p className="mt-4 text-sm text-gray-600 break-words">{prompt}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ImageGeneration: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [history, setHistory] = useState<GeneratedItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [modalContent, setModalContent] = useState<{
    isOpen: boolean;
    type: 'image' | 'video';
    url: string;
    prompt: string;
  }>({
    isOpen: false,
    type: 'image',
    url: '',
    prompt: '',
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem('generationHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (type: 'image' | 'video', url: string) => {
    const newItem: GeneratedItem = {
      type,
      prompt,
      url,
      timestamp: Date.now(),
    };
    const updatedHistory = [newItem, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('generationHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('generationHistory');
  };

  const downloadImage = async (url: string, prompt: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `generated-${prompt.slice(0, 30)}-${Date.now()}.${mode === 'image' ? 'png' : 'mp4'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setGeneratingVideo(mode === 'video');
      
      if (mode === 'image') {
        const imageUrl = await generateImage(prompt);
        setImage(imageUrl);
        setVideo(null);
        saveToHistory('image', imageUrl);
      } else {
        const videoUrl = await generateVideo(prompt);
        setVideo(videoUrl);
        setImage(null);
        saveToHistory('video', videoUrl);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
      setGeneratingVideo(false);
    }
  };

  const openModal = (type: 'image' | 'video', url: string, promptText: string) => {
    setModalContent({
      isOpen: true,
      type,
      url,
      prompt: promptText,
    });
  };

  const closeModal = () => {
    setModalContent(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col space-y-6">
            {/* Prompt Section */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500">
                  Text to Image/Video Creation
                </h2>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1 text-sm"
                  >
                    <History className="w-4 h-4" />
                    History
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMode('image');
                      setVideo(null);
                      setImage(null);
                      setError(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm ${
                      mode === 'image'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Image
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMode('video');
                      setVideo(null);
                      setImage(null);
                      setError(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm ${
                      mode === 'video'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Video
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your prompt
                  </label>
                  <div className="relative">
                    <textarea
                      id="prompt"
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-sm"
                      placeholder={`Describe the ${mode} you want to generate...`}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      {generatingVideo ? 'Generating video...' : 'Generating...'}
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate {mode === 'image' ? 'Image' : 'Video'}
                    </>
                  )}
                </motion.button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-3"
                  >
                    <div className="text-red-700 text-sm">{error}</div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Generated Content Section */}
            <div className="w-full">
              <div className="relative min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg p-4">
                {image && mode === 'image' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative group cursor-pointer"
                    onClick={() => openModal('image', image, prompt)}
                  >
                    <img 
                      src={image} 
                      alt="Generated" 
                      className="max-w-full max-h-[500px] rounded-lg shadow-lg object-contain"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image, prompt);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </motion.div>
                )}

                {video && mode === 'video' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative group cursor-pointer w-full max-w-3xl mx-auto"
                    onClick={() => openModal('video', video, prompt)}
                  >
                    <video 
                      src={video} 
                      controls 
                      className="w-full max-h-[500px] rounded-lg shadow-lg"
                      autoPlay 
                      loop 
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(video, prompt);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </motion.div>
                )}

                {!image && !video && !loading && (
                  <div className="text-center text-gray-500">
                    <p>Generated content will appear here</p>
                  </div>
                )}

                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 backdrop-blur-sm rounded-lg">
                    <div className="text-center">
                      <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-600" />
                      <p className="text-sm text-gray-600">
                        {generatingVideo ? 'Generating video...' : 'Generating image...'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* History Section */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t pt-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-sm font-semibold text-gray-900">History</h2>
                    <button
                      onClick={clearHistory}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {history.map((item, index) => (
                      <motion.div
                        key={item.timestamp}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group cursor-pointer"
                        onClick={() => openModal(item.type, item.url, item.prompt)}
                      >
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.prompt}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ) : (
                          <video
                            src={item.url}
                            className="w-full h-24 object-cover rounded-lg"
                            controls
                          />
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadImage(item.url, item.prompt);
                          }}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Download className="w-4 h-4 text-gray-700" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalContent.isOpen && (
          <Modal
            isOpen={modalContent.isOpen}
            onClose={closeModal}
            type={modalContent.type}
            url={modalContent.url}
            prompt={modalContent.prompt}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGeneration;