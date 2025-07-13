'use client';

import { motion } from 'framer-motion';
import { TimelineEvent as TimelineEventType } from '@/lib/types';
import { formatDate } from '@/lib/data';



interface TimelineEventProps {
  event: TimelineEventType;
  index: number;
  onClick: () => void;
}

export default function TimelineEvent({ event, index, onClick }: TimelineEventProps) {
  const formattedDate = formatDate(event.start_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex-shrink-0 w-80"
    >
      <div 
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6 border border-gray-200"
        onClick={onClick}
      >
        {/* Date */}
        <div className="text-sm text-gray-500 mb-3">
          {formattedDate}
        </div>



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