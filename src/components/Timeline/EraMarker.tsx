'use client';

import { Era } from '@/lib/types';

interface EraMarkerProps {
  era: Era;
}

export default function EraMarker({ era }: EraMarkerProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium text-gray-900">
        {era.name}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {era.events.length} events
      </div>
    </div>
  );
} 