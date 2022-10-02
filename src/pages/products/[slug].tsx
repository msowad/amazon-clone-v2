import { Breadcrumb, Layout, ProductImages } from "components";

const images = [
  "/assets/products/1.jpg",
  "/assets/products/2.jpg",
  "/assets/products/3.jpg",
  "/assets/products/4.jpg",
  "/assets/products/5.jpg",
];

export default function App() {
  return (
    <Layout>
      <Breadcrumb
        data={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Lorem ipsum" },
        ]}
      />
      <section className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ProductImages images={images} />
      </section>
      <div className="py-10" />
    </Layout>
  );
}
