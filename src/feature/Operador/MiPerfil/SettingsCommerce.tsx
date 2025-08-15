import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir
import Uploader from "../../../shared/components/Atoms/Uploader";
import { fetchProfile, updateProfile } from "../../../core/services/Operador/Perfil/ProfileService";
import Cookies from "js-cookie";

const SettingsCommerce = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "",
    last_name: "",
    email: "",
    alias: "",
    uuid: Cookies.get("commerce_uuid") || "",
  });
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile(profileData.uuid);
        setProfileData((prevData) => ({ ...prevData, ...data }));
        setImagePreviewUrl(data.thumbnail);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };
    loadProfile();
  }, [profileData.uuid, navigate]);

  const isFormComplete = 
    profileData.name.trim() &&
    profileData.last_name.trim() &&
    profileData.email.trim() &&
    profileData.alias.trim() &&
    password.trim() &&
    passwordConfirmation.trim() &&
    (image || imagePreviewUrl);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("last_name", profileData.last_name);
    formData.append("email", profileData.email);
    formData.append("alias", profileData.alias);
    formData.append("uuid", profileData.uuid);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    if (image) {
      formData.append("thumbnail", image);
    }

    try {
      await updateProfile(formData);
      alert("Perfil actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Información del Administrador
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Usuario
                  </label>
                  <input
                    className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-black focus:border-primary dark:focus:border-primary"
                    value={profileData.alias}
                    onChange={(e) => setProfileData({ ...profileData, alias: e.target.value })}
                  />
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nombres*
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-black focus:border-primary dark:focus:border-primary"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Apellidos*
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      value={profileData.last_name}
                      onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Correo Electrónico*
                  </label>
                  <input
                    className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-span-5 xl:col-span-2 gap-4 flex flex-col">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Actualizar Foto del Administrador
              </h3>
            </div>
            <div className="p-7">
              <Uploader
                onFileSelect={(file) => {
                  setImage(file);
                  setImagePreviewUrl(URL.createObjectURL(file));
                }}
                initialPreview={imagePreviewUrl ?? undefined}
                accept="image/jpeg, image/jpg, image/png"
                maxSize={100 * 1024 * 1024}
                label="Click para subir o arrastra y suelta"
                className="w-full"
              />
            </div>
          </div>

          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                Confirme los cambios o actualice su contraseña
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nueva Contraseña *
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-black focus:border-primary dark:focus:border-primary"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Confirmar Nueva Contraseña *
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-black focus:border-primary dark:focus:border-primary"
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4.5 mt-4">
            <button
              className={`flex justify-center rounded py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${
                isFormComplete ? "bg-primary" : "bg-gray-400"
              }`}
              type="button"
              onClick={isFormComplete ? handleUpdateProfile : () => console.log("Formulario incompleto")}
              disabled={!isFormComplete} // Deshabilitado si no está completo
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsCommerce;
