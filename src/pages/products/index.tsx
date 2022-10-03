import { Breadcrumb, Layout, ProductCard } from "components";

const images = [
  "/assets/products/1.jpg",
  "/assets/products/2.jpg",
  "/assets/products/3.jpg",
  "/assets/products/4.jpg",
  "/assets/products/5.jpg",
];

const Index = () => {
  return (
    <Layout>
      <Breadcrumb
        data={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <section className="container py-10">
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {images.map((image, i) => (
            <ProductCard image={image} key={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
