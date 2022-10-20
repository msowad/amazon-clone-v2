import { Product } from "@prisma/client";
import { IconButton } from "components";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { productImageProps } from "utils/product-image-props";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="group relative">
      <Link href="/products/product" passHref>
        <a className="text-center">
          <Image
            src={"/assets/products/1.jpg"}
            alt="product"
            {...productImageProps}
          />
          <div className="p-2" />
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <FaStar key={i} className="text-sm text-gray-400" />
            ))}
          </div>
          <div className="p-1" />
          <h1 className="text-gray-800 dark:text-gray-300">{product.name}</h1>
          <h2 className="text-base font-semibold">${product.price}</h2>
        </a>
      </Link>
      {product.stock < 1 && (
        <div className="absolute left-2 top-2 z-10 rounded-md bg-red-500 px-2 py-1">
          Out of stock
        </div>
      )}
      <div className="absolute right-0 top-5 z-10 flex flex-col opacity-0 transition-all group-hover:right-3 group-hover:opacity-100">
        <IconButton
          title="Add product to cart"
          description="Add product to cart"
        >
          <FaShoppingCart />
        </IconButton>
        <div className="p-1" />
        <IconButton
          title="Add product to wishlist"
          description="Add product to wishlist"
        >
          <FaHeart />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductCard;
