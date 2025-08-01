"use client"

interface PanelTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function PanelTabs({ activeTab, setActiveTab }: PanelTabsProps) {
  const tabs = ["Certificados Asignados", "Plantillas de Certificados"]

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === tab
              ? "bg-slate-800 text-white border-b-2 border-blue-500"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}