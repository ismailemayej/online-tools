'use client';
import { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  ArrowPathIcon,
  ClipboardIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Textarea,
} from '@nextui-org/react';

type CountResult = {
  characters: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
};

export default function WordCounter() {
  const [text, setText] = useState<string>('');
  const [counts, setCounts] = useState<CountResult>({
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    calculateCounts();
  }, [text]);

  const calculateCounts = () => {
    const characters = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).length - 1;
    const paragraphs =
      text.trim() === ''
        ? 0
        : text.split(/\n+/).filter((p) => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    setCounts({
      characters,
      words,
      sentences,
      paragraphs,
      readingTime,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const resetText = () => {
    setText('');
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-2xl lg:text-3xl p-4 bg-blue-800 rounded-xl dark:bg-gray-900 text-white font-bold flex items-center gap-2 mb-6">
        <DocumentTextIcon className="h-8 w-8 text-blue-500" />
        Word & Character Counter
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Text Input Section */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Enter your text</h2>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="light"
                  startContent={<ArrowPathIcon className="h-4 w-4" />}
                  onPress={resetText}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  color={copied ? 'success' : 'primary'}
                  startContent={<ClipboardIcon className="h-4 w-4" />}
                  onPress={copyToClipboard}
                  isDisabled={!text}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Textarea
                variant="bordered"
                minRows={12}
                placeholder="Type or paste your text here..."
                value={text}
                onChange={handleTextChange}
                classNames={{
                  input: 'resize-y min-h-[300px]',
                }}
              />
            </CardBody>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5 text-blue-500" />
                Text Statistics
              </h2>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Characters"
                  value={formatNumber(counts.characters)}
                  description="Including spaces"
                />
                <StatCard
                  title="Words"
                  value={formatNumber(counts.words)}
                  description="Based on word boundaries"
                />
                <StatCard
                  title="Sentences"
                  value={formatNumber(counts.sentences)}
                  description="Ending with . ! ?"
                />
                <StatCard
                  title="Paragraphs"
                  value={formatNumber(counts.paragraphs)}
                  description="Separated by new lines"
                />
              </div>

              <Divider className="my-2" />

              <div className="space-y-2">
                <h3 className="font-medium">Reading Time</h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(100, counts.readingTime * 10)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    ~{counts.readingTime} min (
                    {counts.readingTime > 1 ? 'minutes' : 'minute'})
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Based on average reading speed (200 words per minute)
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  description: string;
};

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="text-2xl font-bold my-1">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
