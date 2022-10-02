import {
  Breadcrumb,
  Button,
  Input,
  Layout,
  ProductImages,
  RelatedProducts,
} from "components";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";

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
      <section>
        <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ProductImages images={images} />
          </div>
          <div className="lg:col-span-3">
            <h1 className="text-xl font-bold">Logitech Headphone</h1>
            <div className="p-2" />
            <h2 className="text-lg">Price: $45</h2>
            <div className="p-1" />
            <h3 className="font-bold">In stock</h3>
            <div className="p-2" />
            <p className="text-sm font-medium text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
              necessitatibus magnam officia laudantium quae, amet nesciunt totam
              hic perferendis, odit optio quisquam et, quibusdam quo dignissimos
              inventore eius praesentium voluptates veritatis facere possimus.
              Asperiores ea dolor dolores corrupti ratione odit.
            </p>
            <div className="p-3" />
            <div className="flex items-center space-x-3">
              <label htmlFor="qty">Quantity</label>
              <input
                type="number"
                name="qty"
                className="block w-20 rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                min={0}
                value={1}
              />
            </div>
            <div className="p-3" />
            <div className="flex items-center space-x-4">
              <Button
                label="Add to cart"
                icon={<FaShoppingBasket size={25} />}
              />
              <Button
                label="Add to wishlist"
                icon={<FaHeart size={25} />}
                secondary
              />
            </div>
          </div>
        </div>
        <div className="p-4" />
        <hr className="border-gray-500" />
        <div className="p-4" />
        <div className="container">
          <div className="rounded bg-gray-800 p-4">
            <h1 className="text-xl font-bold">Description</h1>
            <div className="p-1" />
            <p className="text-sm font-medium text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi a
              fugiat quam temporibus suscipit, dolore rerum odio autem aperiam
              sed, nostrum, consectetur nihil velit recusandae dolorem. Fugit
              quia impedit enim pariatur error placeat expedita, quas omnis
              facilis similique odit nostrum a iusto voluptates dignissimos
              molestiae mollitia voluptatum et minus consectetur vero. Est,
              voluptates iste neque officia mollitia illum magni harum, eos
              soluta ducimus deleniti. Dignissimos recusandae sint ex soluta
              enim ab, adipisci nulla inventore et harum. Sit unde dolores
              tempore officiis cumque delectus obcaecati odit tenetur!
              Obcaecati, quidem dolor, perferendis quisquam tempore accusantium
              sint consequatur alias temporibus rem sed repudiandae?
            </p>
          </div>
          <div className="p-4" />
          <div className="rounded bg-gray-800 p-4">
            {"You're reviewing"} <br />
            <span className="font-semibold">Logitech Headphone</span>
          </div>
        </div>

        <div className="p-10" />
        <RelatedProducts />
      </section>
      <div className="py-10" />
    </Layout>
  );
}
