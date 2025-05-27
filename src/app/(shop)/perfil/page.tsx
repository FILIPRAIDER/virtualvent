"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  return (
    <div className="px-4 sm:px-8 md:px-20 lg:px-32 mt-10 mb-28">
      {/* <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <h3 className="text-3xl mb-10">{session?.user?.role}</h3> */}
      <section className="flex flex-col px-40 mt-10">
        {/* <div >
          <ul className="flex flex-row gap-4 mb-10 text-sm text-[#575757]">
            <li>Información Personal</li>
            <li>Pedidos</li>
            <li>Preferencias</li>
            <li>Configuración</li>
            <li>Seguridad</li>
          </ul>
        </div> */}
        <section className="flex flex-row gap-4">
          <div className="relative">
            <Image
              width={96} // 24 * 4 (tailwind w-24)
              height={64} // 16 * 4 (tailwind h-16)
              className="rounded-full object-cover"
              src={`https://ui-avatars.com/api/?name=${session?.user?.name}&background=0D8ABC&color=fff`}
              alt="Avatar"
            />
          </div>
          <div className="ml-1">
            <h2 className="font-semibold text-gray-800 text-lg">
              {session?.user?.name}
            </h2>
            <p className="text-gray-600 text-sm font-regular">
              Montería, Córdoba
            </p>
          </div>
          <div className="max-w-5xl px-20">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Información Personal
            </h2>
            <hr className="mb-6 border-gray-300" />

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombres
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número de teléfono
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Correo
                  </label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Número de identificación
                    </label>
                    <div className="flex gap-2 border  rounded-md border-gray-300 px-2 py-2 text-sm shadow-sm ">
                      <select className="w-20 rounded-md ">
                        <option>CC</option>
                        <option>TI</option>
                        <option>CE</option>
                      </select>
                      <div className="w-px h-5   bg-gray-300"></div>
                      <input
                        type="text"
                        className="flex-1"
                        placeholder="Numero de documento"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sexo
                  </label>
                  <select className="w-full rounded-md border border-gray-300 px-2 py-2 text-sm shadow-sm">
                    <option>Seleccione una opción</option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-4 rounded-md bg-[#073B4C] px-6 py-2 text-white text-sm font-semibold hover:bg-[#062f3a] transition"
                >
                  Guardar
                </button>
              </div>
            </form>
            <section>
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Cambiar Contraseña
                </h2>
                <hr className="mb-6 border-gray-300" />

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contraseña antigua
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contraseña nueva
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirmar contraseña
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="mt-4 rounded-md bg-[#073B4C] px-6 py-2 text-white text-sm font-semibold hover:bg-[#062f3a] transition"
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}
