import Timeline from '@/components/Timeline/Timeline';
import { loadTimelineData, sortEventsByDate, groupEventsByEra } from '@/lib/data';

export default async function Home() {
  try {
    const data = await loadTimelineData();
    const sortedEvents = sortEventsByDate(data.events);
    const groupedEras = groupEventsByEra(sortedEvents);
    
    return <Timeline initialEvents={sortedEvents} initialEras={groupedEras} />;
  } catch (error) {
    console.error('Error loading timeline data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Timeline
          </h1>
          <p className="text-gray-600">
            Unable to load timeline data. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }
}
