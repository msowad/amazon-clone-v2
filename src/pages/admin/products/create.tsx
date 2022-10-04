import { AdminLayout, ButtonLink } from "components";
import { MdArrowBackIos } from "react-icons/md";

const Create = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <ButtonLink
          href="/admin/products"
          label="All Products"
          secondary
          icon={<MdArrowBackIos size={20} />}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;
