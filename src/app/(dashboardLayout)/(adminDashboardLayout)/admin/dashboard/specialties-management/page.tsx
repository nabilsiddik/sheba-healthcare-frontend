import { getSpecialities } from "@/services/admin/specialtiesManagement";
import RefreshButton from "@/components/shared/RefreshButton";
import SpecialtiesManagementHeader from "@/components/modules/admin/specialtiesManagement/specialtiesManagementHeader";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeletor";
import SpecialitiesTable from "@/components/modules/admin/specialtiesManagement/SpecialtiesTable";

const AdminSpecialitiesManagementPage = async () => {
  const result = await getSpecialities();
  return (
    <div className="space-y-6">
      <SpecialtiesManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialitiesTable specialities={result.data} />
      </Suspense>
    </div>
  );
};

export default AdminSpecialitiesManagementPage;