'use client';

import { motion } from 'framer-motion';
import { TimelineEvent as TimelineEventType } from '@/lib/types';
import { formatDate } from '@/lib/data';



interface TimelineEventProps {
  event: TimelineEventType;
  index: number;
  isFocused: boolean;
  onClick: () => void;
  onFocus: () => void;
}

export default function TimelineEvent({ event, index, isFocused, onClick, onFocus }: TimelineEventProps) {
  const formattedDate = formatDate(event.start_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex-shrink-0 w-80"
    >
      <div 
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer p-6 border ${
          isFocused 
            ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
            : 'border-gray-200'
        }`}
        onClick={onClick}
        onFocus={onFocus}
        tabIndex={0}
        role="button"
        aria-label={`Timeline event: ${event.text.headline}`}
        data-event-index={index}
      >
        {/* Date */}
        <div className="text-sm text-gray-500 mb-3">
          {formattedDate}
        </div>

        {/* Image */}
        {event.media.image && (
          <div className="mb-3">
            <img
              src={event.media.image}
              alt={event.media.caption}
              className="w-full h-32 object-cover rounded-md"
              onError={(e) => {
                // Hide image on error
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Headline */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.text.headline}
        </h3>

        {/* Description */}
        <div 
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ 
            __html: event.text.text.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
          }}
        />

        {/* Click indicator */}
        <div className="mt-4 text-xs text-blue-600">
          Click to learn more →
        </div>
      </div>
    </motion.div>
  );
} 