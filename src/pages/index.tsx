import { Carousel, FeaturedProducts, Header, SubBanner } from "components";

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
    </main>
  );
};

export default Index;
