'use client';

import React, { useState, useEffect, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent as TimelineEventType, Era } from '@/lib/types';
import TimelineEventComponent from './TimelineEvent';
import EraMarker from './EraMarker';



interface TimelineProps {
  initialEvents: TimelineEventType[];
  initialEras: Era[];
}

export default function Timeline({ initialEvents, initialEras }: TimelineProps): ReactElement {
  const [events] = useState<TimelineEventType[]>(initialEvents);
  const [eras] = useState<Era[]>(initialEras);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventType | null>(null);
  const [focusedEventIndex, setFocusedEventIndex] = useState<number>(-1);
  const [isToggling, setIsToggling] = useState<boolean>(false);

  // Keyboard navigation handlers
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedEventIndex((prev: number) => Math.max(0, prev - 1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setFocusedEventIndex((prev: number) => Math.min(events.length - 1, prev + 1));
        break;
      case ' ':
        e.preventDefault();
        // If modal is open, close it
        if (selectedEvent) {
          setSelectedEvent(null);
          return;
        }
        
        // If no focused event, don't do anything
        if (focusedEventIndex < 0 || focusedEventIndex >= events.length) {
          return;
        }
        
        // Open modal for focused event
        const focusedEvent = events[focusedEventIndex];
        setIsToggling(true);
        setTimeout(() => setIsToggling(false), 150);
        setSelectedEvent(focusedEvent);
        break;
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedEventIndex, events.length, selectedEvent]);

  // Scroll to focused event
  useEffect(() => {
    if (focusedEventIndex >= 0) {
      const eventElement = document.querySelector(`[data-event-index="${focusedEventIndex}"]`);
      if (eventElement) {
        eventElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [focusedEventIndex]);



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
        {/* Keyboard Instructions */}
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="text-sm text-blue-700 flex items-center justify-center space-x-6">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Navigate
              </span>
              <span>•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Spacebar to toggle
              </span>
            </div>
          </div>
        </div>

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
                  isFocused={index === focusedEventIndex}
                  onClick={() => setSelectedEvent(event)}
                  onFocus={() => setFocusedEventIndex(index)}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
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