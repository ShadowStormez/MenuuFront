// components/FoodCard.tsx
import React from "react";

interface FoodCardProps {
  key:string
  imageUrl: string;
  name: string;
  category: string;
  description: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  key,
  imageUrl,
  name,
  category,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm" key={key}>
      {/* Image */}
      <div className="relative h-48 w-full">
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
        <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
          {category}
        </span>
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FoodCard;
