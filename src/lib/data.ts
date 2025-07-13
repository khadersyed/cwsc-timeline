import { TimelineData, TimelineEvent, Era, TimelineEventWithFormattedDate } from './types';

// Node.js types for server-side
declare const require: any;
declare const process: any;

// Load timeline data
export async function loadTimelineData(): Promise<TimelineData> {
  try {
    // For server-side rendering, we need to read the file directly
    if (typeof window === 'undefined') {
      // Server-side
      const fs = require('fs');
      const path = require('path');
      
      const dataPath = path.join(process.cwd(), 'public', 'timeline-data.json');
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } else {
      // Client-side
      const response = await fetch('/timeline-data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  } catch (error) {
    console.error('Error loading timeline data:', error);
    throw error;
  }
}

// Format date for display
export function formatDate(date: { year: string; month?: string; day?: string; date?: string }): string {
  const year = date.year;
  const month = date.month || date.date;
  const day = date.day;

  if (month && day) {
    return `${month}/${day}/${year}`;
  } else if (month) {
    return `${month}/${year}`;
  } else {
    return year;
  }
}

// Convert timeline event to include formatted dates
export function processTimelineEvent(event: TimelineEvent): TimelineEventWithFormattedDate {
  const year = parseInt(event.start_date.year);
  const month = event.start_date.month ? parseInt(event.start_date.month) : undefined;
  const day = event.start_date.day ? parseInt(event.start_date.day) : undefined;

  return {
    ...event,
    formattedStartDate: formatDate(event.start_date),
    formattedEndDate: event.end_date ? formatDate(event.end_date) : undefined,
    year,
    month,
    day,
  };
}

// Group events by eras
export function groupEventsByEra(events: TimelineEvent[]): Era[] {
  const eras: Era[] = [
    { name: '1400s', startYear: 1400, endYear: 1499, events: [] },
    { name: '1500s', startYear: 1500, endYear: 1599, events: [] },
    { name: '1600s', startYear: 1600, endYear: 1699, events: [] },
    { name: '1700s', startYear: 1700, endYear: 1799, events: [] },
    { name: '1800s', startYear: 1800, endYear: 1899, events: [] },
    { name: '1900s', startYear: 1900, endYear: 1999, events: [] },
    { name: '2000s', startYear: 2000, endYear: 2099, events: [] },
  ];

  events.forEach(event => {
    const year = parseInt(event.start_date.year);
    const era = eras.find(e => year >= e.startYear && year <= e.endYear);
    if (era) {
      era.events.push(event);
    }
  });

  // Filter out empty eras
  return eras.filter(era => era.events.length > 0);
}

// Sort events by date
export function sortEventsByDate(events: TimelineEvent[]): TimelineEvent[] {
  return events.sort((a, b) => {
    const yearA = parseInt(a.start_date.year);
    const yearB = parseInt(b.start_date.year);
    
    if (yearA !== yearB) return yearA - yearB;
    
    const monthA = a.start_date.month ? parseInt(a.start_date.month) : 0;
    const monthB = b.start_date.month ? parseInt(b.start_date.month) : 0;
    
    if (monthA !== monthB) return monthA - monthB;
    
    const dayA = a.start_date.day ? parseInt(a.start_date.day) : 0;
    const dayB = b.start_date.day ? parseInt(b.start_date.day) : 0;
    
    return dayA - dayB;
  });
} 