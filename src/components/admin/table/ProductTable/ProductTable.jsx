import { columns } from "./columns";
import DataTable from "./data-table";

const data = [
  {
    id: 1,
    name: "Basic Widget",
    description: "A simple widget for everyday tasks.",
    sell_method: "Online",
    attributes: ["Compact", "Durable", "Lightweight"],
    price: 1999,
  },
  {
    id: 2,
    name: "Pro Widget",
    description: "An advanced widget with premium features.",
    sell_method: "Retail",
    attributes: ["High Performance", "Extended Warranty", "Ergonomic"],
    price: 4999,
  },
  {
    id: 3,
    name: "Eco Widget",
    description: "A widget made from eco-friendly materials.",
    sell_method: "Online",
    attributes: ["Eco-Friendly", "Sustainable", "Biodegradable"],
    price: 2999,
  },
  {
    id: 4,
    name: "Mini Widget",
    description: "A compact and portable widget.",
    sell_method: "Retail",
    attributes: ["Portable", "Compact", "Affordable"],
    price: 1499,
  },
  {
    id: 5,
    name: "Ultra Widget",
    description: "A top-tier widget with cutting-edge technology.",
    sell_method: "Online",
    attributes: ["Cutting-Edge", "High Durability", "Premium"],
    price: 7999,
  },
  {
    id: 6,
    name: "Max Widget",
    description: "A high-performance widget for professionals.",
    sell_method: "Retail",
    attributes: ["High Performance", "Robust", "Professional"],
    price: 6499,
  },
  {
    id: 7,
    name: "Flex Widget",
    description: "A flexible widget with multiple configurations.",
    sell_method: "Online",
    attributes: ["Configurable", "Versatile", "Adaptable"],
    price: 3999,
  },
  {
    id: 8,
    name: "Slim Widget",
    description: "A slim and sleek widget for modern use.",
    sell_method: "Retail",
    attributes: ["Slim", "Sleek", "Modern"],
    price: 2599,
  },
  {
    id: 9,
    name: "Power Widget",
    description: "A powerful widget designed for heavy use.",
    sell_method: "Online",
    attributes: ["Powerful", "Heavy Duty", "Reliable"],
    price: 5499,
  },
  {
    id: 10,
    name: "Smart Widget",
    description: "A smart widget with AI integration.",
    sell_method: "Retail",
    attributes: ["AI-Powered", "Smart", "Innovative"],
    price: 7299,
  },
  {
    id: 11,
    name: "Budget Widget",
    description: "An affordable widget for budget-conscious buyers.",
    sell_method: "Online",
    attributes: ["Affordable", "Economical", "Value for Money"],
    price: 999,
  },
  {
    id: 12,
    name: "Luxury Widget",
    description: "A luxury widget for those who want the best.",
    sell_method: "Retail",
    attributes: ["Luxury", "High-End", "Exclusive"],
    price: 10999,
  },
];

export default function ProductTable() {

  return (
      <DataTable columns={columns} data={data} />
  );
}
