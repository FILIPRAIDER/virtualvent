import { checkCliente } from "@/actions/cliente/check-cliente";
import { saveCliente } from "@/actions/cliente/save-cliente";

export default async function DatosClientePage() {
  const { session } = await checkCliente();

  return (
    <form
      action={saveCliente}
      className="w-full px-4 sm:px-6 md:px-0 max-w-xl mx-auto mt-14 space-y-6 mb-24"
    >
      <h1 className="text-2xl font-bold text-center">
        Información de facturación
      </h1>
      <p className="text-center text-sm text-gray-500">Ingresa los datos</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Primer nombre</label>
          <input
            name="primer_nombre"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="text-sm">Segundo nombre (opcional)</label>
          <input
            name="segundo_nombre"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm">Primer apellido</label>
          <input
            name="primer_apellido"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="text-sm">Segundo apellido (opcional)</label>
          <input
            name="segundo_apellido"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm">Tipo de documento</label>
          <select
            name="tipo_documento"
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="CC">Cédula</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="CE">Cédula extranjera</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Número Documento</label>
          <input
            name="numero_documento"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="text-sm">Correo</label>
          <input
            name="email"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            disabled
            value={session?.user.email ?? ""}
            readOnly
          />
        </div>
        <div>
          <label className="text-sm">Teléfono</label>
          <input
            name="telefono"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="text-sm">Sexo</label>
          <select
            name="sexo"
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Fecha de nacimiento</label>
          <input
            name="fecha_nacimiento"
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-2 bg-[#093F51] text-white rounded cursor-pointer"
      >
        Continuar
      </button>
    </form>
  );
}
