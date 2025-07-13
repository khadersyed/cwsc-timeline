# Historical Timeline: Christianity, Capitalism, and White Supremacy

A horizontal timeline website documenting historical events from 1452-2021, focusing on the intersections of Christianity, Capitalism, and White Supremacy. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Horizontal Timeline**: Smooth scrolling timeline with era-based navigation
- **Rich Event Details**: Interactive modals with full event information
- **Keyboard Navigation**: Full keyboard accessibility with arrow keys and spacebar
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, minimal design with smooth animations
- **Server-Side Rendering**: Fast loading with optimized performance

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Data**: JSON-based timeline data with server-side processing

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cwsc-timeline
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Run the development server:
```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 Usage

### Navigation
- **Arrow Keys**: Navigate between timeline events
- **Spacebar**: Toggle modal open/close
- **Mouse**: Click on events to view details

### Timeline Features
- **Era Navigation**: Jump between different historical periods
- **Event Cards**: View event summaries with dates and headlines
- **Detailed Modals**: Full event information with rich text content
- **Responsive Layout**: Optimized for all screen sizes

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main timeline page
│   ├── layout.tsx        # App layout
│   └── globals.css       # Global styles
├── components/
│   └── Timeline/
│       ├── Timeline.tsx      # Main timeline component
│       ├── TimelineEvent.tsx # Individual event cards
│       └── EraMarker.tsx     # Era navigation markers
├── lib/
│   ├── data.ts           # Data processing utilities
│   └── types.ts          # TypeScript type definitions
└── public/
    └── timeline-data.json # Timeline event data
```

## 📊 Data Format

The timeline uses a structured JSON format with events containing:
- **Dates**: Start and end dates with year precision
- **Content**: Headlines and detailed text descriptions
- **Media**: Associated links and resources
- **Metadata**: Credits and source information

## 🎨 Design Principles

- **Minimalism**: Clean, uncluttered interface
- **Accessibility**: Full keyboard navigation and ARIA support
- **Performance**: Optimized loading and smooth animations
- **Responsiveness**: Seamless experience across all devices

## 🚧 Development Status

### ✅ Completed
- Core timeline implementation
- Keyboard navigation
- Modal interactions
- Responsive design
- Data processing

### 🔄 In Progress
- Enhanced scrolling animations
- Loading states
- Mobile optimizations

### 📋 Planned
- Search functionality
- Filtering by time periods
- Image integration
- Export features

## 🤝 Contributing

This is an educational project focused on historical documentation. Contributions are welcome for:
- Data accuracy improvements
- UI/UX enhancements
- Performance optimizations
- Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Historical research and data compilation
- Next.js and React communities
- Open source contributors

---

**Note**: This timeline is designed for educational purposes to document historical intersections between Christianity, Capitalism, and White Supremacy from 1452-2021.
