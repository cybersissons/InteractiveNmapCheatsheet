# Nmap Cheat Sheet - Design Style Guide

## Design Philosophy

### Visual Language
**Cyberpunk Terminal Aesthetic**: Modern dark theme inspired by cybersecurity interfaces, combining the precision of terminal environments with contemporary web design. The aesthetic evokes the feeling of network reconnaissance tools while maintaining professional credibility.

### Color Palette
**Primary Colors**:
- Background: Deep charcoal (#0a0a0a) and rich black (#1a1a1a)
- Primary: Electric cyan (#00d4ff) for highlights and interactive elements
- Secondary: Neon green (#39ff14) for success states and active elements
- Accent: Warm amber (#ff8c00) for warnings and important information

**Supporting Colors**:
- Text: Pure white (#ffffff) for primary text, light gray (#e0e0e0) for secondary
- Error: Muted red (#ff4444) for error states
- Muted: Dark gray (#2a2a2a) for borders and subtle elements

### Typography
**Primary Font**: "JetBrains Mono" - Monospace font that reinforces the terminal/development aesthetic while maintaining excellent readability
**Secondary Font**: "Inter" - Clean sans-serif for body text and UI elements
**Accent Font**: "Orbitron" - Futuristic font for headings and branding elements

## Visual Effects

### Background Effects
**Primary**: Animated particle network using p5.js - subtle floating nodes connected by thin lines, creating a sense of digital infrastructure
**Secondary**: Liquid metal displacement shader effect for hero sections
**Accent**: Subtle scanline overlay to enhance the terminal aesthetic

### Text Effects
**Headings**: 
- Typewriter animation using Typed.js for main titles
- Character-by-character reveal with stagger timing
- Neon glow effect on hover using CSS filters

**Code Blocks**:
- Syntax highlighting with cyberpunk color scheme
- Character shuffle effect on load using Splitting.js
- Copy-to-clipboard with success animation

### Interactive Elements
**Buttons**: 
- 3D tilt effect on hover using CSS transforms
- Electric border animation that traces the perimeter
- Subtle glow pulse for call-to-action elements

**Cards**:
- Lift effect with expanding shadow on hover
- Border glow that intensifies on interaction
- Smooth scale transition (1.02x) for tactile feedback

### Animation Library Usage

#### Anime.js Applications
- Command builder interface transitions
- Panel slide animations between sections
- Progress indicators for simulated scans
- Smooth morphing between different command states

#### ECharts.js Visualizations
- Network topology diagrams for scan examples
- Real-time port status visualization
- Interactive network maps with hover details
- Scan progress charts with cyberpunk styling

#### Splitting.js Text Effects
- Character-level animations for command reveals
- Staggered loading animations for sections
- Typewriter effects for code examples
- Glitch text effects for error states

#### p5.js Creative Elements
- Interactive network particle system background
- Real-time command visualization
- Dynamic port scanning simulation
- Network topology generator

## Layout & Structure

### Grid System
**Desktop**: 12-column grid with 24px gutters
**Tablet**: 8-column grid with 20px gutters  
**Mobile**: 4-column grid with 16px gutters

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Component Styling

#### Navigation Bar
- Fixed position with backdrop blur effect
- Semi-transparent background (#1a1a1a80)
- Neon underline for active tab
- Smooth slide transition between sections

#### Command Builder
- Three-panel layout with glass morphism effect
- Cyan accent borders for active sections
- Real-time syntax highlighting
- Floating action buttons with glow effects

#### Code Examples
- Dark theme with cyberpunk syntax colors
- Copy button with success animation
- Expandable sections with smooth transitions
- Terminal-style prompt indicators

#### Interactive Cards
- Dark gradient backgrounds
- Hover lift effect with cyan glow
- Expandable content with smooth animations
- Progress indicators for scan simulations

## Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1440px
- Large: 1440px+

### Mobile Optimizations
- Collapsible command builder panels
- Touch-friendly button sizes (44px minimum)
- Simplified particle background for performance
- Stacked layout for multi-column sections

## Accessibility

### Color Contrast
- All text maintains 4.5:1 contrast ratio minimum
- Interactive elements have clear focus states
- Color is never the only indicator of state

### Motion Preferences
- Respect prefers-reduced-motion settings
- Provide toggle for animation effects
- Essential animations remain functional

### Keyboard Navigation
- Full keyboard accessibility for all interactive elements
- Clear focus indicators with cyan outline
- Logical tab order throughout interface