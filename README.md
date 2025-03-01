# "Pho Near Me" Vietnam Website Plan

## Technical Foundation

- **Platform**: Next.js with static export (next export)
- **Hosting**: GitHub Pages or Netlify (free tier)
- **Domain**: phonearme.net (primary)
- **SEO Approach**: Static pre-rendered pages for all locations
- **GitHub Actions**: Automated build and deploy workflow

## Site Architecture

**URL Structure**:

- phonearme.net/ (homepage)
- phonearme.net/[city]/ (city pages)
- phonearme.net/[city]/[district]/ (district pages)
- phonearme.net/[city]/[district]/[restaurant-name]/ (restaurant pages)

## Design Principles

- Mobile-first design optimized for both tourists and locals
- Light background with warm accent colors (reds, oranges)
- Fast loading with minimal JavaScript for core functionality
- Responsive layout with easy navigation on small screens
- Image optimization to ensure photos look good but load quickly

## Content Strategy

- **Homepage**: Featured cities, popular pho spots, search bar
- **City Pages**: District selection, top-rated spots, local specialties
- **District Pages**: Listing of pho restaurants with key info (rating, price, hours)
- **Restaurant Pages**: Photos, maps, ratings, reviews, menu highlights

## Data Management

- **Initial phase**: JSON data files in repository
- **Future**: Migration to database when ready to add dynamic features

## Monetization

- **Short-term**: Google AdSense (placed strategically to not disrupt UX)
- **Medium-term**: Promoted listings for restaurants
- **Long-term**: Premium features for restaurant owners

## Setting Up HTML-Based Maps for Your Static Site

Create a build script in your project:

```javascript
// scripts/download-maps.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Function to generate a simple placeholder map HTML
function generatePlaceholderMapHtml(id, name, lat, lng) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>Map for ${name}</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 600px;
      height: 300px;
      overflow: hidden;
    }
    .map-container {
      width: 100%;
      height: 100%;
      background-color: #e6e6e6;
      position: relative;
    }
    .grid-line {
      position: absolute;
      background-color: #ffffff;
    }
    .horizontal {
      width: 100%;
      height: 8px;
    }
    .vertical {
      height: 100%;
      width: 8px;
    }
    .marker {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #ff4444;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .coordinates {
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-family: Arial, sans-serif;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="map-container">
    <!-- Grid lines -->
    ${Array.from({ length: 5 }, (_, i) => 
      `<div class="grid-line horizontal" style="top: ${(i + 1) * 60 - 30}px;"></div>`
    ).join('\n    ')}
    
    ${Array.from({ length: 10 }, (_, i) => 
      `<div class="grid-line vertical" style="left: ${(i + 1) * 60 - 30}px;"></div>`
    ).join('\n    ')}
    
    <!-- Marker -->
    <div class="marker"></div>
    
    <!-- Coordinates -->
    <div class="coordinates">Lat: ${lat}, Lng: ${lng}</div>
  </div>
</body>
</html>
  `;
}

async function downloadMapImages() {
  console.log('Starting map image downloads...');
  
  // Load your restaurant data
  const rawData = fs.readFileSync('data/restaurants.json');
  const restaurants = JSON.parse(rawData);
  
  // Create maps directory if it doesn't exist
  const mapsDir = path.join('public', 'maps');
  if (!fs.existsSync(mapsDir)) {
    fs.mkdirSync(mapsDir, { recursive: true });
  }
  
  // Process each restaurant
  for (const restaurant of restaurants) {
    const { id, location } = restaurant;
    const { lat, lng } = location.coordinates;
    
    const htmlPath = path.join(mapsDir, `${id}.html`);
    
    try {
      // Generate placeholder map HTML
      const mapHtml = generatePlaceholderMapHtml(id, restaurant.name, lat, lng);
      fs.writeFileSync(htmlPath, mapHtml);
      
      console.log(`✓ Generated map HTML for ${restaurant.name}`);
    } catch (error) {
      console.error(`✗ Failed to generate map for ${restaurant.name}:`, error.message);
    }
  }
  
  console.log('Map generation complete!');
}

downloadMapImages().catch(console.error);
```

Add a script to your package.json:

```json
"scripts": {
  "download-maps": "node scripts/download-maps.js",
  "build": "npm run download-maps && next build"
}
```

Reference the HTML maps in your components using iframes:

```tsx
import React from 'react';

interface RestaurantProps {
  restaurant: {
    id: string;
    name: string;
    address: string;
    location: {
      coordinates: {
        lat: number;
        lng: number;
      }
    }
  }
}

const RestaurantCard: React.FC<RestaurantProps> = ({ restaurant }) => {
  return (
    <div className="restaurant-card p-4 border rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
      <p className="text-gray-600 mb-3">{restaurant.address}</p>
      <div className="map-container w-full h-[300px] overflow-hidden rounded-md mb-3">
        <iframe 
          src={`/maps/${restaurant.id}.html`} 
          title={`Map location of ${restaurant.name}`}
          width="100%" 
          height="100%"
          loading="lazy"
          className="border-0"
        />
      </div>
      {/* Other restaurant details would go here */}
    </div>
  );
};

