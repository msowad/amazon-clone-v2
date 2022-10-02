import { ProductCarousel } from "components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [
  "/assets/products/1.jpg",
  "/assets/products/2.jpg",
  "/assets/products/3.jpg",
  "/assets/products/4.jpg",
  "/assets/products/5.jpg",
];

const RelatedProducts: React.FC = () => {
  return (
    <section className="container relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl">Related Products</h1>
        <div className="flex items-center space-x-4">
          <button className="navigation-prev p-1 focus:outline-none">
            <FaArrowLeft />
          </button>
          <button className="navigation-next p-1 focus:outline-none">
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="py-4" />
      <ProductCarousel images={images} />
    </section>
  );
};

export default RelatedProducts;
