import type React from "react"
import { FileText, Award, Building, CheckCircle } from "lucide-react"

interface StatCard {
  title: string
  value: number
  description: string
  icon: React.ReactNode
  iconColor: string
}

export default function PanelStats() {
  const stats: StatCard[] = [
    {
      title: "Plantillas Creadas",
      value: 5,
      description: "Total de certificados disponibles",
      icon: <FileText className="h-5 w-5" />,
      iconColor: "#3B82F6",
    },
    {
      title: "Certificados Asignados",
      value: 4,
      description: "Total de asignaciones",
      icon: <Award className="h-5 w-5" />,
      iconColor: "#10B981",
    },
    {
      title: "Empresas Certificadas",
      value: 4,
      description: "Empresas únicas",
      icon: <Building className="h-5 w-5" />,
      iconColor: "#8B5CF6",
    },
    {
      title: "Verificados",
      value: 3,
      description: "Certificados activos",
      icon: <CheckCircle className="h-5 w-5" />,
      iconColor: "#F59E0B",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-lg p-6 border"
          style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.iconColor}20`, color: stat.iconColor }}>
              {stat.icon}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}