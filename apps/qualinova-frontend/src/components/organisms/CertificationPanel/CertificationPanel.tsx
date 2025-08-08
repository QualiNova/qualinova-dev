"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/Button/button"
import PanelStats from "@/components/molecules/PanelStats/PanelStats"
import PanelTabs from "@/components/molecules/PanelTabs/PanelTabs"

export default function CertificationPanel() {
  const [activeTab, setActiveTab] = useState("Certificados Asignados")

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#020817" }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Panel de Certificación</h1>
            <p className="text-slate-400">Gestiona y asigna certificados a empresas</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2">
            + Asignar Nuevo Certificado
          </Button>
        </div>

        {/* Stats Cards */}
        <PanelStats />

        {/* Tabs */}
        <PanelTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}