import QuickLinks from "../components/QuickLinks";
import HeroBanner from "../components/HeroBanner";
import PromoBanner from "../components/PromoBanner";
import EditorialCards from "../components/EditorialCards";
import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts";
import Sustainability from "../components/Sustainability";
import ReasonsToBuy from "../components/ReasonsToBuy";

const POPULAR_CATEGORIES = [
  { label: "Keyboards", image: "/images/home/category-card-keyboards.jpg" },
  { label: "Mice", image: "/images/home/category-card-mice.jpg" },
  { label: "Webcams", image: "/images/home/category-card-webcams.jpg" },
];

const SHOP_BY_CATEGORY = [
  { label: "Keyboards and Consoles", image: "/images/home/keyboards-2.png" },
  { label: "Combos", image: "/images/home/combos-2.png" },
  { label: "Mice", image: "/images/home/mice-2.png" },
  { label: "Speakers", image: "/images/home/speakers-2.png" },
  { label: "Conference Cameras", image: "/images/home/conference-cameras-2.png" },
  { label: "Driving", image: "/images/home/racing-wheels-2.png" },
  { label: "Headsets", image: "/images/home/headsets-2.png" },
  { label: "Lighting", image: "/images/home/lighting-2.png" },
  { label: "Webcams", image: "/images/home/webcams-2.png" },
  { label: "Microphones", image: "/images/home/microphones-2.png" },
  { label: "iPad Keyboard Cases", image: "/images/home/ipad-keyboard-cases.png" },
  { label: "Refurbished Products", image: "/images/home/refurbished-products.png" },
];

const SHOP_BY_INTEREST = [
  { label: "Business", image: "/images/home/girl-using-mouse-business-desktop-2.png" },
  { label: "Gaming", image: "/images/home/boy-playing-mandalorian-desktop-2.png" },
  { label: "Education", image: "/images/home/adult-child-education-desktop-2.png" },
];

export default function Home() {
  return (
    <div>
      <QuickLinks />
      <HeroBanner />
      <PromoBanner />
      <EditorialCards />
      <CategoryGrid
        heading="Discover our most popular product categories"
        items={POPULAR_CATEGORIES}
      />
      <FeaturedProducts />
      <Sustainability />
      <CategoryGrid heading="Shop by product category" items={SHOP_BY_CATEGORY} compact />
      <CategoryGrid heading="Shop by interest" items={SHOP_BY_INTEREST} />
      <ReasonsToBuy />
    </div>
  );
}
