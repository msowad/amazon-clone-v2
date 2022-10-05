import { AdminLayout, ButtonLink } from "components";
import { MdAddCircle } from "react-icons/md";

const Index = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Category</h1>
        <ButtonLink
          href="/admin/categories/create"
          label="Add Category"
          icon={<MdAddCircle size={20} />}
        />
      </div>
    </AdminLayout>
  );
};

export default Index;
