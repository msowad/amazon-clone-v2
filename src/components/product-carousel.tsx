import { ProductCard } from "components";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  images: string[];
}

const ProductCarousel: React.FC<Props> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={"auto"}
      scrollbar={{ draggable: true }}
      navigation={{
        prevEl: ".navigation-prev",
        nextEl: ".navigation-next",
        disabledClass: "text-gray-500",
      }}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        500: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
    >
      {images.map((item, key) => (
        <SwiperSlide key={key}>
          <ProductCard image={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
