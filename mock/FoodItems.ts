

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: "food" | "grocery";
  isVeg: boolean;
  description?: string;
}

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Vegetable Biryani",
    price: 200,
    available: true,
    category: "food",
    isVeg: true,
    description: "Fragrant rice cooked with mixed vegetables and aromatic spices"
  },
  {
    id: "2",
    name: "Butter Chicken",
    price: 300,
    available: false,
    category: "food",
    isVeg: false,
    description: "Tender chicken in a rich, creamy tomato sauce"
  },
  {
    id: "3",
    name: "Paneer Tikka",
    price: 250,
    available: true,
    category: "food",
    isVeg: true,
    description: "Grilled cottage cheese cubes marinated in spices"
  },
  {
    id: "4",
    name: "Organic Rice",
    price: 120,
    available: true,
    category: "grocery",
    isVeg: true,
    description: "Premium quality organic basmati rice, 1kg pack"
  },
  {
    id: "5",
    name: "Chicken Noodle Soup",
    price: 180,
    available: true,
    category: "food",
    isVeg: false,
    description: "Hearty soup with chicken, vegetables and egg noodles"
  },
  {
    id: "6",
    name: "Fresh Produce Box",
    price: 350,
    available: true,
    category: "grocery",
    isVeg: true,
    description: "Mixed seasonal vegetables and fruits assortment"
  },
  {
    id: "7",
    name: "Dal Makhani",
    price: 220,
    available: true,
    category: "food",
    isVeg: true,
    description: "Creamy black lentils slow-cooked with spices"
  },
  {
    id: "8",
    name: "Whole Wheat Bread",
    price: 60,
    available: false,
    category: "grocery",
    isVeg: true,
    description: "Freshly baked whole wheat bread, 400g"
  },
  {
    id: "9",
    name: "Fish Curry",
    price: 280,
    available: true,
    category: "food",
    isVeg: false,
    description: "Traditional fish curry with coconut base"
  },
  {
    id: "10",
    name: "Organic Milk",
    price: 80,
    available: true,
    category: "grocery",
    isVeg: true,
    description: "Farm-fresh organic milk, 1 liter"
  }
];