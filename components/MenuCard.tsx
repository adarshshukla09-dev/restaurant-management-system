import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'

type Data = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  foodType: "VEG" | "NONVEG";
  mealTime: "BREAKFAST" | "LUNCH" | "DINNER";
  category: string;
  createdAt: Date | null;
};

function MenuCard({ item }: { item: Data }) {
  return (
    <Card>
      <CardTitle>{item.name}</CardTitle>

      <CardDescription>
        {item.description}
      </CardDescription>

      <CardContent>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}

        <p>₹ {item.price / 100}</p>
        <p>{item.foodType}</p>
        <p>{item.mealTime}</p>
      </CardContent>
    </Card>
  );
}

export default MenuCard;