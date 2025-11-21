import { getSpecialities } from "@/services/admin/specialtiesManagement";
import RefreshButton from "@/components/shared/RefreshButton";
import SpecialtiesManagementHeader from "@/components/modules/admin/specialtiesManagement/specialtiesManagementHeader";

const AdminSpecialitiesManagementPage = async () => {
  const result = await getSpecialities();
  return (
    <div className="space-y-6">
      <SpecialtiesManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      {/* <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialitiesTable specialities={result.data} />
      </Suspense> */}
    </div>
  );
};

export default AdminSpecialitiesManagementPage;