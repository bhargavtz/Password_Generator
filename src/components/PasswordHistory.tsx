import React from 'react';
import { Copy } from 'lucide-react';
import { PasswordHistory } from '../types';
import PasswordStrength from './PasswordStrength';

interface PasswordHistoryProps {
  history: PasswordHistory[];
  onCopy: (password: string) => void;
}

const PasswordHistoryComponent: React.FC<PasswordHistoryProps> = ({
  history,
  onCopy,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Password History</h2>
      <div className="space-y-2">
        {history.map((entry, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm text-gray-800">{entry.password}</div>
              <button
                onClick={() => onCopy(entry.password)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Copy password"
              >
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <PasswordStrength strength={entry.strength} />
            <div className="text-xs text-gray-500">
              {entry.timestamp.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordHistoryComponent;