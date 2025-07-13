'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent as TimelineEventType, Era } from '@/lib/types';
import TimelineEventComponent from './TimelineEvent';
import EraMarker from './EraMarker';



interface TimelineProps {
  initialEvents: TimelineEventType[];
  initialEras: Era[];
}

export default function Timeline({ initialEvents, initialEras }: TimelineProps) {
  const [events] = useState<TimelineEventType[]>(initialEvents);
  const [eras] = useState<Era[]>(initialEras);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventType | null>(null);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Christianity, Capitalism and White Supremacy - A Timeline
          </h1>
          <p className="text-gray-600 mt-2">1455 - 2023</p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Era Markers */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex space-x-8">
              {eras.map((era) => (
                <EraMarker key={era.name} era={era} />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Events */}
        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full">
            <div className="flex space-x-8 px-8 py-12">
              {events.map((event, index) => (
                <TimelineEventComponent
                  key={`${event.text.headline}-${index}`}
                  event={event}
                  index={index}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedEvent.text.headline}
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  {selectedEvent.start_date.year}
                  {selectedEvent.end_date && ` - ${selectedEvent.end_date.year}`}
                </span>
              </div>



              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedEvent.text.text }}
              />

              <div className="mt-4 pt-4 border-t">
                <a
                  href={selectedEvent.media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Learn more →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 