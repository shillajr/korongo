# Korongo - AFCON 2027 Super App

A comprehensive mobile-first super app for the 2027 Africa Cup of Nations (AFCON), hosted by Kenya, Tanzania, and Uganda. Korongo provides a seamless, borderless experience for fans traveling across East Africa during the tournament.

## Overview

Korongo is designed to be the ultimate companion app for AFCON 2027 attendees, featuring journey planning, match information, emergency assistance, and cultural exploration - all optimized for cross-border travel in East Africa.

## Key Features

### 0. Smart Onboarding Flow
First-time user experience designed for quick access:

- **5-Step Guided Setup**:
  - Welcome introduction to app features
  - Journey path customization (select travel order through Kenya, Tanzania, Uganda)
  - Travel requirements checklist (EAC Visa, Yellow Fever vaccine, currency info)
  - Emergency contact and medical information setup
  - Preview and confirmation screen

- **Skip to Dashboard** - Quick access button available on all onboarding steps:
  - Users can skip setup and jump directly to the homepage
  - Default journey path automatically configured (Kenya → Tanzania → Uganda)
  - Emergency details can be added later through profile settings
  - Onboarding preferences saved to localStorage for persistence

- **Visual Progress Indicator** - Progress bar showing completion status across all steps

### 1. Dynamic Dashboard
The central hub of the app providing at-a-glance information:

- **Next Match Card** - Hero-style card showing upcoming match details with:
  - Team matchup with country flags
  - Date, time, and venue information
  - Stadium location and host country
  - Direct access to match details and ticket purchasing
  
- **Border Status Widget** - Real-time cross-border travel information:
  - Current border crossing status (Light, Moderate, Heavy traffic)
  - Live wait time estimates
  - Visual progress indicator
  - Quick access to journey planning

- **FAN ID Widget** - Stadium and fan zone access management:
  - Visual status indicator (Pending, Approved, Rejected)
  - Quick access to create or view FAN ID
  - FAN ID number display for approved users
  - Mandatory requirement alerts for users without FAN ID
  - One-tap navigation to full FAN ID management

- **Weather Information** - Current conditions display:
  - Real-time temperature
  - Weather condition badges
  - Local time display
  - Location-based weather for all three host nations

- **Quick Actions Grid** - One-tap access to key features:
  - Journey planning tools
  - Match schedules
  - Emergency assistance
  - Safari booking integration

- **Travel Tips** - Contextual tips for cross-border travel and tournament attendance

### 2. Comprehensive Matches Section
Full tournament schedule and match management:

#### Match Cards
- **Horizontal Layout Design**:
  - Stadium photography (256px width) showcasing venue
  - Match details including teams, date, time, venue
  - Country flags for both teams and host nation
  - Status badges (Upcoming, Live, Completed)
  - Tournament stage and group information
  - Ticket purchase and fan-finding buttons

#### Filtering System
- Filter by host country (Kenya, Tanzania, Uganda)
- Filter by tournament stage (Group Stage, Knockout)
- Combined filtering for precise match discovery

#### Calendar View
- Interactive monthly calendar
- Visual indicators for match dates
- Date selection to view specific match schedules
- Month navigation for full tournament period

#### Match Organization
- **Upcoming Tab** - All future matches sorted chronologically
- **Calendar Tab** - Date-based match browsing
- **Results Tab** - Match outcomes and tournament standings

#### Tournament Data
- 10+ matches spanning January 2027
- Coverage across all three host nations:
  - Moi International Sports Centre (Nairobi, Kenya)
  - Mandela National Stadium (Kampala, Uganda)
  - Benjamin Mkapa Stadium (Dar es Salaam, Tanzania)
- Full tournament progression from Group Stage through Finals

### 3. FAN ID System
Mandatory digital identification for stadium and fan zone access:

#### FAN ID Creation Screen
- **Personal Information Form**:
  - Full name (as shown on ID document)
  - Nationality selection
  - ID/Passport number entry
  - Identity document upload with drag-and-drop support
  - Form validation before submission
  - Visual upload feedback

