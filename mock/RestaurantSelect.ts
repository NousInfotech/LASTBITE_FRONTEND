// E:/Last_Bites_Clone/LASTBITE_FRONTEND/mock/RestaurantSelect.ts

export interface Restaurant {
  restaurantId: string;
  name: string;
  googleLocation?: string;
  location: string;
  coverImage: string;
  ratingCount: number;
  ratingAverage: number;
  categories: string[];
  menu: string[];
  isActive: boolean;
  details?: string;
}

export interface MenuItem {
  menuItemId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurantId: string;
  image: string;
  isAvailable: boolean;
}

export interface WishlistList {
  id: string;
  name: string;
  image: any;
}

export const mockRestaurants: Restaurant[] = [
  {
    restaurantId: "r1",
    name: "The Spice Hub",
    googleLocation: "https://maps.google.com/?q=The+Spice+Hub",
    location: "123 Flavor Street, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 250,
    ratingAverage: 4.5,
    categories: ["Biryani", "North Indian", "Desserts"],
    menu: ["m1", "m2", "m3"],
    isActive: true,
    details: "Popular for authentic Indian spices and flavors."
  },
  {
    restaurantId: "r2",
    name: "Westside Grill",
    googleLocation: "https://maps.google.com/?q=Westside+Grill",
    location: "456 Grilling Avenue, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 300,
    ratingAverage: 4.7,
    categories: ["Grill", "North Indian", "Burgers"],
    menu: ["m4", "m5"],
    isActive: true,
    details: "Best grilled food in town with amazing burgers."
  },
  {
    restaurantId: "r3",
    name: "Asian Fusion Kitchen",
    googleLocation: "https://maps.google.com/?q=Asian+Fusion+Kitchen",
    location: "789 Eastern Blvd, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 420,
    ratingAverage: 4.8,
    categories: ["Chinese", "Thai", "Japanese"],
    menu: ["m6", "m7", "m8"],
    isActive: true,
    details: "A perfect blend of authentic Asian cuisines."
  },
  {
    restaurantId: "r4",
    name: "Mediterranean Delights",
    googleLocation: "https://maps.google.com/?q=Mediterranean+Delights",
    location: "101 Sea View Road, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 180,
    ratingAverage: 4.3,
    categories: ["Hummus", "Falafel", "Mediterranean"],
    menu: ["m9", "m10"],
    isActive: true,
    details: "Authentic Mediterranean flavors from across the region."
  },
  {
    restaurantId: "r5",
    name: "Pizza Paradise",
    googleLocation: "https://maps.google.com/?q=Pizza+Paradise",
    location: "222 Cheese Street, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 520,
    ratingAverage: 4.6,
    categories: ["Pizza", "Italian", "Pasta"],
    menu: ["m11", "m12", "m13"],
    isActive: true,
    details: "Authentic Italian pizza and pasta made with imported ingredients."
  },
  {
    restaurantId: "r6",
    name: "Burger Boulevard",
    googleLocation: "https://maps.google.com/?q=Burger+Boulevard",
    location: "333 Patty Lane, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 410,
    ratingAverage: 4.4,
    categories: ["Burgers", "American", "Fast Food"],
    menu: ["m14", "m15"],
    isActive: true,
    details: "Gourmet burgers with house-made sauces and fresh ingredients."
  },
  {
    restaurantId: "r7",
    name: "Sushi Supreme",
    googleLocation: "https://maps.google.com/?q=Sushi+Supreme",
    location: "444 Ocean Drive, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 350,
    ratingAverage: 4.9,
    categories: ["Japanese", "Sushi", "Asian"],
    menu: ["m16", "m17"],
    isActive: true,
    details: "Premium sushi prepared by expert chefs with fresh seafood."
  },
  {
    restaurantId: "r8",
    name: "Taco Town",
    googleLocation: "https://maps.google.com/?q=Taco+Town",
    location: "555 Salsa Street, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 280,
    ratingAverage: 4.2,
    categories: ["Mexican", "Tacos", "Burritos"],
    menu: ["m18", "m19"],
    isActive: true,
    details: "Authentic Mexican street food with homemade tortillas."
  },
  {
    restaurantId: "r9",
    name: "Crepe Corner",
    googleLocation: "https://maps.google.com/?q=Crepe+Corner",
    location: "666 Sweet Avenue, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 190,
    ratingAverage: 4.5,
    categories: ["French", "Desserts", "Breakfast"],
    menu: ["m20", "m21"],
    isActive: true,
    details: "Sweet and savory crepes made with traditional French recipes."
  },
  {
    restaurantId: "r10",
    name: "Veggie Valley",
    googleLocation: "https://maps.google.com/?q=Veggie+Valley",
    location: "777 Green Street, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 220,
    ratingAverage: 4.6,
    categories: ["Vegetarian", "Vegan", "Salads"],
    menu: ["m22", "m23"],
    isActive: true,
    details: "Fresh vegetarian and vegan options with farm-to-table ingredients."
  }
];

