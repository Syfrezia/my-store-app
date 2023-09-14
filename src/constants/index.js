export const categories = [
  { title: "All", path: "all", name: "" },
  { title: "Electronics", path: "electronics", name: "electronics" },
  { title: "Jewelery", path: "jewelery", name: "jewelery" },
  { title: "Men's Clothing", path: "mens-clothing", name: "men's clothing" },
  {
    title: "Women's Clothing",
    path: "womens-clothing",
    name: "women's clothing",
  },
];

import {
  electronics,
  jewelery,
  menClothing,
  womenClothing,
} from "../assets/images/";

export const catalogues = [
  { title: "Men's Fashion", image: menClothing, path: "mens-clothing" },
  { title: "Women's Fashion", image: womenClothing, path: "womens-clothing" },
  { title: "Electronics", image: electronics, path: "electronics" },
  { title: "Jewelery", image: jewelery, path: "jewelery" },
];

export const aboutUs = {
  title: "About Us",
  content:
    "We take pride in the relationships we've built with artisans, manufacturers, and suppliers who share our commitment to quality. Each product you find on our platform has been meticulously selected to ensure that it meets our stringent standards.",
};

export const quickLinks = {
  title: "Quick Links",
  home: "Home",
  products: "Products",
  aboutUs: "About Us",
  contact: "Contact",
};

export const connectWithUs = {
  title: "Connect With Us",
  content: "Follow us on social media for the latest updates:",
};

export const formValue = {
  email: "example@email.com",
  first: "John",
  last: "Doe",
  phone: "123-456-7890",
  street: "123 Main Street",
  detail: "Apt 4B",
  city: "Jakarta",
  country: "Indonesia",
  postal: "10001",
  notes: "Leave package by the door.",
};
