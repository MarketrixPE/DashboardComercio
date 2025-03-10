import "./fondo.css";

function Terminos() {
  return (
    <div className="bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 fondo">
        <h1 className="text-2xl font-bold mb-6">Términos y Condiciones</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Definiciones</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Usuario:</strong> Persona registrada en la aplicación
              Puntos Smart.
            </li>
            <li>
              <strong>Comercio Afiliado:</strong> Establecimiento comercial
              registrado en la red Puntos Smart.
            </li>
            <li>
              <strong>Puntos Smart:</strong> Unidades de valor otorgadas a los
              usuarios por sus compras y actividades en la app.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            2. Registro y Participación
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Los usuarios deben descargar la aplicación y registrarse para
              participar en el programa de Puntos Smart.
            </li>
            <li>
              Los comercios deben registrarse y configurar su esquema de
              conversión de puntos a descuentos.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            3. Acumulación de Puntos
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Los puntos se otorgan por cada S/ 1.00 de compra o consumo en los
              comercios afiliados.
            </li>
            <li>
              Los puntos adicionales se otorgan por actividades como referir
              amigos, completar encuestas y participar en encuestas premium.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">4. Canje de Puntos</h2>
          <ul className="list-disc list-inside">
            <li>
              Los puntos acumulados pueden ser canjeados en los comercios
              afiliados conforme al esquema de conversión definido por cada
              comercio.
            </li>
            <li>
              Los puntos no tienen valor en efectivo y no pueden ser
              transferidos.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            5. Costos y Transacciones
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Cada transacción tiene un costo de S/ 0.10 para el comercio.
            </li>
            <li>
              Si un comercio supera las 3000 transacciones mensuales, el costo
              máximo será de S/ 300.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            6. Promociones y Ofertas
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Los comercios pueden publicar promociones en tiempo real a través
              de la plataforma.
            </li>
            <li>
              Las promociones se segmentarán de acuerdo a las preferencias de
              los clientes.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            7. Uso de Datos y Privacidad
          </h2>
          <ul className="list-disc list-inside">
            <li>
              La información de los usuarios será utilizada para segmentación de
              clientes y para ofrecer promociones personalizadas.
            </li>
            <li>
              Los datos serán manejados conforme a la política de privacidad de
              Puntos Smart.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            8. Modificaciones y Terminación
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Puntos Smart se reserva el derecho de modificar estos términos y
              condiciones en cualquier momento.
            </li>
            <li>
              La participación en el programa implica la aceptación de los
              términos y condiciones vigentes.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            9. Aceptación de Términos
          </h2>
          <ul className="list-disc list-inside">
            <li>
              La descarga y uso de la aplicación Puntos Smart implica la
              aceptación de estos términos y condiciones.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Terminos;
