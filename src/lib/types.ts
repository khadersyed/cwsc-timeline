export interface TimelineMedia {
  url: string;
  caption: string;
  credit: string;
}

export interface TimelineDate {
  year: string;
  month?: string;
  day?: string;
  date?: string; // Some events use "date" instead of "day"
}

export interface TimelineText {
  headline: string;
  text: string;
}

export interface TimelineEvent {
  media: TimelineMedia;
  start_date: TimelineDate;
  end_date?: TimelineDate;
  text: TimelineText;
}

export interface TimelineTitle {
  media: TimelineMedia;
  text: TimelineText;
}

export interface TimelineData {
  title: TimelineTitle;
  events: TimelineEvent[];
}

export interface Era {
  name: string;
  startYear: number;
  endYear: number;
  events: TimelineEvent[];
}

export interface TimelineEventWithFormattedDate extends TimelineEvent {
  formattedStartDate: string;
  formattedEndDate?: string;
  year: number;
  month?: number;
  day?: number;
} 