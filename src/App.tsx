import React, { useState, useEffect } from 'react';
import {
  Copy,
  RefreshCw,
  Check,
  Settings,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { generatePassword, calculatePasswordStrength } from './utils/passwordGenerator';
import PasswordStrength from './components/PasswordStrength';
import PasswordHistory from './components/PasswordHistory';
import { PasswordOptions, PasswordHistory as PasswordHistoryType } from './types';

function App() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>(() => {
    const saved = localStorage.getItem('passwordOptions');
    return saved ? JSON.parse(saved) : {
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSpecial: true,
      excludeSimilar: false,
      pronounceable: false,
    };
  });
  
  const [history, setHistory] = useState<PasswordHistoryType[]>([]);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    localStorage.setItem('passwordOptions', JSON.stringify(options));
  }, [options]);

  const generateNewPassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    const newStrength = calculatePasswordStrength(newPassword);
    setStrength(newStrength);
    
    setHistory((prev) => {
      const updated = [
        { password: newPassword, timestamp: new Date(), strength: newStrength },
        ...prev.slice(0, 4),
      ];
      return updated;
    });
  };

  useEffect(() => {
    generateNewPassword();
  }, [options]);

  const copyToClipboard = async (text: string = password) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <Shield className="w-12 h-12 text-indigo-600 mx-auto" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Password Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Generate secure, random passwords for your accounts
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                readOnly
                value={password}
                className="w-full pr-24 pl-4 py-3 text-lg font-mono bg-gray-50 rounded-lg"
              />
              <button
                onClick={() => copyToClipboard()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-md transition-colors"
                title="Copy password"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            <PasswordStrength strength={strength} />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={options.length}
                  onChange={(e) =>
                    setOptions({ ...options, length: parseInt(e.target.value) })
                  }
                  className="flex-1"
                />
                <input
                  type="number"
                  min="8"
                  max="64"
                  value={options.length}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      length: Math.min(64, Math.max(8, parseInt(e.target.value))),
                    })
                  }
                  className="w-20 px-2 py-1 border rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.includeUppercase}
                    onChange={(e) =>
                      setOptions({ ...options, includeUppercase: e.target.checked })
                    }
                    className="rounded text-indigo-600"
                  />
                  Uppercase (A-Z)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.includeLowercase}
                    onChange={(e) =>
                      setOptions({ ...options, includeLowercase: e.target.checked })
                    }
                    className="rounded text-indigo-600"
                  />
                  Lowercase (a-z)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.includeNumbers}
                    onChange={(e) =>
                      setOptions({ ...options, includeNumbers: e.target.checked })
                    }
                    className="rounded text-indigo-600"
                  />
                  Numbers (0-9)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.includeSpecial}
                    onChange={(e) =>
                      setOptions({ ...options, includeSpecial: e.target.checked })
                    }
                    className="rounded text-indigo-600"
                  />
                  Special (!@#$%^&*)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.excludeSimilar}
                    onChange={(e) =>
                      setOptions({ ...options, excludeSimilar: e.target.checked })
                    }
                    className="rounded text-indigo-600"
                  />
                  Exclude Similar
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.pronounceable}
                    onChange={(e) =>
                      setOptions({ ...options, pronounceable: e.target.checked })
                    }
                    className="rounded text-indigo-600"
                  />
                  Pronounceable
                </label>
              </div>
            </div>

            <button
              onClick={generateNewPassword}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Generate New Password
            </button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <PasswordHistory history={history} onCopy={copyToClipboard} />
          </div>
        )}

        <div className="text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Your passwords are generated locally and never stored or transmitted
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;