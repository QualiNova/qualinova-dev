import Input from "@/components/atoms/Input/input"
import Select from "@/components/atoms/Select/select"

export default function CompanyInformationForm() {
  return (
    <div className="rounded-lg p-6 border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
      <h2 className="text-xl font-semibold mb-2">Información de la Empresa</h2>
      <p className="text-slate-400 mb-6">Proporciona los datos básicos de tu organización</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company-name" className="text-sm font-medium mb-2 block text-white">
            Nombre de la Empresa <span className="text-red-500">*</span>
          </label>
          <Input
            id="company-name"
            placeholder="Ej. Acme Corporation"
            className="text-white placeholder:text-slate-400 border"
            style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}
          />
        </div>

        <div>
          <label htmlFor="contact-name" className="text-sm font-medium mb-2 block text-white">
            Nombre del Contacto <span className="text-red-500">*</span>
          </label>
          <Input
            id="contact-name"
            placeholder="Ej. Juan Pérez"
            className="text-white placeholder:text-slate-400 border"
            style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}
          />
        </div>

        <div>
          <label htmlFor="corporate-email" className="text-sm font-medium mb-2 block text-white">
            Email Corporativo <span className="text-red-500">*</span>
          </label>
          <Input
            id="corporate-email"
            type="email"
            placeholder="contacto@empresa.com"
            className="text-white placeholder:text-slate-400 border"
            style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium mb-2 block text-white">
            Teléfono
          </label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            className="text-white placeholder:text-slate-400 border"
            style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="company-address" className="text-sm font-medium mb-2 block text-white">
          Dirección de la Empresa
        </label>
        <Input
          id="company-address"
          placeholder="Dirección completa de la empresa..."
          className="text-white placeholder:text-slate-400 border"
          style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label htmlFor="industry" className="text-sm font-medium mb-2 block text-white">
            Industria/Sector
          </label>
          <Select className="text-white border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
            <option value="">Selecciona la industria</option>
            <option value="technology">Tecnología</option>
            <option value="manufacturing">Manufactura</option>
            <option value="healthcare">Salud</option>
            <option value="finance">Finanzas</option>
          </Select>
        </div>

        <div>
          <label htmlFor="employees" className="text-sm font-medium mb-2 block text-white">
            Número de Empleados
          </label>
          <Select className="text-white border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
            <option value="">Selecciona el rango</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </Select>
        </div>
      </div>
    </div>
  )
}