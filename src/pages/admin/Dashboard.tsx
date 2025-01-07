import { AdminLayout } from "@/components/admin/AdminLayout";
import { EmployerTable } from "@/components/admin/tables/EmployerTable";
import { TalentTable } from "@/components/admin/tables/TalentTable";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <EmployerTable />
        <TalentTable />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;