- **User-Friendly Features**:
  - Clear instructions on mandatory requirements
  - Accepted document formats (PNG, JPG, PDF)
  - File size limits and validation
  - Progress indicators during submission
  - 24-48 hour approval timeline notification

#### FAN ID Status Screen
- **Digital FAN ID Card Display**:
  - Gradient card design with AFCON 2027 branding
  - User profile section with name and nationality
  - Unique FAN ID number (AFCON2027-XXXXXXXXX format)
  - Status badge (Pending, Approved, Rejected) with color coding
  - QR code for entry scanning (displayed when approved)
  - Professional card layout suitable for presentation at venues

- **Status-Specific Features**:
  - **Pending**: Alert banner with verification status
  - **Approved**: Scannable QR code for stadium entry
  - **Rejected**: Information on resubmission process

- **Quick Actions**:
  - Manage FAN ID button for editing details
  - View linked tickets button (for approved FAN IDs)
  - Direct navigation to match schedule

#### FAN ID Management Screen
- **Personal Details Management**:
  - Inline editing capability
  - Save/Cancel actions for changes
  - Real-time form validation
  - Fields: Full name, nationality, ID number

- **Security & Verification Status**:
  - Identity verification badge
  - FAN ID activation status
  - Document approval indicators
  - Visual status cards with icons

- **Linked Tickets Section**:
  - Display of tickets associated with FAN ID
  - Empty state with call-to-action for match browsing
  - Ticket count and match information

#### Data Management
- Secure localStorage persistence for FAN ID data
- Auto-approval simulation (2 seconds for demo purposes)
- State synchronization across all app sections
- Dashboard widget integration showing FAN ID status

### 4. Cross-Border Journey Module
Travel planning optimized for tri-nation navigation:

- Journey route planning between Kenya, Tanzania, and Uganda
- Border crossing time estimates
- Transportation recommendations
- Multi-country itinerary support

### 5. Profile & Payment Management
User profile and financial information:

- **Traveler Profile** - Personal information display:
  - Emergency contact details
  - Blood type information
  - Journey path preferences
  - Countries visited tracking
  
- **Payment Number Management**:
  - Add and edit mobile payment number
  - Support for M-Pesa and push payments
  - Cross-border payment compatibility (Kenya, Tanzania, Uganda)
  - Secure localStorage persistence
  - Easy inline editing with save/cancel actions
  - Used for ticket purchases, safari bookings, and in-app payments

### 6. Emergency Shield
Safety-first features for international travelers:

- Emergency contact access
- Location-based assistance
- Multi-country emergency services
- Safety alerts and notifications

### 7. Cultural Compass
East African cultural integration:

- Safari booking integration
- Local customs and etiquette guides
- Cultural event discovery
- Language assistance tools

## Design System

### Visual Identity
Inspired by modern design principles (Airbnb aesthetic) with East African cultural elements:

#### Color Palette
- **Primary Colors**: Representing the three host nations
  - Tanzania Green
  - Kenya Black
  - Uganda Red
- **Cultural Accents**: Kitenge patterns and beadwork influences
- **Neutral Palette**: Clean whites, subtle grays for modern contrast

#### Typography
- Custom spacing system for optimal mobile readability
- Hierarchical text styling for clear information architecture
- WCAG 2.1 AA accessibility compliance

#### Component Styling
- **Cards**: 9px border radius for modern, clean appearance
- **Buttons**: 3px border radius for sharp, precise interaction points
- **Shadows**: Removed from content cards for clean, flat design; retained only for floating elements (buttons, modals, navigation)
- **Touch Targets**: Large, mobile-optimized interaction areas

### Responsive Design
- Mobile-first approach
- Optimized for typical smartphone screen sizes
- Touch-friendly interface elements
- Gesture-based navigation support

## Technical Architecture

### Frontend Stack
- **React** - Component-based UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Fast build tooling

### Key Libraries
- **Lucide React** - Icon system
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Component variant management
- **Recharts** - Data visualization (ready for statistics)
- **qrcode.react** - QR code generation for FAN ID system

