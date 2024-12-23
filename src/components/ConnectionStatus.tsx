// src/components/common/ConnectionStatus.tsx
import React from 'react';
import { useWebSocket } from '@/providers/websocket';

export const ConnectionStatus: React.FC = () => {
  const { isConnected, isConnecting } = useWebSocket();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isConnected
            ? 'bg-green-500'
            : isConnecting
            ? 'bg-yellow-500'
            : 'bg-red-500'
        }`}
      />
      <span className="text-sm text-gray-600">
        {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
};