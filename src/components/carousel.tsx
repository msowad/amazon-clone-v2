import Image from "next/image";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
  "/assets/banner/1.jpg",
  "/assets/banner/2.jpg",
  "/assets/banner/3.jpg",
];

const Carousel: React.FC = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        loop={true}
        navigation={{
          prevEl: ".hero-carousel-navigation-prev",
          nextEl: ".hero-carousel-navigation-next",
          disabledClass: "text-gray-500",
        }}
      >
        {images.map((item, key) => (
          <SwiperSlide key={key}>
            <div className="relative h-full w-full">
              <Image
                src={item}
                alt="banner"
                width="100%"
                height="42%"
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Arrow prev />
      <Arrow />
    </div>
  );
};

const Arrow = ({ prev }: { prev?: boolean }) => (
  <div
    className={`absolute top-0 bottom-0 z-10 ${
      prev ? "left-0" : "right-0"
    } flex items-center`}
  >
    <button
      className={`${
        prev ? "hero-carousel-navigation-prev" : "hero-carousel-navigation-next"
      } bg-primary-500 p-1 text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-900 sm:p-3 md:p-4`}
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
