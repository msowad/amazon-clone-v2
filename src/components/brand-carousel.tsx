import Image from "next/image";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
  "/assets/brand/1.png",
  "/assets/brand/2.png",
  "/assets/brand/3.png",
  "/assets/brand/4.png",
  "/assets/brand/5.png",
  "/assets/brand/6.png",
  "/assets/brand/7.png",
  "/assets/brand/8.png",
  "/assets/brand/9.png",
];

const BrandCarousel: React.FC = () => {
  return (
    <section className="container relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={"auto"}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{
          delay: 1000,
        }}
        navigation={{
          prevEl: ".brand-carousel-navigation-prev",
          nextEl: ".brand-carousel-navigation-next",
          disabledClass: "text-gray-500",
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {images.map((item, key) => (
          <SwiperSlide key={key}>
            <Image
              src={item}
              alt="banner"
              width="100%"
              height="40%"
              layout="responsive"
              objectFit="contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Arrow prev />
      <Arrow />
    </section>
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
        prev
          ? "brand-carousel-navigation-prev"
          : "brand-carousel-navigation-next"
      } hover:text-primary-500 focus:outline-none disabled:hover:text-gray-500`}
    >
      {prev ? (
        <FaLongArrowAltLeft className="text-sm md:text-lg lg:text-xl" />
      ) : (
        <FaLongArrowAltRight className="text-sm md:text-lg lg:text-xl" />
      )}
    </button>
  </div>
);

export default BrandCarousel;
