import { IconButton } from "components";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

interface Props {
  image: string;
}

const ProductCard: React.FC<Props> = ({ image }) => {
  return (
    <div className="group relative">
      <Link href="/" passHref>
        <a className="text-center">
          <Image src={image} alt="product" width={360} height={420} />
          <div className="p-2" />
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <FaStar key={i} className="text-sm text-gray-400" />
            ))}
          </div>
          <div className="p-1" />
          <h1 className="text-gray-300">Lorem ipsum</h1>
          <h2 className="text-base font-semibold">$50.3</h2>
        </a>
      </Link>
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
