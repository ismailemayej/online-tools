'use client';

import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { getCroppedImg } from '@/utils/basic-info/cropImage';
import bg from '@/public/eid-bg.jpg';

interface Position {
  x: number;
  y: number;
}

export default function PosterGenerator() {
  // Text states
  const [name, setName] = useState('মোঃ ইসমাইল হোসাইন');
  const [occupation, setOccupation] = useState('ইমাম,হাসা মাদ্রাসা মসজিদ');

  // Image states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  // Drag and drop states
  const [namePosition, setNamePosition] = useState<Position>({ x: 0, y: 0 });
  const [occupationPosition, setOccupationPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [imagePosition, setImagePosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeElement, setActiveElement] = useState<
    'name' | 'occupation' | 'image' | null
  >(null);

  // Refs
  const posterRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const occupationRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Other states
  const [isSharing, setIsSharing] = useState(false);

  // Crop handlers
  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Crop image handler
  const cropImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(cropped);
      setShowCropper(false);

      // Set initial position for the image after cropping
      if (posterRef.current) {
        const rect = posterRef.current.getBoundingClientRect();
        setImagePosition({
          x: rect.width / 2 - 48, // Center horizontally (assuming 96px width)
          y: rect.height - 120, // Position near bottom
        });
      }
    }
  };

  // Download poster handler
  const downloadPoster = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current);
      const link = document.createElement('a');
      link.download = 'eid-poster.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Share poster handler
  const sharePoster = async () => {
    if (posterRef.current) {
      setIsSharing(true);
      try {
        const canvas = await html2canvas(posterRef.current);
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve);
        });

        if (blob && navigator.share) {
          const file = new File([blob], 'eid-poster.png', {
            type: 'image/png',
          });
          await navigator.share({
            title: 'ঈদ মোবারক পোস্টার',
            text: 'আমার তৈরি ঈদ শুভেচ্ছা পোস্টার',
            files: [file],
          });
        } else {
          const link = document.createElement('a');
          link.href = canvas.toDataURL();
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.click();
        }
      } catch (error) {
        console.error('Error sharing:', error);
      } finally {
        setIsSharing(false);
      }
    }
  };

  // Drag and drop handlers
  const handleMouseDown = (
    element: 'name' | 'occupation' | 'image',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setIsDragging(true);
    setActiveElement(element);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !activeElement || !posterRef.current) return;

    const posterRect = posterRef.current.getBoundingClientRect();
    const x = e.clientX - posterRect.left;
    const y = e.clientY - posterRect.top;

    switch (activeElement) {
      case 'name':
        setNamePosition({ x, y });
        break;
      case 'occupation':
        setOccupationPosition({ x, y });
        break;
      case 'image':
        setImagePosition({ x, y });
        break;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveElement(null);
  };

  // Reset positions handler
  const resetPositions = () => {
    if (!posterRef.current) return;

    const rect = posterRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const bottomY = rect.height - 100;

    setNamePosition({ x: centerX - 100, y: bottomY - 60 });
    setOccupationPosition({ x: centerX - 100, y: bottomY - 30 });
    setImagePosition({ x: centerX - 48, y: bottomY - 120 });
  };

  return (
    <div className="min-h-screen bangla bg-gradient-to-br from-green-50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-green-600 dark:text-green-400">
            ঈদ শুভেচ্ছা পোস্টার জেনারেটর
          </h1>
          <p className="mt-2 text-center text-green-500 dark:text-green-300">
            কাস্টমাইজড ঈদ পোস্টার তৈরি করুন এবং শেয়ার করুন
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Section */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-6">
              পোস্টার কাস্টমাইজ করুন
            </h2>

            {/* Text Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  আপনার নাম
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  আপনার পদবি/পেশা
                </label>
                <input
                  type="text"
                  placeholder="ইমাম,হাসা মাদ্রাসা মসজিদ"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                আপনার ছবি যোগ করুন
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 focus-within:outline-none"
                    >
                      <span>ছবি আপলোড করুন</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">অথবা ড্র্যাগ করুন</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF সর্বোচ্চ 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={downloadPoster}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                ডাউনলোড করুন
              </button>

              <button
                onClick={sharePoster}
                disabled={isSharing}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition disabled:opacity-75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                {isSharing ? 'শেয়ার হচ্ছে...' : 'শেয়ার করুন'}
              </button>

              <button
                onClick={resetPositions}
                className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                পজিশন রিসেট করুন
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                পোস্টার প্রিভিউ
              </h2>
              <div className="flex justify-center">
                <div
                  ref={posterRef}
                  className="relative w-full max-w-md aspect-[3/4] bg-white dark:bg-gray-700 shadow-lg rounded-xl overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    src={bg.src}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Name - draggable */}
                  <div
                    ref={nameRef}
                    className="absolute cursor-move select-none"
                    style={{
                      left: `${namePosition.x}px`,
                      top: `${namePosition.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseDown={(e) => handleMouseDown('name', e)}
                  >
                    <h3 className="text-lg font-semibold text-white dark:text-gray-100">
                      {name}
                    </h3>
                  </div>

                  {/* Occupation - draggable */}
                  <div
                    ref={occupationRef}
                    className="absolute cursor-move select-none mt-12"
                    style={{
                      left: `${occupationPosition.x}px`,
                      top: `${occupationPosition.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseDown={(e) => handleMouseDown('occupation', e)}
                  >
                    <p className="text-sm font-medium text-white dark:text-gray-200">
                      {occupation}
                    </p>
                  </div>

                  {/* Image - draggable */}
                  {croppedImage && (
                    <div
                      ref={imageRef}
                      className="absolute cursor-move"
                      style={{
                        left: `${imagePosition.x}px`,
                        top: `${imagePosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseDown={(e) => handleMouseDown('image', e)}
                    >
                      <img
                        src={croppedImage}
                        alt="User"
                        className="w-36 h-36 rounded-full object-cover border-4  border-orange-400 shadow-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Cropper Modal */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden">
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                ছবি কাটুন
              </h3>
            </div>

            <div className="relative w-full h-96 md:h-[500px]">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="px-6 py-4 border-t dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  জুম:
                </span>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {zoom.toFixed(1)}x
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCropper(false)}
                  className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  বাতিল
                </button>
                <button
                  onClick={cropImage}
                  className="px-5 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 transition"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
