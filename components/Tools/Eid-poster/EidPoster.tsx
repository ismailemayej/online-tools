'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { getCroppedImg } from '@/utils/basic-info/cropImage';
import bg from '@/public/eid-bg.jpg';
import defaultProfile from '@/public/default-profile.png';

interface Position {
  x: number;
  y: number;
}

export default function PosterGenerator() {
  // Text states
  const [name, setName] = useState('মোঃ ইসমাইল হোসাইন');
  const [occupation, setOccupation] = useState('ইমাম,হাসা মাদ্রাসা মসজিদ');
  const [fontSize, setFontSize] = useState(16);

  // Image states
  const [imageSrc, setImageSrc] = useState<string | null>(defaultProfile.src); // Set default profile image
  const [croppedImage, setCroppedImage] = useState<string | null>(
    defaultProfile.src
  ); // Set default profile image
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  // Drag and drop states
  const [namePosition, setNamePosition] = useState<Position>({
    x: 95,
    y: 578,
  }); // Default position for name (bottom left)
  const [imagePosition, setImagePosition] = useState<Position>({
    x: 240,
    y: 420,
  }); // Default position for image (center)
  const [isDragging, setIsDragging] = useState(false);
  const [activeElement, setActiveElement] = useState<'name' | 'image' | null>(
    null
  );

  // Refs
  const posterRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Other states
  const [isSharing, setIsSharing] = useState(false);
  const [posterSize, setPosterSize] = useState({ width: 600, height: 800 });
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Set initial positions when component mounts
  useEffect(() => {
    const checkIfMobile = () => window.innerWidth < 768;
    setIsMobile(checkIfMobile());

    const handleResize = () => {
      setIsMobile(checkIfMobile());
      if (posterRef.current) {
        const rect = posterRef.current.getBoundingClientRect();
        setPosterSize({ width: rect.width, height: rect.height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Load fonts
    const loadFonts = async () => {
      const font = new FontFace('BanglaFont', 'url(/fonts/SolaimanLipi.ttf)');
      try {
        const loadedFont = await font.load();
        document.fonts.add(loadedFont);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Failed to load font:', error);
        setFontsLoaded(true); // Continue even if font fails to load
      }
    };

    loadFonts();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Combined touch and mouse handlers
  const handleStart = (
    element: 'name' | 'image',
    e: React.TouchEvent | React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setActiveElement(element);
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !activeElement || !posterRef.current) return;

    const posterRect = posterRef.current.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x =
      ((clientX - posterRect.left) / posterRect.width) * posterSize.width;
    const y =
      ((clientY - posterRect.top) / posterRect.height) * posterSize.height;

    switch (activeElement) {
      case 'name':
        setNamePosition({ x, y });
        break;
      case 'image':
        setImagePosition({ x, y });
        break;
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setActiveElement(null);
  };

  // Add event listeners for mobile
  useEffect(() => {
    const posterElement = posterRef.current;
    if (!posterElement) return;

    const options = { passive: false };

    // Touch events
    posterElement.addEventListener('touchmove', handleMove as any, options);
    posterElement.addEventListener('touchend', handleEnd, options);

    return () => {
      posterElement.removeEventListener('touchmove', handleMove as any);
      posterElement.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, activeElement]);

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
    }
  };

  // Download poster handler with fixed aspect ratio
  const downloadPoster = async () => {
    if (!fontsLoaded) {
      alert('Please wait while fonts load...');
      return;
    }

    if (posterRef.current) {
      // Create a temporary container with fixed size
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '600px';
      tempContainer.style.height = '800px';
      tempContainer.style.backgroundColor = 'white';
      document.body.appendChild(tempContainer);

      // Clone the poster content
      const clone = posterRef.current.cloneNode(true) as HTMLElement;
      clone.style.width = '600px';
      clone.style.height = '800px';
      clone.style.margin = '0';
      clone.style.padding = '0';

      // Apply styles to ensure consistent rendering
      const nameElement = clone.querySelector('.name-element') as HTMLElement;
      if (nameElement) {
        nameElement.style.left = '100px';
        nameElement.style.top = '700px';
        nameElement.style.transform = 'translate(-50%, -50%)';
      }

      const imageElement = clone.querySelector('.image-element') as HTMLElement;
      if (imageElement) {
        imageElement.style.left = '300px';
        imageElement.style.top = '450px';
        imageElement.style.transform = 'translate(-50%, -50%)';
      }

      // Force cover style for download
      const bgImage = clone.querySelector('.poster-bg') as HTMLElement;
      if (bgImage) {
        bgImage.style.objectFit = 'cover';
        bgImage.style.width = '100%';
        bgImage.style.height = '100%';
      }

      tempContainer.appendChild(clone);

      try {
        const canvas = await html2canvas(tempContainer, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: 'white',
          width: 600,
          height: 800,
        });

        const link = document.createElement('a');
        link.download = 'eid-poster.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      } finally {
        document.body.removeChild(tempContainer);
      }
    }
  };

  // Share poster handler
  const sharePoster = async () => {
    if (posterRef.current) {
      setIsSharing(true);
      try {
        // Create a temporary container for consistent sizing
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'fixed';
        tempContainer.style.left = '-9999px';
        tempContainer.style.width = '600px';
        tempContainer.style.height = '800px';
        tempContainer.style.backgroundColor = 'white';
        document.body.appendChild(tempContainer);

        // Clone the poster content
        const clone = posterRef.current.cloneNode(true) as HTMLElement;
        clone.style.width = '600px';
        clone.style.height = '800px';
        clone.style.margin = '0';
        clone.style.padding = '0';

        // Apply styles to ensure consistent rendering
        const nameElement = clone.querySelector('.name-element') as HTMLElement;
        if (nameElement) {
          nameElement.style.left = '100px';
          nameElement.style.top = '700px';
          nameElement.style.transform = 'translate(-50%, -50%)';
        }

        const imageElement = clone.querySelector(
          '.image-element'
        ) as HTMLElement;
        if (imageElement) {
          imageElement.style.left = '300px';
          imageElement.style.top = '450px';
          imageElement.style.transform = 'translate(-50%, -50%)';
        }

        // Force cover style for sharing
        const bgImage = clone.querySelector('.poster-bg') as HTMLElement;
        if (bgImage) {
          bgImage.style.objectFit = 'cover';
          bgImage.style.width = '100%';
          bgImage.style.height = '100%';
        }

        tempContainer.appendChild(clone);

        const canvas = await html2canvas(clone, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: 'white',
          width: 600,
          height: 800,
        });

        document.body.removeChild(tempContainer);

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, 'image/png', 1.0);
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
          link.href = canvas.toDataURL('image/png', 1.0);
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

  // Reset positions handler
  const resetPositions = () => {
    setNamePosition({ x: 100, y: 700 }); // Bottom left
    setImagePosition({ x: 300, y: 450 }); // Center
  };

  // Font size adjustment handlers
  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 32)); // Max 32px
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 10)); // Min 10px
  };

  function onCropComplete(croppedArea: Area, croppedAreaPixels: Area): void {
    setCroppedAreaPixels(croppedAreaPixels);
  }

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

            {/* Font Size Controls */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                লেখার সাইজ
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseFontSize}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md"
                >
                  ছোট
                </button>
                <span className="text-sm">{fontSize}px</span>
                <button
                  onClick={increaseFontSize}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md"
                >
                  বড়
                </button>
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
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '600px',
                    background: 'white',
                  }}
                >
                  {/* Background image with responsive scaling */}
                  <div className="absolute inset-0 w-full h-full flex justify-center items-center bg-black overflow-hidden">
                    <img
                      src={bg.src}
                      alt="Background"
                      className={`poster-bg ${isMobile ? 'object-contain h-full w-auto' : 'object-cover w-full h-full'}`}
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* Name and Occupation - draggable */}
                  <div
                    ref={nameRef}
                    className="absolute cursor-move select-none touch-none name-element"
                    style={{
                      left: `${namePosition.x}px`,
                      top: `${namePosition.y}px`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      textAlign: 'center',
                      fontFamily:
                        "BanglaFont, 'Tiro Bangla', serif, Arial, sans-serif",
                    }}
                    onMouseDown={(e) => handleStart('name', e)}
                    onTouchStart={(e) => handleStart('name', e)}
                  >
                    <h3
                      style={{ fontSize: `${fontSize}px` }}
                      className="headline"
                    >
                      {name}
                    </h3>
                    <p
                      style={{ fontSize: `${fontSize - 4}px` }}
                      className="sub-headline mt-[-4px]"
                    >
                      {occupation}
                    </p>
                  </div>

                  {/* Image - draggable */}
                  {croppedImage && (
                    <div
                      ref={imageRef}
                      className="absolute cursor-move touch-none image-element"
                      style={{
                        left: `${imagePosition.x}px`,
                        top: `${imagePosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                      }}
                      onMouseDown={(e) => handleStart('image', e)}
                      onTouchStart={(e) => handleStart('image', e)}
                    >
                      <img
                        src={croppedImage}
                        alt="User"
                        className="w-32 h-32 md:w-32 md:h-32 rounded-full object-cover border-4 border-orange-300 shadow-xl"
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
