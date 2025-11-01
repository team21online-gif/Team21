
import React, { useState, useCallback } from 'react';
import { editImage } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setEditedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = (reader.result as string).split(',')[1];
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImageFile || !prompt) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const base64Data = await fileToBase64(originalImageFile);
      const newImageBase64 = await editImage(base64Data, originalImageFile.type, prompt);
      setEditedImage(`data:image/png;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      setError('Failed to edit image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, prompt]);

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-orbitron text-cyan-400">AI Image Editor</h1>
        <p className="text-gray-400 mt-2">Use text prompts to magically edit your images with Gemini.</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
        {!originalImage && (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-12">
             <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"/>
            <p className="mt-4 text-gray-500">Upload an image to get started</p>
          </div>
        )}

        {originalImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Original</h3>
              <img src={originalImage} alt="Original" className="rounded-lg shadow-md max-h-96" />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Edited</h3>
              <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center shadow-md">
                {isLoading && (
                  <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="mt-2 text-gray-300">Generating...</p>
                  </div>
                )}
                {editedImage && !isLoading && (
                  <img src={editedImage} alt="Edited" className="rounded-lg max-h-96" />
                )}
                {!editedImage && !isLoading && (
                   <p className="text-gray-400">Your edited image will appear here</p>
                )}
              </div>
            </div>
          </div>
        )}

        {originalImage && (
          <div className="mt-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Add a retro filter' or 'Make the sky purple'"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              rows={3}
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !prompt}
              className="mt-4 w-full py-3 px-4 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Generating...' : 'Apply Edit'}
            </button>
          </div>
        )}
        
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ImageEditor;
