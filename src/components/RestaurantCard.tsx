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
