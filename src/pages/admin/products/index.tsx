import { AdminLayout, Button } from "components";
import { MdAddCircle } from "react-icons/md";

const Index = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button label="Add Product" icon={<MdAddCircle size={20} />} />
      </div>
    </AdminLayout>
  );
};

export default Index;
