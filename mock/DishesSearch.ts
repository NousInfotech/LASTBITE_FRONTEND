// // Define types for your mock data
// export interface Restaurant {
//   restaurantId: string;
//   name: string;
//   googleLocation?: string;
//   location: string;
//   coverImage: string;
//   ratingCount: number;
//   ratingAverage: number;
//   categories: string[];
//   menu: string[];
//   isActive: boolean;
//   details?: string;
// }

// export interface MenuItem {
//   menuItemId: number;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   restaurantId: string;
//   image: string;
//   isAvailable: boolean;
// }

// // Mock data for restaurants
// export const mockRestaurants: Restaurant[] = [
//   {
//     restaurantId: "r1",
//     name: "The Spice Hub",
//     googleLocation: "https://maps.google.com/?q=The+Spice+Hub",
//     location: "123 Flavor Street, Food City",
//     coverImage: "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-TkYAy9_PR_E",
//     ratingCount: 250,
//     ratingAverage: 4.5,
//     categories: ["Biryani", "North Indian", "Desserts"],
//     menu: ["m1", "m2", "m3"],
//     isActive: true,
//   },
//   {
//     restaurantId: "r2",
//     name: "Westside Grill",
//     googleLocation: "https://maps.google.com/?q=Westside+Grill",
//     location: "456 Grilling Avenue, Food City",
//     coverImage: "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-TkYAy9_PR_E",
//     ratingCount: 300,
//     ratingAverage: 4.7,
//     categories: ["Grill", "North Indian", "Burgers"],
//     menu: ["m4"],
//     isActive: true,
//   },
// ];

// // Mock data for menu items
// export const mockMenu: MenuItem[] = [
//   {
//     menuItemId: 1,
//     name: "Chicken Biryani",
//     description: "Aromatic basmati rice cooked with tender chicken and spices.",
//     price: 12.99,
//     category: "Biryani",
//     restaurantId: "r1",
//     image: "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-TkYAy9_PR_E",
//     isAvailable: true,
//   },
//   {
//     menuItemId: 2,
//     name: "pasta",
//     description: "Delicious deep-fried dumplings soaked in sugar syrup.",
//     price: 4.99,
//     category: "Desserts",
//     restaurantId: "r1",
//     image: "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-TkYAy9_PR_E",
//     isAvailable: true,
//   },
//   {
//     menuItemId: 3,
//     name: "Paneer Tikka",
//     description:
//       "Soft paneer cubes marinated in spices and grilled to perfection.",
//     price: 9.99,
//     category: "North Indian",
//     restaurantId: "r1",
//     image: "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-TkYAy9_PR_E",
//     isAvailable: true,
//   },
//   {
//     menuItemId: 4,
//     name: "pasta",
//     description: "Juicy chicken grilled with herbs and spices.",
//     price: 14.99,
//     category: "Grill",
//     restaurantId: "r2",
//     image: "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-TkYAy9_PR_E",
//     isAvailable: true,
//   },
//   {
//     menuItemId: 5,
//     name: "burger",
//     description: "Aromatic basmati rice cooked with tender chicken and spices.",
//     price: 12.99,
//     category: "Biryani",
//     restaurantId: "r1",
//     image: "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-TkYAy9_PR_E",
//     isAvailable: true,
//   },
//   {
//     menuItemId: 6,
//     name: "Pasta",
//     description:
//       "Soft paneer cubes marinated in spices and grilled to perfection.",
//     price: 9.99,
//     category: "North Indian",
//     restaurantId: "r1",
//     image: "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-TkYAy9_PR_E",
//     isAvailable: true,
//   },
// ];






