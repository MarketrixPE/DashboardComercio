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
import RegisterComercio from "../feature/Operador/RegisterComercio/RegisterComercio";
import SmartDashboard from "../feature/Operador/EstadisticaComercio/SmartDashboard";
import PaymentDemoPage from "../feature/Izipay/PaymentDemoPage";
import VisualizacionMembresias from "../feature/Operador/SuscripcionesSmart/SuscripcionesSmart";
import CarritoPuntosSmartDemo from "../feature/Operador/CarritoPuntosSmartDemo/CarritoPuntosSmartDemo";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <LoadScript
      googleMapsApiKey="AIzaSyBbPgQh_qdLyrC0S8TJXPSEf2dZ_IF3SZ8"
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
          path="/register-comercio"
          element={
            <>
              <PageTitle title="Registro de Comercio | Panel de Commercio Smart" />
              <RegisterComercio />
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
                  <PageTitle title="Mi Comercio | Panel de Comercio Smart" />
                  <SmartDashboard />
                </>
              }
            />
            <Route
              path="/mis-trabajadores"
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
      </Routes>
    </LoadScript>
  );
}

export default App;