### Project Structure
```
/src
  /app
    /components
      - Dashboard.tsx (Main dashboard)
      - Matches.tsx (Match schedule & details)
      - FanId.tsx (FAN ID creation & management)
      - CountryFlag.tsx (Flag component system)
      /ui (Reusable UI components)
        - button.tsx
        - card.tsx
        - badge.tsx
        - tabs.tsx
  /styles
    - theme.css (Design tokens)
    - fonts.css (Typography)
  /imports (Figma assets & SVGs)
```

## Feature Status

### ✅ Completed Features
- Smart onboarding flow with skip functionality
- Dynamic dashboard with real-time information
- Comprehensive match schedule system
- Interactive calendar with date selection
- Advanced filtering (country, stage)
- Match cards with stadium imagery
- Country flag system
- FAN ID creation and management system
- QR code generation for stadium entry
- Digital FAN ID card with status tracking
- FAN ID dashboard widget integration
- Personal details management with inline editing
- Modern Airbnb-inspired design system
- Responsive mobile layout
- Touch-optimized interactions
- Loading screen with branding
- Bottom navigation with 5 sections
- Emergency button (floating and inline variants)
- Profile section with user journey tracking
- Payment number management for mobile payments
- Clean, flat card design without shadows
- LocalStorage persistence for user data
- Three-screen FAN ID workflow (Create, Status, Manage)

### 🚧 Ready for Enhancement
- Multi-currency wallet integration
- Live match scores and updates
- Ticket purchasing backend integration
- Safari booking system connection
- Emergency services API integration
- Offline-first data caching
- User authentication
- Push notifications for match updates

## Accessibility

- WCAG 2.1 AA compliant color contrast
- Large touch targets (minimum 44x44px)
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Focus management for interactive elements

## Browser Support

Optimized for modern mobile browsers:
- Safari (iOS)
- Chrome (Android)
- Firefox Mobile
- Edge Mobile

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development
The app uses Vite with hot module replacement for fast development iterations. All imports use the `@` alias mapped to `/src` directory.

## Design Philosophy

### Borderless Experience
The app treats Kenya, Tanzania, and Uganda as a unified tournament zone, minimizing friction for cross-border travel.

### Journey-Based Navigation
Features are organized around user journeys (attending matches, traveling, exploring) rather than technical categories.

### Offline-First (Planned)
Critical features designed to work without constant internet connectivity, essential for border crossings and remote stadiums.

### Culturally East African
Design incorporates authentic East African visual elements while maintaining modern UX standards.

### Emergency-Ready
Safety features are always accessible, with prominent placement in navigation and quick actions.

## Contributing

This project follows modern React best practices:
- Functional components with hooks
- TypeScript for type safety
- Component composition over inheritance
- Accessibility-first development
- Mobile-first responsive design

## Tournament Information

**AFCON 2027 Host Nations**: Kenya, Tanzania, Uganda  
**Tournament Period**: January 2027  
**Stadiums**: 3 primary venues across East Africa  
**Teams**: Coverage of all participating African national teams

## Distribution

### Method 1: Progressive Web App (PWA) - The Simplest Approach
A PWA is a web application that can be "installed" on a user's home screen, providing an app-like experience with offline capabilities. This is the most straightforward method for distributing Korongo, as it avoids app store approval processes.

#### Key PWA Features for Korongo:
- **Add to Home Screen**: A prompt will appear for users to add Korongo to their home screen.
- **Offline Functionality**: Key features like match schedules, FAN ID, and emergency contacts will be available offline.
- **App-like Navigation**: The app will have a shell that provides smooth, native-like navigation.

#### Technical Implementation Plan:
1.  **`manifest.json`**: Create a web app manifest file to control the app's appearance and behavior when installed.
2.  **Service Worker**: Implement a service worker to cache assets and data for offline access.
3.  **HTTPS**: Deploy the application over HTTPS to enable service worker functionality.

## License

© 2027 Korongo - AFCON 2027 Super App

---

**Built for football fans, by football fans. 🇰🇪 🇹🇿 🇺🇬 ⚽**