// Mock data for restaurants
export const mockRestaurants: Restaurant[] = [
  {
    restaurantId: "r1",
    name: "The Spice Hub",
    googleLocation: "https://maps.google.com/?q=The+Spice+Hub",
    location: "123 Flavor Street, Food City",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 250,
    ratingAverage: 4.5,
    categories: ["Biryani", "North Indian", "Desserts"],
    menu: ["m1", "m2", "m3", "m11"],
    isActive: true,
  },
  {
    restaurantId: "r2",
    name: "Westside Grill",
    googleLocation: "https://maps.google.com/?q=Westside+Grill",
    location: "456 Grilling Avenue, Food City",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 300,
    ratingAverage: 4.7,
    categories: ["Grill", "North Indian", "Burgers"],
    menu: ["m4", "m12"],
    isActive: true,
  },
  {
    restaurantId: "r3",
    name: "Green Bowl",
    googleLocation: "https://maps.google.com/?q=Green+Bowl",
    location: "789 Healthy Lane, Salad Town",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 120,
    ratingAverage: 4.2,
    categories: ["Salads", "Vegan", "Healthy"],
    menu: ["m5", "m13"],
    isActive: true,
  },
  {
    restaurantId: "r4",
    name: "Ocean Bites",
    googleLocation: "https://maps.google.com/?q=Ocean+Bites",
    location: "234 Shoreline Blvd, Beach City",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 180,
    ratingAverage: 4.4,
    categories: ["Seafood", "Grill"],
    menu: ["m6", "m14"],
    isActive: true,
  },
  {
    restaurantId: "r5",
    name: "Pasta Palace",
    googleLocation: "https://maps.google.com/?q=Pasta+Palace",
    location: "321 Noodle Street, Italy Town",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 220,
    ratingAverage: 4.6,
    categories: ["Italian", "Pasta", "Desserts"],
    menu: ["m7", "m15"],
    isActive: true,
  },
  {
    restaurantId: "r6",
    name: "Taco Loco",
    googleLocation: "https://maps.google.com/?q=Taco+Loco",
    location: "888 Fiesta Avenue, Mex City",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 190,
    ratingAverage: 4.3,
    categories: ["Mexican", "Tacos", "Spicy"],
    menu: ["m8", "m16"],
    isActive: true,
  },
  {
    restaurantId: "r7",
    name: "Burger Barn",
    googleLocation: "https://maps.google.com/?q=Burger+Barn",
    location: "456 Patty Road, Fastfood Ville",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 330,
    ratingAverage: 4.8,
    categories: ["Burgers", "Fast Food", "Shakes"],
    menu: ["m9", "m17"],
    isActive: true,
  },
  {
    restaurantId: "r8",
    name: "Sushi Central",
    googleLocation: "https://maps.google.com/?q=Sushi+Central",
    location: "999 Tokyo Lane, Japan Town",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 150,
    ratingAverage: 4.5,
    categories: ["Sushi", "Japanese", "Healthy"],
    menu: ["m10", "m18"],
    isActive: true,
  },
  {
    restaurantId: "r9",
    name: "BBQ Nation",
    googleLocation: "https://maps.google.com/?q=BBQ+Nation",
    location: "777 Grill Street, BBQ Town",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 270,
    ratingAverage: 4.6,
    categories: ["Barbecue", "Grill", "Meat Lovers"],
    menu: ["m19", "m20"],
    isActive: true,
  },
  {
    restaurantId: "r10",
    name: "Sweet Treats",
    googleLocation: "https://maps.google.com/?q=Sweet+Treats",
    location: "123 Dessert Lane, Sugar City",
    coverImage: require("../assets/images/burger.png"),
    ratingCount: 200,
    ratingAverage: 4.9,
    categories: ["Desserts", "Bakery", "Ice Cream"],
    menu: ["m21", "m22"],
    isActive: true,
  },
];

// Mock data for menu items
export const mockMenu: MenuItem[] = [
  { menuItemId: 1, name: "Chicken Biryani", description: "Aromatic rice with chicken.", price: 12.99, category: "Biryani", restaurantId: "r1", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 2, name: "Gulab Jamun", description: "Sweet fried dough balls soaked in syrup.", price: 4.99, category: "Desserts", restaurantId: "r1", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 3, name: "Paneer Tikka", description: "Grilled paneer cubes.", price: 9.99, category: "North Indian", restaurantId: "r1", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 4, name: "Grilled Chicken", description: "Chicken grilled with spices.", price: 14.99, category: "Grill", restaurantId: "r2", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 5, name: "Quinoa Salad", description: "Healthy quinoa with veggies.", price: 7.99, category: "Salads", restaurantId: "r3", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 6, name: "Grilled Prawns", description: "Fresh prawns grilled with herbs.", price: 13.99, category: "Seafood", restaurantId: "r4", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 7, name: "Alfredo Pasta", description: "Creamy Alfredo pasta with mushrooms.", price: 10.99, category: "Pasta", restaurantId: "r5", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 8, name: "Spicy Tacos", description: "Loaded tacos with spicy salsa.", price: 6.99, category: "Tacos", restaurantId: "r6", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 9, name: "Double Cheeseburger", description: "Beef burger with double cheese.", price: 8.99, category: "Burgers", restaurantId: "r7", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 10, name: "California Roll", description: "Classic crab and avocado sushi roll.", price: 11.99, category: "Sushi", restaurantId: "r8", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 11, name: "Veg Pulao", description: "Fragrant rice with mixed veggies.", price: 9.49, category: "Biryani", restaurantId: "r1", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 12, name: "Lamb Kebab", description: "Juicy lamb kebabs.", price: 15.49, category: "Grill", restaurantId: "r2", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 13, name: "Avocado Salad", description: "Fresh greens with avocado.", price: 8.49, category: "Vegan", restaurantId: "r3", image: require("../assets/images/burger.png"), isAvailable: true },
  { menuItemId: 14, name: "Fish Fry", description: "Crispy fried fish.", price: 12.49, category: "Seafood", restaurantId: "r4", image: require("../assets/images/burger.png"), isAvailable: true },
  // Continue for remaining items...
];
