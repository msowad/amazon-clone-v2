import { Carousel, Header, FeaturedProducts } from "components";

const Index = () => {
  return (
    <main>
      <Header />
      <Carousel />
      <div className="py-10" />
      <FeaturedProducts />
      <div className="py-10" />
    </main>
  );
};

export default Index;
