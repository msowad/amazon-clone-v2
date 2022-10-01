import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const images = [
  "/assets/banner/1.jpg",
  "/assets/banner/2.jpg",
  "/assets/banner/3.jpg",
];

const Carousel: React.FC = () => {
  return (
    <ReactCarousel
      infiniteLoop={true}
      autoPlay={true}
      swipeable={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowNext={(onClick) => <Arrow onClick={onClick} />}
      renderArrowPrev={(onClick) => <Arrow onClick={onClick} prev />}
    >
      {images.map((img, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={idx} src={img} alt="banner" />
      ))}
    </ReactCarousel>
  );
};

const Arrow = ({ onClick, prev }: { onClick: () => void; prev?: boolean }) => (
  <div
    className={`absolute top-0 bottom-0 z-10 ${
      prev ? "left-0" : "right-0"
    } flex items-center`}
  >
    <button
      onClick={onClick}
      className="bg-primary-500 p-1 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-900 sm:p-3 md:p-4"
    >
      {prev ? (
        <FaLongArrowAltLeft className="text-sm sm:text-lg md:text-xl lg:text-3xl" />
      ) : (
        <FaLongArrowAltRight className="text-sm sm:text-lg md:text-xl lg:text-3xl" />
      )}
    </button>
  </div>
);

export default Carousel;
