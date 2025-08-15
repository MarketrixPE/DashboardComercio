import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageTitle from "../shared/components/Molecules/PageTitle";
import DefaultLayout from "./DefaultLayout";
import Loader from "./Loader";
import { LoadScript } from "@react-google-maps/api";
import ProtectedRoute from "../core/utils/ProtectedRoute";
import SignUp from "../feature/Operador/SignUp/SignUp";
import TradeInformationOperador from "../feature/Operador/GestionComercio/TradeInformationOperador";
import SettingsCommerce from "../feature/Operador/MiPerfil/SettingsCommerce";
import BranchInformation from "../feature/Operador/GestionComercio/GestionTrabajadores/BranchInformation";
import Terminos from "../feature/PreguntasFrecuentes/Terminos";
import Privacidad from "../feature/PreguntasFrecuentes/Privacidad";
import SmartDashboard from "../feature/Operador/EstadisticaComercio/SmartDashboard";
import PaymentDemoPage from "../feature/Izipay/PaymentDemoPage";
import VisualizacionMembresias from "../feature/Operador/SuscripcionesSmart/SuscripcionesSmart";
import CarritoPuntosSmartDemo from "../feature/Operador/CarritoPuntosSmartDemo/CarritoPuntosSmartDemo";
import NotFound from "../feature/NotFound/NotFound";
import UserManagement from "../feature/Operador/GestionComercio/GestionTrabajadores/UserManagement";
import BranchCommerce from "../feature/Operador/GestionComercio/GestionSucursales/BranchCommerce";
import { HelperService } from "../core/services/HelperService";
import SurveysCommerce from "../feature/Operador/GestionComercio/GestionSucursales/GestionEncuestas/SurveysCommerce";
import StudiesCommerce from "../feature/Operador/GestionComercio/GestionSucursales/GestionEstudiosMercado/StudiesCommerce";
import ProductsCommerce from "../feature/Operador/GestionComercio/GestionSucursales/GestionProductos/ProductsCommerce";
import PromotionsCommerce from "../feature/Operador/GestionComercio/GestionSucursales/GestionPromociones/PromotionsCommerce";
import TestWebSocketDirect from "../test/TestWebSocketDirect";
import SmartAI from "../feature/Operador/SmartAI/SmartAI";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const companyName = HelperService.getCompanyName();
  const companyId = HelperService.getCompanyId();
  const branchId = HelperService.getBranchId();
  const branchName = HelperService.getBranchName();
  const branchDireccion = HelperService.getBranchAddress();
  const branchCategoriaId = HelperService.getBranchCategoryId();
  const branchSubCategoriaId = HelperService.getBranchSubcategoryId();

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (!googleMapsApiKey) {
    console.error(
      "Google Maps API key no está configurada en las variables de entorno"
    );
  }

  return loading ? (
    <Loader />
  ) : (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={["drawing", "places"]}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Iniciar Sesión | Panel de Commercio Smart" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/terminos-condiciones-puntos-smart"
          element={
            <>
              <PageTitle title="Terminos Condiciones | Panel de Commercio Smart" />
              <Terminos />
            </>
          }
        />
        <Route
          path="/politica-privacidad-puntos-smart"
          element={
            <>
              <PageTitle title="Politica Privacidad | Panel de Commercio Smart" />
              <Privacidad />
            </>
          }
        />
        <Route
          path="/mi-carrito-public"
          element={
            <>
              <PageTitle title="Mi Comercio | Panel de Comercio Smart" />
              <CarritoPuntosSmartDemo />
            </>
          }
        />
        <Route element={<ProtectedRoute allowedRoles={["commerce"]} />}>
          <Route element={<DefaultLayout />}>
            <Route path="/test-websocket" element={<TestWebSocketDirect />} />
            <Route
              path="/mi-comercio"
              element={
                <>
                  <PageTitle title="Mi Comercio | Panel de Comercio Smart" />
                  <TradeInformationOperador />
                </>
              }
            />
            <Route
              path="/mis-sucursales"
              element={
                <>
                  <PageTitle title="Mis Sucursales | Panel de Comercio Smart" />
                  <BranchCommerce
                    selectedCompanyId={companyId}
                    selectedCompanyName={companyName}
                  />
                </>
              }
            />
            <Route
              path="/mis-trabajadores"
              element={
                <>
                  <PageTitle title="Mis Trabajadores | Panel de Comercio Smart" />
                  <UserManagement />
                </>
              }
            />
            <Route
              path="/mi-factura"
              element={
                <>
                  <PageTitle title="Mis Cuentas | Panel de Comercio Smart" />
                  <PaymentDemoPage />
                </>
              }
            />
            <Route
              path="/mi-dashboard"
              element={
                <>
                  <PageTitle title="Mi Dashboard | Panel de Comercio Smart" />
                  <SmartDashboard />
                </>
              }
            />
            <Route
              path="/mi-agente"
              element={
                <>
                  <PageTitle title="Mi Dashboard | Panel de Comercio Smart" />
                  <SmartAI  />
                </>
              }
            />
            <Route
              path="/mis-trabajasssssdsaXxxasdasores"
              element={
                <>
                  <PageTitle title="Mi Comercio | Panel de Comercio Smart" />
                  <BranchInformation />
                </>
              }
            />
            <Route
              path="/mi-suscripcion"
              element={
                <>
                  <PageTitle title="Mi Comercio | Panel de Comercio Smart" />
                  <VisualizacionMembresias />
                </>
              }
            />

            <Route
              path="/settings-commerce"
              element={
                <>
                  <PageTitle title="Settings | Panel de Administración Smart" />
                  <SettingsCommerce />
                </>
              }
            />
            <Route
              path="/mi-carrito"
              element={
                <>
                  <PageTitle title="Mi Comercio | Panel de Comercio Smart" />
                  <CarritoPuntosSmartDemo />
                </>
              }
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["branch_manager"]} />}>
          <Route element={<DefaultLayout />}>
            <Route
              path="/mi-sucursal"
              element={
                <>
                  <PageTitle title="Mi Dashboard | Panel de Comercio Smart" />
                  <SmartDashboard />
                </>
              }
            />
            <Route
              path="/mis-trabajadores-sucursal"
              element={
                <>
                  <PageTitle title="Mis Trabajadores | Panel de Comercio Smart" />
                  <UserManagement />
                </>
              }
            />
            <Route
              path="/mis-encuestas"
              element={
                <>
                  <PageTitle title="Mi Dashboard | Panel de Comercio Smart" />
                  <SurveysCommerce
                    branchId={branchId}
                    selectedBranchName={branchName}
                    branchAddress={branchDireccion}
                  />
                </>
              }
            />
            <Route
              path="/mis-estudios"
              element={
                <>
                  <PageTitle title="Mi Dashboard | Panel de Comercio Smart" />
                  <StudiesCommerce
                    branchId={branchId}
                    selectedBranchName={branchName}
                    branchAddress={branchDireccion}
                  />
                </>
              }
            />
            <Route
              path="/mis-promociones"
              element={
                <>
                  <PageTitle title="Mi Dashboard | Panel de Comercio Smart" />
                  <PromotionsCommerce
                    branchId={branchId}
                    selectedBranchName={branchName}
                    branchAddress={branchDireccion}
                  />
                </>
              }
            />
            <Route
              path="/mis-productos"
              element={
                <>
                  <PageTitle title="Mi Dashboard | Panel de Comercio Smart" />
                  <ProductsCommerce
                    branchId={branchId}
                    selectedBranchName={branchName}
                    branchAddress={branchDireccion}
                    inheritedCategory={branchCategoriaId}
                    inheritedSubcategory={branchSubCategoriaId}
                  />
                </>
              }
            />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <>
              <PageTitle title="Página no encontrada | Panel de Comercio Smart" />
              <NotFound />
            </>
          }
        />
      </Routes>
    </LoadScript>
  );
}

export default App;