export default RestaurantCard;
```

### Advantages of This Approach

- Completely free with no external API dependencies
- Works immediately with your static export strategy
- No API keys or rate limits to worry about
- One-time generation during build rather than per-visitor requests
- No JavaScript dependencies needed for maps
- Consistent appearance across all browsers
- Fast loading with minimal overhead

## Development Roadmap

### Phase 1: Static site with core features (3-4 weeks)

- Basic design implementation
- City and district pages
- Restaurant listings

### Phase 2: Content expansion (2-3 months)

- Add more cities and districts
- Improve restaurant data quality
- Implement AdSense

### Phase 3: Enhanced features (future)

- Convert to full Next.js deployment
- Add user reviews/ratings
- Implement restaurant owner dashboard
- Add promoted listing functionality

This approach gives you a cost-effective start while laying the groundwork for future growth. The static export provides excellent SEO from day one, and the plan allows for gradual expansion as the site gains traction.

## Current Implementation Status

### Project Structure

The project has been set up with the following structure:

```
nextjs-project/
├── data/
│   └── restaurants.json       # Flattened restaurant data
├── public/
│   ├── maps/                  # Generated map HTML files
│   ├── phostore1.jpg          # Sample restaurant image
│   └── ...                    # Other static assets
├── scripts/
│   └── download-maps.js       # Map generation script
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── restaurants/
│   │   │   └── page.tsx       # Restaurants listing page
│   │   └── ...                # Other app files
│   └── components/
│       └── RestaurantCard.tsx # Restaurant card component
└── package.json               # Project dependencies and scripts
```

### Technical Implementation Details

#### Map Generation

Instead of relying on external map APIs that might require keys or have usage limits, we've implemented a creative solution using HTML-based maps:

1. The `download-maps.js` script generates HTML files for each restaurant location
2. Each HTML file contains a simple grid with CSS styling to represent a map
3. A red marker indicates the restaurant's position
4. The coordinates are displayed at the bottom of the map

This approach:
- Eliminates external API dependencies
- Works perfectly with static site generation
- Loads quickly without JavaScript overhead
- Provides location context without complex map libraries

#### Data Management

Restaurant data is stored in a flat JSON structure in `data/restaurants.json`, containing:
- Restaurant ID
- Name
- Address
- Location coordinates (latitude/longitude)

This data is loaded at build time to generate the maps and at runtime to display restaurant information.

#### Component Architecture

The `RestaurantCard` component:
- Displays restaurant name and address
- Embeds the location map in an iframe
- Uses responsive design principles
- Follows the design principles with clean typography and spacing

#### Page Implementation

1. **Homepage**: Features a welcoming design with:
   - Site title and description
   - Featured pho restaurant image
   - Navigation buttons to explore restaurants and cities
   - Consistent footer with site navigation

2. **Restaurants Page**: Displays a grid of restaurant cards with:
   - Restaurant names and addresses
   - Location maps for each restaurant
   - Responsive layout that adjusts to different screen sizes

### City-Level Pillar Pages

Each major city (Hanoi, Ho Chi Minh City, Da Nang, etc.) will have a dedicated page that serves as a pillar content page for SEO and user experience. These pages will include:

- **Overview of the city's pho scene**: History, cultural significance, and unique characteristics
- **Local specialties and variations**: What makes this city's pho different from others
- **Famous pho restaurants**: Highlighting the most renowned establishments
- **Best districts for authentic pho**: Guiding visitors to the right neighborhoods
- **Links to district pages**: For deeper exploration of specific areas

The city pages will serve as comprehensive guides for both tourists and locals, providing valuable information while driving traffic to more specific district and restaurant pages.

#### Content Structure Example (Hanoi)

```
# Hanoi Pho Guide

## What Makes Hanoi Pho Special
[Brief history and overview of Hanoi's pho tradition]

## Local Specialties
- Phở Bò (Beef Pho): [Description of Hanoi-style beef pho]
- Phở Gà (Chicken Pho): [Description of Hanoi-style chicken pho]
- Unique ingredients and preparation methods

## Famous Pho Restaurants in Hanoi
[List of top restaurants with brief descriptions]

## Best Districts for Authentic Pho
- Old Quarter: [Overview and notable spots]
- Ba Đình: [Overview and notable spots]
- [Other districts with brief descriptions]

## Explore Hanoi Districts
[Links to district pages]
```

### Single-Column Progressive Disclosure Layout

To optimize for mobile users while maintaining strong SEO value, we'll implement a single-column progressive disclosure layout for city and district pages:

```
[SEARCH + FILTERS]
[NEARBY RESTAURANTS]
[MINI CONTENT CARD: "What makes Hanoi pho special?"]
[MORE RESTAURANTS]
[MINI CONTENT CARD: "Best time to eat pho"]
[MORE RESTAURANTS]
```

This approach:

- **Prioritizes user needs**: Puts restaurant listings front and center
- **Maintains SEO value**: Intersperses valuable content between listings
- **Enhances mobile experience**: Perfect for narrow screens with vertical scrolling
- **Balances content and functionality**: Provides information without overwhelming the directory function
- **Encourages exploration**: Content cards serve as natural breaks in scrolling, increasing engagement

The mini content cards will contain concise, valuable information that enhances the user experience while providing search engines with relevant, high-quality content to index.

### Next Steps

The following features are planned for upcoming development:

1. Implement city and district pages
2. Add detailed restaurant pages with reviews and menu information
3. Enhance the visual design with more food photography
4. Implement search functionality
5. Add filtering options for restaurants (price, rating, etc.)
