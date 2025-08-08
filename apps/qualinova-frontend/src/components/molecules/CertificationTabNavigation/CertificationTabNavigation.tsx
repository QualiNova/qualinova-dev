"use client"

interface CertificationTabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function CertificationTabNavigation({ activeTab, setActiveTab }: CertificationTabNavigationProps) {
  const tabs = ["Nueva Solicitud", "Catálogo de Certificaciones", "Estado de Solicitudes"]

  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-slate-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab ? "text-white" : "text-slate-400 hover:text-white"
            }`}
            style={activeTab === tab ? { backgroundColor: "#020817" } : undefined}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}