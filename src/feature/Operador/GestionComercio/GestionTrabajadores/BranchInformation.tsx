import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getBranchesByCompany } from "../../../../core/services/Operador/Branch/BranchCommerceService";
import TablaItem, {
  RowData,
  Column,
} from "../../../../shared/components/Molecules/TablaItem/TablaItem";
import BranchWorkers from "./ListaTrabajadores/BranchWorkers";

function BranchInformation() {
  const [branches, setBranches] = useState<RowData[]>([]);
  const [isWorkersView, setIsWorkersView] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [selectedBranchName, setSelectedBranchName] = useState<string>("");

  const fetchBranches = async () => {
    try {
      const companyId = Cookies.get("decrypted_company_id");
      if (!companyId) {
        Swal.fire({
          icon: "error",
          title: "ID de comercio no encontrado",
          text: "No se pudo obtener el ID de la comercio seleccionada.",
        });
        return;
      }

      const data = await getBranchesByCompany(Number(companyId));

      if (data.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No hay sucursales",
          text: "Registra una sucursal primero para este comercio.",
        });
        setBranches([]);
        return;
      }

      const formattedData = data.map((branch: any) => ({
        id: branch.branch_id,
        name: branch.name,
        address: branch.address,
        contact: branch.contact,
        worker_count: branch.worker_count,
      }));
      setBranches(formattedData);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar sucursales",
        text: error.message || "Error al cargar las sucursales.",
      });
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const columns: Column[] = [
    { Header: "Nombre", accessor: "name" as keyof RowData },
    { Header: "Dirección", accessor: "address" as keyof RowData },
    { Header: "Contacto", accessor: "contact" as keyof RowData },
    { Header: "Operadores", accessor: "worker_count" as keyof RowData },
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          <button
            className="relative p-2 bg-blue-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2.5rem] hover:w-[5rem]"
            onClick={() => handleDetails(row)}
          >
            <Icon
              icon="carbon:view"
              className="flex-shrink-0"
              width="24"
              height="24"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Ver
            </span>
          </button>
          <button
            className="relative p-2 bg-green-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2.5rem] hover:w-[8.5rem]"
            onClick={() => onWorkers(row)}
          >
            <Icon
              icon="healthicons:city-worker"
              className="flex-shrink-0"
              width="24"
              height="24"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Trabajadores
            </span>
          </button>
        </div>
      ),
    },
  ];

  const onWorkers = (row: RowData) => {
    setSelectedBranchId(row.id);
    setSelectedBranchName(row.name);
    setIsWorkersView(true);
  };

  const handleDetails = (row: RowData) => {
    Swal.fire({
      title: `Detalles de ${row.name}`,
      html: `
        <p><strong>Dirección:</strong> ${row.address}</p>
        <p><strong>Contacto:</strong> ${row.contact}</p>
        <p><strong>Trabajadores:</strong> ${row.worker_count}</p>
      `,
      icon: "info",
    });
  };

  const handleBackToBranches = () => {
    setIsWorkersView(false);
    setSelectedBranchId(null);
    setSelectedBranchName("");
    fetchBranches();
  };

  return (
    <>
      {isWorkersView ? (
        <BranchWorkers
          branchId={selectedBranchId}
          branchName={selectedBranchName}
          onBackClick={handleBackToBranches}
        />
      ) : (
        <div className="container mx-auto my-8">
          <>
            <TablaItem
              data={branches}
              columns={columns}
              title="Listado de Sucursales"
              showButton={false}
            />
          </>
        </div>
      )}
    </>
  );
}

export default BranchInformation;
