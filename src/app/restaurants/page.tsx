import React from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';

async function getRestaurants() {
  const filePath = path.join(process.cwd(), 'data', 'restaurants.json');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading restaurant data:', error);
    return [];
  }
}

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <div className="mr-4">
          <Image
            src="/logo.png"
            alt="Pho Near Me Logo"
            width={60}
            height={60}
            priority
          />
        </div>
        <h1 className="text-3xl font-bold">Phở Restaurants</h1>
      </div>
      
      <div className="section p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant: any) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