export const mockMenu: MenuItem[] = [
  {
    menuItemId: 1,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and spices.",
    price: 12.99,
    category: "Biryani",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 2,
    name: "Gulab Jamun",
    description: "Delicious deep-fried dumplings soaked in sugar syrup.",
    price: 4.99,
    category: "Desserts",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 3,
    name: "Paneer Tikka",
    description: "Soft paneer cubes marinated in spices and grilled to perfection.",
    price: 9.99,
    category: "North Indian",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 4,
    name: "Grilled Chicken",
    description: "Juicy chicken grilled with herbs and spices.",
    price: 14.99,
    category: "Grill",
    restaurantId: "r2",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 5,
    name: "Classic Burger",
    description: "Beef patty with cheese, lettuce, tomato, and special sauce.",
    price: 10.99,
    category: "Burgers",
    restaurantId: "r2",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 6,
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.",
    price: 13.99,
    category: "Chinese",
    restaurantId: "r3",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 7,
    name: "Pad Thai",
    description: "Rice noodles stir-fried with eggs, tofu, bean sprouts, and peanuts.",
    price: 11.99,
    category: "Thai",
    restaurantId: "r3",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 8,
    name: "Sushi Platter",
    description: "Assortment of fresh nigiri and maki rolls.",
    price: 22.99,
    category: "Japanese",
    restaurantId: "r3",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 9,
    name: "Hummus with Pita",
    description: "Creamy chickpea dip served with warm pita bread.",
    price: 7.99,
    category: "Hummus",
    restaurantId: "r4",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 10,
    name: "Falafel Plate",
    description: "Crispy chickpea fritters served with tahini sauce and salad.",
    price: 9.99,
    category: "Falafel",
    restaurantId: "r4",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 11,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
    price: 14.99,
    category: "Pizza",
    restaurantId: "r5",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 12,
    name: "Pepperoni Pizza",
    description: "Pizza topped with tomato sauce, mozzarella, and pepperoni slices.",
    price: 16.99,
    category: "Pizza",
    restaurantId: "r5",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 13,
    name: "Spaghetti Carbonara",
    description: "Spaghetti with creamy sauce, pancetta, and Parmesan cheese.",
    price: 13.99,
    category: "Pasta",
    restaurantId: "r5",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 14,
    name: "Cheeseburger",
    description: "Beef patty with melted cheese, lettuce, tomato, and pickles.",
    price: 9.99,
    category: "Burgers",
    restaurantId: "r6",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 15,
    name: "Bacon Deluxe Burger",
    description: "Beef patty with bacon, cheese, onion rings, and BBQ sauce.",
    price: 12.99,
    category: "Burgers",
    restaurantId: "r6",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 16,
    name: "Salmon Nigiri",
    description: "Fresh salmon slices on seasoned rice.",
    price: 8.99,
    category: "Sushi",
    restaurantId: "r7",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 17,
    name: "California Roll",
    description: "Sushi roll with crab, avocado, and cucumber.",
    price: 10.99,
    category: "Sushi",
    restaurantId: "r7",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 18,
    name: "Beef Tacos",
    description: "Corn tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
    price: 8.99,
    category: "Tacos",
    restaurantId: "r8",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 19,
    name: "Chicken Burrito",
    description: "Flour tortilla filled with chicken, rice, beans, and cheese.",
    price: 10.99,
    category: "Burritos",
    restaurantId: "r8",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 20,
    name: "Nutella Crepe",
    description: "Thin pancake filled with Nutella and topped with strawberries.",
    price: 7.99,
    category: "Desserts",
    restaurantId: "r9",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 21,
    name: "Ham and Cheese Crepe",
    description: "Savory crepe filled with ham, cheese, and bechamel sauce.",
    price: 9.99,
    category: "Breakfast",
    restaurantId: "r9",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 22,
    name: "Buddha Bowl",
    description: "Nutritious bowl with quinoa, roasted vegetables, avocado, and tahini dressing.",
    price: 12.99,
    category: "Vegan",
    restaurantId: "r10",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 23,
    name: "Mediterranean Salad",
    description: "Fresh salad with mixed greens, olives, feta cheese, and balsamic dressing.",
    price: 9.99,
    category: "Salads",
    restaurantId: "r10",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  }
];

export const initialWishlistLists: WishlistList[] = [
  {
    id: "list-1",
    name: "Favorites",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-2",
    name: "Must Try",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-3",
    name: "Weekend Specials",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-4",
    name: "Party Orders",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-5",
    name: "Healthy Choices",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-6",
    name: "Spicy Food",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-7",
    name: "Desserts",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-8",
    name: "Budget Meals",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-9",
    name: "Date Night",
    image: require("../assets/images/Restaurant.png")
  },
  {
    id: "list-10",
    name: "Quick Lunches",
    image: require("../assets/images/Restaurant.png")
  }
];