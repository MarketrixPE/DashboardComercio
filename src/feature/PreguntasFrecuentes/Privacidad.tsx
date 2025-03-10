import "./fondo.css";

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 p-6 md:p-12">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 fondo">
                <h1 className="text-2xl font-bold mb-6">Política de Privacidad de Puntos Smart</h1>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">1. Introducción</h2>
                    <p>
                        La presente Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos,
                        protegemos y compartimos la información personal que obtienes cuando usas la aplicación
                        Puntos Smart (en adelante, “la Aplicación”). Al registrarte y utilizar la Aplicación, aceptas
                        las prácticas descritas en esta Política de Privacidad.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">2. Información que recopilamos</h2>
                    <ul className="list-disc list-inside">
                        <li>Información personal identificable: Nombre, dirección de correo electrónico, número de teléfono, y dirección de facturación.</li>
                        <li>Información de transacciones: Detalles de tus compras o actividades en comercios afiliados, incluyendo los montos gastados y los puntos acumulados.</li>
                        <li>Información de ubicación: Para proporcionarte promociones basadas en tu ubicación y los comercios cercanos.</li>
                        <li>Información sobre el uso de la Aplicación: Recopilamos datos sobre cómo interactúas con la Aplicación, como el tipo de dispositivo que utilizas, la versión de la Aplicación, las páginas que visitas y las acciones que realizas dentro de la misma.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">3. Uso de la información</h2>
                    <ul className="list-disc list-inside">
                        <li>Proveer nuestros servicios: Gestionar tu cuenta, procesar tus compras y actividades dentro de la Aplicación, y asignar puntos.</li>
                        <li>Personalización de la experiencia: Enviar promociones personalizadas y recomendaciones basadas en tus preferencias y actividades.</li>
                        <li>Mejorar nuestros servicios: Analizar cómo los usuarios interactúan con la Aplicación para mejorar nuestras funcionalidades y resolver problemas técnicos.</li>
                        <li>Cumplimiento legal: Cumplir con las leyes y regulaciones aplicables, y gestionar cualquier disputa legal que pueda surgir.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">4. Uso compartido de la información</h2>
                    <ul className="list-disc list-inside">
                        <li>Comercios afiliados: Para gestionar las transacciones de puntos y descuentos según tu participación en promociones y compras.</li>
                        <li>Proveedores de servicios: Empresas que nos ayudan a operar la Aplicación y ofrecer servicios, como proveedores de hosting, análisis de datos y marketing.</li>
                        <li>Autoridades legales: Si es necesario para cumplir con una obligación legal o en respuesta a una solicitud válida de las autoridades competentes.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">5. Seguridad de la información</h2>
                    <p>
                        Nos comprometemos a proteger la información personal que nos proporcionas. Implementamos
                        medidas técnicas, administrativas y físicas razonables para proteger tu información contra
                        accesos no autorizados, alteraciones, divulgación o destrucción.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">6. Conservación de datos</h2>
                    <p>
                        Conservamos tu información personal durante el tiempo que sea necesario para cumplir con los
                        fines para los que fue recopilada, incluido el cumplimiento de obligaciones legales, la resolución
                        de disputas y la administración de nuestras relaciones comerciales.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">7. Derechos del usuario</h2>
                    <ul className="list-disc list-inside">
                        <li>Acceder a la información personal que tenemos sobre ti.</li>
                        <li>Rectificar cualquier información incorrecta o incompleta.</li>
                        <li>Eliminar tu cuenta y la información asociada a ella, aunque esto podría afectar tu capacidad para seguir participando en el programa de puntos.</li>
                        <li>Oponerte al uso de tus datos para fines de marketing y personalización.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">8. Modificaciones de la Política de Privacidad</h2>
                    <p>
                        Puntos Smart se reserva el derecho de actualizar o modificar esta Política de Privacidad en
                        cualquier momento. En caso de cambios, publicaremos la nueva versión en la Aplicación y te
                        notificaremos de manera apropiada. Es tu responsabilidad revisar periódicamente esta política
                        para estar al tanto de cualquier modificación.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">9. Contacto</h2>
                    <p>
                        Si tienes preguntas o inquietudes sobre esta Política de Privacidad, puedes ponerte en contacto con
                        nosotros a través del correo electrónico <a href="mailto:soporte@puntossmart.com" className="text-blue-600 hover:underline">soporte@puntossmart.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
