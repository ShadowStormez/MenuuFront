"use client";
import { useEffect, useState } from "react";
import axios from "axios";
//types
import { MenuItem, MenuItemsResponse } from "@/app/types/MenuItemTypes";

//components
import FoodCard from "@/app/components/FoodCard/FoodCard";

import images from "../../../../public/images";

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios
      .get<MenuItemsResponse>(
        "https://strapi-backend-p33l.onrender.com/api/menu-items"
      )
      .then((response) => {
        const data = response.data;
        if (data && data.data) {
          setItems(data.data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Menu</h1>
      <div className="flex flex-row justify-center items-center gap-4">
        {items.map((item) => (
          <FoodCard
            key={`item-${item.id}`}
            name={item.name}
            description={item.description[0]?.children[0]?.text}
            imageUrl={images.burger}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
}
