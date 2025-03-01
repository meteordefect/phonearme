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
    
    // Option 1: Google Maps (if you have an API key)
    // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x300&markers=color:red%7C${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    
    // Option 2: OpenStreetMap (completely free)
    // Note: If this URL doesn't work, you might need to try a different static map provider
    // const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=600x300&markers=${lat},${lng},red`;
    
    // Alternative: Using MapTiler (requires free API key)
    const mapUrl = `https://api.maptiler.com/maps/streets/static/${lng},${lat},15/600x300.png?key=get_your_own_key`;
    
    // Alternative: Using Mapbox (requires free API key)
    // const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-restaurant+f74e4e(${lng},${lat})/${lng},${lat},15,0/600x300?access_token=your_mapbox_token`;
    
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
  
  console.log('Map download process complete!');
}

downloadMapImages().catch(console.error);
