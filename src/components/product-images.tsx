// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from "next/image";
import React, { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  images: string[];
}

const ProductImages: React.FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="relative">
        <Swiper
          loop={true}
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          navigation={{
            prevEl: ".nav-left",
            nextEl: ".nav-right",
          }}
        >
          {images.map((item, i) => (
            <SwiperSlide key={i}>
              <Image
                src={item}
                alt="banner"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Arrow prev className="nav-left" />
        <Arrow className="nav-right" />
      </div>
      <div className="p-3" />
      <div className="relative">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          navigation={{
            prevEl: ".thumbs-left",
            nextEl: ".thumbs-right",
          }}
        >
          {images.map((item, i) => (
            <SwiperSlide key={i}>
              <Image
                src={item}
                alt="banner"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Arrow prev className="thumbs-left" />
        <Arrow className="thumbs-right" />
      </div>
    </>
  );
};

const Arrow = ({ className, prev }: { className: string; prev?: boolean }) => (
  <div
    className={`absolute top-0 bottom-0 z-10 ${
      prev ? "left-0" : "right-0"
    } flex items-center`}
  >
    <button className={`${className} focus:outline-none`}>
      {prev ? (
        <FaLongArrowAltLeft className="text-sm text-primary-600 sm:text-lg lg:text-xl" />
      ) : (
        <FaLongArrowAltRight className="text-sm text-primary-600 sm:text-lg lg:text-xl" />
      )}
    </button>
  </div>
);

export default ProductImages;
