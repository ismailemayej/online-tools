'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  QrCodeIcon,
  ClipboardIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  WifiIcon,
  UserIcon,
  LinkIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input,
  Select,
  SelectItem,
  Tooltip,
  Spinner,
  Tabs,
  Tab,
  Textarea,
} from '@nextui-org/react';
import QRCode from 'qrcode';

type QRContentType = 'url' | 'text' | 'email' | 'sms' | 'wifi' | 'contact';

interface QRContent {
  url: string;
  text: string;
  email: {
    address: string;
    subject: string;
    body: string;
  };
  sms: {
    phone: string;
    message: string;
  };
  wifi: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'None';
  };
  contact: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function QRCodeGenerator() {
  const [contentType, setContentType] = useState<QRContentType>('url');
  const [content, setContent] = useState<QRContent>({
    url: 'https://example.com',
    text: 'Sample text',
    email: {
      address: '',
      subject: '',
      body: '',
    },
    sms: {
      phone: '',
      message: '',
    },
    wifi: {
      ssid: '',
      password: '',
      encryption: 'WPA',
    },
    contact: {
      name: '',
      phone: '',
      email: '',
    },
  });
  const [qrCode, setQrCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState({
    size: 200,
    margin: 2,
    darkColor: '#000000',
    lightColor: '#ffffff',
    errorCorrection: 'M' as 'L' | 'M' | 'Q' | 'H',
  });
  const [copied, setCopied] = useState<boolean>(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQRPayload = () => {
    switch (contentType) {
      case 'url':
        return content.url;
      case 'text':
        return content.text;
      case 'email':
        return `mailto:${content.email.address}?subject=${encodeURIComponent(content.email.subject)}&body=${encodeURIComponent(content.email.body)}`;
      case 'sms':
        return `smsto:${content.sms.phone}:${encodeURIComponent(content.sms.message)}`;
      case 'wifi':
        return `WIFI:T:${content.wifi.encryption};S:${content.wifi.ssid};P:${content.wifi.password};;`;
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${content.contact.name}\nTEL:${content.contact.phone}\nEMAIL:${content.contact.email}\nEND:VCARD`;
      default:
        return '';
    }
  };

  const generateQRCode = useCallback(async () => {
    const payload = generateQRPayload();
    if (!payload.trim()) return;

    setIsLoading(true);
    try {
      const url = await QRCode.toDataURL(payload, {
        width: options.size,
        margin: options.margin,
        color: {
          dark: options.darkColor,
          light: options.lightColor,
        },
        errorCorrectionLevel: options.errorCorrection,
      });
      setQrCode(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [content, contentType, options]);

  useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qr-code-${contentType}-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (!qrCode) return;

    try {
      const blob = await fetch(qrCode).then((res) => res.blob());
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOptionChange = (key: keyof typeof options, value: any) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleContentChange = (
    field: string,
    value: string,
    subField?: string
  ) => {
    if (subField) {
      setContent((prev) => ({
        ...prev,
        [contentType]:
          typeof prev[contentType] === 'object' && prev[contentType] !== null
            ? { ...prev[contentType], [subField]: value }
            : prev[contentType],
      }));
    } else {
      setContent((prev) => ({
        ...prev,
        [contentType]: value,
      }));
    }
  };

  const renderContentInputs = () => {
    switch (contentType) {
      case 'url':
        return (
          <Input
            label="URL"
            placeholder="https://example.com"
            value={content.url}
            onValueChange={(value) => handleContentChange('url', value)}
            startContent={<LinkIcon className="h-5 w-5 text-gray-400" />}
            fullWidth
          />
        );
      case 'text':
        return (
          <Textarea
            label="Text"
            placeholder="Enter text to encode"
            value={content.text}
            onValueChange={(value) => handleContentChange('text', value)}
            startContent={
              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
            }
            minRows={4}
          />
        );
      case 'email':
        return (
          <div className="space-y-4">
            <Input
              label="Email Address"
              placeholder="recipient@example.com"
              value={content.email.address}
              onValueChange={(value) =>
                handleContentChange('email', value, 'address')
              }
              startContent={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
            <Input
              label="Subject"
              placeholder="Email subject"
              value={content.email.subject}
              onValueChange={(value) =>
                handleContentChange('email', value, 'subject')
              }
              fullWidth
            />
            <Textarea
              label="Body"
              placeholder="Email content"
              value={content.email.body}
              onValueChange={(value) =>
                handleContentChange('email', value, 'body')
              }
              minRows={3}
            />
          </div>
        );
      case 'sms':
        return (
          <div className="space-y-4">
            <Input
              label="Phone Number"
              placeholder="+1234567890"
              value={content.sms.phone}
              onValueChange={(value) =>
                handleContentChange('sms', value, 'phone')
              }
              fullWidth
            />
            <Textarea
              label="Message"
              placeholder="Text message content"
              value={content.sms.message}
              onValueChange={(value) =>
                handleContentChange('sms', value, 'message')
              }
              minRows={3}
            />
          </div>
        );
      case 'wifi':
        return (
          <div className="space-y-4">
            <Input
              label="Network Name (SSID)"
              placeholder="MyWiFiNetwork"
              value={content.wifi.ssid}
              onValueChange={(value) =>
                handleContentChange('wifi', value, 'ssid')
              }
              startContent={<WifiIcon className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
            <Input
              label="Password"
              placeholder="WiFi password"
              value={content.wifi.password}
              onValueChange={(value) =>
                handleContentChange('wifi', value, 'password')
              }
              type="password"
              fullWidth
            />
            <Select
              label="Encryption"
              selectedKeys={[content.wifi.encryption]}
              onChange={(e) =>
                handleContentChange('wifi', e.target.value, 'encryption')
              }
            >
              <SelectItem key="WPA" value="WPA">
                WPA/WPA2
              </SelectItem>
              <SelectItem key="WEP" value="WEP">
                WEP
              </SelectItem>
              <SelectItem key="None" value="None">
                None (Open Network)
              </SelectItem>
            </Select>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <Input
              label="Name"
              placeholder="John Doe"
              value={content.contact.name}
              onValueChange={(value) =>
                handleContentChange('contact', value, 'name')
              }
              startContent={<UserIcon className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
            <Input
              label="Phone"
              placeholder="+1234567890"
              value={content.contact.phone}
              onValueChange={(value) =>
                handleContentChange('contact', value, 'phone')
              }
              fullWidth
            />
            <Input
              label="Email"
              placeholder="contact@example.com"
              value={content.contact.email}
              onValueChange={(value) =>
                handleContentChange('contact', value, 'email')
              }
              fullWidth
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <QrCodeIcon className="h-8 w-8 text-blue-500" />
        QR Code Generator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">QR Code Content</h2>
              <Button
                size="sm"
                variant="light"
                startContent={<ArrowPathIcon className="h-4 w-4" />}
                onPress={generateQRCode}
              >
                Regenerate
              </Button>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <Tabs
                aria-label="QR Content Type"
                selectedKey={contentType}
                onSelectionChange={(key) =>
                  setContentType(key as QRContentType)
                }
              >
                <Tab key="url" title="URL" />
                <Tab key="text" title="Text" />
                <Tab key="email" title="Email" />
                <Tab key="sms" title="SMS" />
                <Tab key="wifi" title="WiFi" />
                <Tab key="contact" title="Contact" />
              </Tabs>

              <div className="mt-4">{renderContentInputs()}</div>

              <Divider className="my-4" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Error Correction"
                  selectedKeys={[options.errorCorrection]}
                  onChange={(e) =>
                    handleOptionChange('errorCorrection', e.target.value)
                  }
                >
                  <SelectItem key="L" value="L">
                    Low (7%)
                  </SelectItem>
                  <SelectItem key="M" value="M">
                    Medium (15%)
                  </SelectItem>
                  <SelectItem key="Q" value="Q">
                    Quartile (25%)
                  </SelectItem>
                  <SelectItem key="H" value="H">
                    High (30%)
                  </SelectItem>
                </Select>

                <Select
                  label="Size"
                  selectedKeys={[options.size.toString()]}
                  onChange={(e) =>
                    handleOptionChange('size', parseInt(e.target.value))
                  }
                >
                  <SelectItem key="100" value="100">
                    100px
                  </SelectItem>
                  <SelectItem key="200" value="200">
                    200px
                  </SelectItem>
                  <SelectItem key="300" value="300">
                    300px
                  </SelectItem>
                  <SelectItem key="400" value="400">
                    400px
                  </SelectItem>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="color"
                  label="Dark Color"
                  value={options.darkColor}
                  onChange={(e) =>
                    handleOptionChange('darkColor', e.target.value)
                  }
                />
                <Input
                  type="color"
                  label="Light Color"
                  value={options.lightColor}
                  onChange={(e) =>
                    handleOptionChange('lightColor', e.target.value)
                  }
                />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg h-full">
            <CardHeader>
              <h2 className="text-lg font-semibold">Generated QR Code</h2>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col items-center justify-center gap-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Spinner size="lg" />
                  <p className="mt-4 text-gray-500">Generating QR Code...</p>
                </div>
              ) : qrCode ? (
                <>
                  <div
                    ref={qrRef}
                    className="p-4 bg-white rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={qrCode}
                      alt="Generated QR Code"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Tooltip content={copied ? 'Copied!' : 'Copy to clipboard'}>
                      <Button
                        color={copied ? 'success' : 'default'}
                        startContent={<ClipboardIcon className="h-5 w-5" />}
                        onPress={copyToClipboard}
                        isDisabled={!qrCode}
                      >
                        Copy
                      </Button>
                    </Tooltip>
                    <Button
                      color="primary"
                      // startContent={<DownloadIcon className="h-5 w-5" />}
                      onPress={downloadQRCode}
                      isDisabled={!qrCode}
                    >
                      Download
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <QrCodeIcon className="h-12 w-12 mb-2" />
                  <p>Enter content to generate QR code</p>
                </div>
              )}
            </CardBody>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Scan the QR code with any smartphone camera
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Usage Tips */}
      <Card className="mt-6 shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <QrCodeIcon className="h-5 w-5 text-blue-500" />
            QR Code Usage Tips
          </h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>For URLs, always include https:// for proper scanning</li>
            <li>WiFi QR codes work on most modern smartphones</li>
            <li>Contact QR codes save directly to phone contacts</li>
            <li>
              Higher error correction makes codes more scannable when damaged
            </li>
            <li>Test your QR code before printing or sharing</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
