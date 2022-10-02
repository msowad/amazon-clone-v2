import {
  BrandCarousel,
  Carousel,
  FeaturedProducts,
  Layout,
  NewProducts,
  SubBanner,
} from "components";

const Index = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Index;
