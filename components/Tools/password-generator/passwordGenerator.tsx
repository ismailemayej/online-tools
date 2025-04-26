"use client";
import { useState, useCallback } from "react";
import {
  LockClosedIcon,
  ClipboardIcon,
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Slider,
  Checkbox,
  Tooltip,
  Input,
} from "@nextui-org/react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = useCallback(() => {
    const { uppercase, lowercase, numbers, symbols } = options;

    let charset = "";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("Select at least one option");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setCopied(false);
  }, [length, options]);

  const copyToClipboard = async () => {
    if (password && password !== "Select at least one option") {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleOption = (option: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const getPasswordStrength = () => {
    if (!password || password === "Select at least one option") return 0;

    let strength = 0;
    const { uppercase, lowercase, numbers, symbols } = options;

    // Length contributes up to 50% of strength
    strength += Math.min((length / 32) * 50, 50);

    // Character variety contributes the rest
    const varietyCount = [uppercase, lowercase, numbers, symbols].filter(
      Boolean
    ).length;
    strength += varietyCount * 12.5;

    return Math.min(Math.floor(strength), 100);
  };

  const strengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const strengthText = () => {
    const strength = getPasswordStrength();
    if (strength === 0) return "No password";
    if (strength < 40) return "Weak";
    if (strength < 70) return "Moderate";
    if (strength < 90) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <LockClosedIcon className="h-8 w-8 text-blue-500" />
        Password Generator
      </h1>

      <Card className="shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Generate Secure Password</h2>
          <Button
            size="sm"
            variant="light"
            startContent={<ArrowPathIcon className="h-4 w-4" />}
            onPress={generatePassword}
          >
            Generate
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className="gap-4">
          {/* Password Output */}
          <div className="flex gap-2 items-center">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              variant="bordered"
              classNames={{
                input: "text-lg font-mono",
              }}
              endContent={
                <div className="flex gap-1">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </Button>
                  <Tooltip content={copied ? "Copied!" : "Copy to clipboard"}>
                    <Button
                      isIconOnly
                      size="sm"
                      color={copied ? "success" : "default"}
                      variant="light"
                      onPress={copyToClipboard}
                      isDisabled={
                        !password || password === "Select at least one option"
                      }
                    >
                      <ClipboardIcon className="h-5 w-5" />
                    </Button>
                  </Tooltip>
                </div>
              }
            />
          </div>

          {/* Password Strength */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Password Strength</span>
              <span className="text-sm font-medium">{strengthText()}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${strengthColor()}`}
                style={{ width: `${getPasswordStrength()}%` }}
              ></div>
            </div>
          </div>

          {/* Length Slider */}
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Password Length</span>
              <span className="text-sm font-medium">{length} characters</span>
            </div>
            <Slider
              size="sm"
              minValue={4}
              maxValue={32}
              defaultValue={12}
              value={length}
              onChange={(value) => setLength(value as number)}
              className="max-w-md"
            />
          </div>

          {/* Character Options */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Checkbox
              isSelected={options.lowercase}
              onChange={() => toggleOption("lowercase")}
              icon={<CheckIcon className="h-4 w-4" />}
            >
              Lowercase (a-z)
            </Checkbox>
            <Checkbox
              isSelected={options.uppercase}
              onChange={() => toggleOption("uppercase")}
              icon={<CheckIcon className="h-4 w-4" />}
            >
              Uppercase (A-Z)
            </Checkbox>
            <Checkbox
              isSelected={options.numbers}
              onChange={() => toggleOption("numbers")}
              icon={<CheckIcon className="h-4 w-4" />}
            >
              Numbers (0-9)
            </Checkbox>
            <Checkbox
              isSelected={options.symbols}
              onChange={() => toggleOption("symbols")}
              icon={<CheckIcon className="h-4 w-4" />}
            >
              Symbols (!@#$)
            </Checkbox>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between">
          <Tooltip content="At least 12 characters recommended">
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <LockClosedIcon className="h-4 w-4" />
              Security Tips
            </div>
          </Tooltip>
          <Button
            color="primary"
            startContent={<ArrowPathIcon className="h-4 w-4" />}
            onPress={generatePassword}
          >
            Generate New
          </Button>
        </CardFooter>
      </Card>

      {/* Password Tips */}
      <Card className="mt-6 shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <LockClosedIcon className="h-5 w-5 text-blue-500" />
            Password Security Tips
          </h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Use at least 12 characters</li>
            <li>Include uppercase, lowercase, numbers, and symbols</li>
            <li>Avoid common words or personal information</li>
            <li>Don't reuse passwords across different sites</li>
            <li>Consider using a password manager</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
