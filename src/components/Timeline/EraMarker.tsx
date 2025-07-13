'use client';

import React, { ReactElement } from 'react';
import { Era } from '@/lib/types';

interface EraMarkerProps {
  era: Era;
  onClick: () => void;
}

export default function EraMarker({ era, onClick }: EraMarkerProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center px-4 py-3 rounded-lg hover:bg-blue-50 hover:border hover:border-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer group"
      aria-label={`Navigate to ${era.name} era with ${era.events.length} events`}
    >
      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
        {era.name}
      </div>
      <div className="text-xs text-gray-500 group-hover:text-blue-600 mt-1 transition-colors duration-200">
        {era.events.length} events
      </div>
      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
    </button>
  );
} 