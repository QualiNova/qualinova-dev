import Input from "@/components/atoms/Input/input"
import Select from "@/components/atoms/Select/select"
import { Calendar } from "lucide-react"

export default function CertificationDetailsForm() {
  return (
    <div className="rounded-lg p-6 border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
      <h2 className="text-xl font-semibold mb-2">Detalles de la Certificación</h2>
      <p className="text-slate-400 mb-6">Especifica qué certificación necesitas y cuándo</p>

      <div className="space-y-6">
        <div>
          <label htmlFor="cert-type" className="text-sm font-medium mb-2 block text-white">
            Tipo de Certificación <span className="text-red-500">*</span>
          </label>
          <Select className="text-white border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
            <option value="">Selecciona el tipo de certificación</option>
            <option value="iso9001">ISO 9001</option>
            <option value="iso14001">ISO 14001</option>
            <option value="iso27001">ISO 27001</option>
            <option value="iso45001">ISO 45001</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="start-date" className="text-sm font-medium mb-2 block text-white">
              Fecha Preferida de Inicio
            </label>
            <div className="relative">
              <Input
                id="start-date"
                placeholder="Selecciona una fecha"
                className="text-white placeholder:text-slate-400 border pr-10"
                style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label htmlFor="urgency" className="text-sm font-medium mb-2 block text-white">
              Nivel de Urgencia
            </label>
            <Select className="text-white border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
              <option value="">Selecciona la urgencia</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </Select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-medium mb-2 block text-white">
            Descripción Adicional
          </label>
          <textarea
            id="description"
            placeholder="Describe cualquier información adicional relevante, objetivos específicos, o requisitos especiales..."
            className="text-white placeholder:text-slate-400 min-h-[100px] border rounded-lg p-3 w-full"
            style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}
          />
        </div>
      </div>
    </div>
  )
}