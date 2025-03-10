import { useState } from "react";
import Uploader from "../../../shared/components/Atoms/Uploader";

function RegisterComercio() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("+51");
  const [alias, setAlias] = useState("");
  const [referalCode, setReferalCode] = useState("");
  // const [avatar, setAvatar] = useState<File | null>(null);
  const [, setAvatar] = useState<File | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (!input.startsWith("+51")) {
      setPhone("+51" + input.replace(/^\+?51/, ""));
    } else {
      setPhone(input);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <img src="/api/placeholder/120/40" alt="PedidosYa" className="h-8" />
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              ¿Cómo funcionamos?
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Preguntas frecuentes
            </a>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
              Ir a Partner Portal
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Fixed Background */}
      <div className="relative min-h-screen">
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/become-pedidosya-bg-1.jpg')`,
            zIndex: -1,
          }}
        />

        {/* Content Container */}
        <div className="relative pt-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between min-h-screen">
            {/* Left Column - Text */}
            <div className="md:w-1/2 text-white pt-16">
              <h1 className="text-5xl font-bold mb-8">
                Empieza a vender en la
                <br />
                app líder en delivery
                <br />
                online de
                <br />
                Latinoamérica
              </h1>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <span>→</span>
                  El mejor canal de ventas para tu local
                </p>
                <p className="flex items-center gap-2">
                  <span>→</span>
                  En el bolsillo de millones de usuarios
                </p>
                <p className="flex items-center gap-2">
                  <span>→</span>
                  El sistema de entrega más avanzado
                </p>
                <p className="flex items-center gap-2">
                  <span>→</span>
                  Todo tu menú online y autogestionable
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="md:w-5/12 mt-8 md:mt-0">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">
                  ¡Registra tu local ahora mismo!
                </h2>

                <div className="bg-yellow-300 px-4 py-2 rounded mb-6">
                  <p className="text-gray-800">
                    <span className="font-bold">10% de comisión</span> durante
                    los primeros 30 días
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="input-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Apellido</label>
                    <input
                      type="text"
                      placeholder="Tu apellido"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Correo</label>
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Confirmar Contraseña</label>
                    <input
                      type="password"
                      placeholder="Confirma tu contraseña"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      placeholder="Número de teléfono"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Alias</label>
                    <input
                      type="text"
                      placeholder="Alias"
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <label>Avatar de Usuario</label>
                    <Uploader
                      onFileSelect={(file) => setAvatar(file)}
                      accept="image/jpeg, image/jpg, image/png"
                      maxSize={5 * 1024 * 1024}
                      label="Sube tu avatar aquí"
                      className="h-[16.5rem]"
                    />
                  </div>
                  <div className="input-group">
                    <label>Código de Referido (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ingresa el código de referido (opcional)"
                      value={referalCode}
                      onChange={(e) => setReferalCode(e.target.value)}
                      maxLength={25}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                  >
                    Comenzar
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-center text-3xl font-bold mb-4">
                Comenzar a<br />
                <span className="text-4xl">vender</span>
                <br />
                es así de simple
              </h2>
              <div className="grid md:grid-cols-4 gap-8 mt-12 mb-16">
                <div className="text-center">
                  <div className="relative">
                    <div className=" w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src="https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/process-icon-1.svg"
                        alt=""
                        className="w-40 h-40"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">
                    Registra tus datos y la información bancaria de tu local.
                  </h3>
                </div>
                <div className="text-center">
                  <div className="relative">
                    <div className=" w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src="https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/process-icon-2.svg"
                        alt=""
                        className="w-40 h-40"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">
                    Carga tu menú, horarios y logo en nuestro portal de
                    autogestión.
                  </h3>
                </div>
                <div className="text-center">
                  <div className="relative">
                    <div className=" w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src="https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/process-icon-3.svg"
                        alt=""
                        className="w-40 h-40"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">
                    Prueba tu sistema de recepción de pedidos.
                  </h3>
                </div>
                <div className="text-center">
                  <div className="relative">
                    <div className=" w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src="https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/process-icon-4.svg"
                        alt=""
                        className="w-40 h-40"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">
                    ¡Y listo! ¡Recibe tus primeros pedidos en nuestra
                    plataforma!
                  </h3>
                </div>
              </div>
              <p className="text-center text-gray-600 max-w-3xl mx-auto">
                Además, te compartiremos distintos entrenamientos para que todo
                quede claro durante el proceso y puedas potenciar tus ventas
                desde el primer día.
              </p>
            </div>
          </div>

          {/* Historia de Crecimiento Section */}
          <div className="bg-pink-600 py-16 text-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-4">
                Una historia de
                <br />
                <span className="text-5xl">crecimiento</span>
              </h2>
              <p className="max-w-2xl mx-auto mb-8">
                Te compartimos una de las tantas historias de éxito de nuestros
                socios comerciales. Tú también puedes hacer crecer tu negocio.
                ¡Inicia ahora tu registro!
              </p>
              <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                Registrarme ya
              </button>
              <div className="mt-8 max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="450"
                  src="https://www.youtube.com/embed/pnfdKM-VkbU"
                  title="Video PuntosSmart"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Cómo Funcionamos Section */}
          <div className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-4xl text-center font-bold leading-tight text-black">
                ¿Cómo funcionamos?
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="w-48">
                  <img
                    src="https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/icon-peya-step-2.svg"
                    alt="Recibir pedidos"
                    className=""
                  />
                  <h3 className="font-extrabold text-xl text-black">
                    Cómo recibir pedidos
                  </h3>
                  <p className="text-sm leading-snug text-gray-900 font-medium">
                    Con tu sistema de recepción podrás aceptar tus pedidos,
                    gestionar el horario de entrega y tendrás toda la
                    información necesaria para entregarlo correctamente.
                  </p>
                  <a href="#" className="text-pink-600 hover:underline">
                    +info
                  </a>
                </div>

                <div className="w-48">
                  <img
                    src="https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/icon-peya-step-2.svg"
                    alt="Gestionar local"
                    className=""
                  />
                  <h3 className="font-extrabold text-xl text-black">
                    Cómo gestionar tu local
                  </h3>
                  <p className="text-sm leading-snug text-gray-900 font-medium">
                    En Partner Portal podrás modificar tu menú y horarios de
                    apertura, descargar tu Estado de Cuenta y mucho más.
                  </p>
                  <a href="#" className="text-pink-600 hover:underline">
                    +info
                  </a>
                </div>

                <div className="w-48">
                  <img
                    src="https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/icon-peya-step-2.svg"
                    alt="Entregar pedidos"
                    className=""
                  />
                  <h3 className="font-extrabold text-xl text-black">
                    Cómo entregar los pedidos
                  </h3>
                  <p className="text-sm leading-snug text-gray-900 font-medium">
                    Cumplir con los tiempos de entrega y las expectativas de los
                    clientes permite asegurarles una gran experiencia. ¡Cuidar
                    tu operativa es clave!
                  </p>
                  <a href="#" className="text-pink-600 hover:underline">
                    +info
                  </a>
                </div>

                <div className="w-48">
                  <img
                    src="https://d36llnqjz0kfa6.cloudfront.net/images/pedidosya/icon-peya-step-2.svg"
                    alt="Potenciar ventas"
                    className=""
                  />
                  <h3 className="font-extrabold text-xl text-black">
                    Cómo potenciar tus ventas
                  </h3>
                  <p className="text-sm leading-snug text-gray-900 font-medium">
                    Te ofrecemos distintas herramientas para publicitar tu local
                    y aumentar tu visibilidad en nuestra aplicación, ¡logrando
                    así más ventas y nuevos clientes!
                  </p>
                  <a href="#" className="text-pink-600 hover:underline">
                    +info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComercio;
