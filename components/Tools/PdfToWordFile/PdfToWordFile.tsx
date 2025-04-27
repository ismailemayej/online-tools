'use client';
import { useState, useRef, ChangeEvent } from 'react';
import {
  DocumentArrowDownIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  XMarkIcon,
  CheckIcon,
  CloudArrowUpIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Progress,
  Tooltip,
  Spinner,
  Image,
  Chip,
} from '@nextui-org/react';

export default function PdfToWordConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setDownloadUrl(null);
    0;

    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Validate file type
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }

      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
    }
  };

  const convertToWord = () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setError(null);

    // Simulate conversion process (in a real app, you'd call an API here)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          // Simulate successful conversion with a dummy URL
          setDownloadUrl(
            URL.createObjectURL(
              new Blob(['Dummy Word content'], { type: 'application/msword' })
            )
          );
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetConverter = () => {
    setFile(null);
    setDownloadUrl(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <DocumentTextIcon className="h-8 w-8 text-blue-500" />
        PDF to Word Converter
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Upload PDF</h2>
            {file && (
              <Button
                size="sm"
                variant="light"
                startContent={<XMarkIcon className="h-4 w-4" />}
                onPress={resetConverter}
              >
                Clear
              </Button>
            )}
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center justify-center gap-4 p-8">
            {!file ? (
              <>
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="font-medium">Drag & drop your PDF here</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    or click to browse files
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                    Supports: PDF (Max 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,application/pdf"
                  className="hidden"
                />
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <DocumentTextIcon className="h-10 w-10 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                {!isConverting && !downloadUrl && (
                  <Button
                    color="primary"
                    className="w-full mt-6"
                    startContent={<SparklesIcon className="h-5 w-5" />}
                    onPress={convertToWord}
                  >
                    Convert to Word
                  </Button>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Conversion Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-lg font-semibold">Conversion Results</h2>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center justify-center gap-4 p-8 min-h-[300px]">
            {isConverting ? (
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Converting...</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress
                  aria-label="Conversion progress"
                  value={progress}
                  className="w-full"
                  color="primary"
                />
                <div className="flex justify-center">
                  <Spinner size="lg" />
                </div>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  This may take a few moments...
                </p>
              </div>
            ) : downloadUrl ? (
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-fit mx-auto mb-4">
                  <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Conversion Complete!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Your Word document is ready to download
                </p>
                <Button
                  color="success"
                  startContent={<DocumentArrowDownIcon className="h-5 w-5" />}
                  onPress={() => {
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = `${file?.name.replace('.pdf', '') || 'document'}.docx`;
                    link.click();
                  }}
                >
                  Download Word File
                </Button>
                <div className="mt-4">
                  <Chip color="success" variant="flat">
                    <span className="font-medium">Success</span>
                  </Chip>
                </div>
              </div>
            ) : error ? (
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900 rounded-full p-4 w-fit mx-auto mb-4">
                  <XMarkIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Conversion Failed</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
                <Button
                  variant="flat"
                  startContent={<ArrowPathIcon className="h-5 w-5" />}
                  onPress={resetConverter}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Image
                  src="/pdf-to-word-placeholder.svg"
                  alt="PDF to Word"
                  width={200}
                  height={200}
                  className="mx-auto opacity-70"
                />
                <h3 className="text-xl font-medium mt-4">
                  Convert PDF to Word
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Upload a PDF file to convert it to editable Word document
                </p>
              </div>
            )}
          </CardBody>
          {file && !isConverting && !downloadUrl && (
            <CardFooter className="bg-gray-50 dark:bg-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>File ready for conversion</p>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Features Section */}
      <Card className="mt-6 shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold">
            About PDF to Word Conversion
          </h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <DocumentTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium">Preserve Formatting</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Maintains original layout, fonts, and formatting during
                conversion.
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <SparklesIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium">Editable Output</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Converted Word documents are fully editable in Microsoft Word.
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                  <CloudArrowUpIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium">Secure Processing</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Files are processed securely and deleted after conversion.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
