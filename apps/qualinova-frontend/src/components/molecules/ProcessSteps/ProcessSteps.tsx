import { Button } from "@/components/atoms/Button/button"

interface Step {
  number: number
  title: string
  description: string
  isActive?: boolean
}

export default function ProcessSteps() {
  const steps: Step[] = [
    { number: 1, title: "Solicitud", description: "Envía tu solicitud", isActive: true },
    { number: 2, title: "Revisión", description: "Preparamos tu solicitud" },
    { number: 3, title: "Auditoría", description: "Proceso de auditoría" },
    { number: 4, title: "Certificación", description: "Emisión del certificado" },
  ]

  return (
    <div className="rounded-lg p-6 sticky top-6 border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
      <h2 className="text-xl font-semibold mb-6">Proceso de Certificación</h2>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start space-x-4">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: step.isActive ? "#3B82F6" : "#DBEAFE",
              }}
            >
              <span className={`text-sm font-semibold ${step.isActive ? "text-white" : "text-slate-800"}`}>
                {step.number}
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3">
        ✓ Enviar Solicitud
      </Button>
    </div>
  )
}