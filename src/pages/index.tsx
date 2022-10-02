import {
  BrandCarousel,
  Carousel,
  FeaturedProducts,
  Header,
  NewProducts,
  SubBanner,
} from "components";

const Index = () => {
  return (
    <main>
      <Header />
      <Carousel />
      <div className="py-10" />
      <FeaturedProducts />
      <div className="py-10" />
      <SubBanner />
      <div className="py-10" />
      <NewProducts />
      <div className="py-10" />
      <BrandCarousel />
      <div className="py-10" />
    </main>
  );
};

export default Index;
