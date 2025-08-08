"use client"

import { useState } from "react"
import CertificationDetailsForm from "@/components/molecules/CertificationDetailsForm"
import CompanyInformationForm from "@/components/molecules/CompanyInformationForm"
import ProcessSteps from "@/components/molecules/ProcessSteps"
import CertificationTabNavigation from "@/components/molecules/CertificationTabNavigation"

export default function CertificationRequest() {
  const [activeTab, setActiveTab] = useState("Nueva Solicitud")

  const renderTabContent = () => {
    switch (activeTab) {
      case "Nueva Solicitud":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CompanyInformationForm />
              <CertificationDetailsForm />
            </div>
            <div className="lg:col-span-1">
              <ProcessSteps />
            </div>
          </div>
        )
      case "Catálogo de Certificaciones":
        return (
          <div className="rounded-lg p-6 border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
            <h2 className="text-xl font-semibold mb-4">Catálogo de Certificaciones</h2>
            <p className="text-slate-400 mb-6">Explora los diferentes tipos de certificaciones disponibles</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg" style={{ borderColor: "#1E293B" }}>
                <h3 className="font-semibold mb-2">ISO 9001</h3>
                <p className="text-sm text-slate-400">Gestión de Calidad</p>
              </div>
              <div className="p-4 border rounded-lg" style={{ borderColor: "#1E293B" }}>
                <h3 className="font-semibold mb-2">ISO 14001</h3>
                <p className="text-sm text-slate-400">Gestión Ambiental</p>
              </div>
              <div className="p-4 border rounded-lg" style={{ borderColor: "#1E293B" }}>
                <h3 className="font-semibold mb-2">ISO 27001</h3>
                <p className="text-sm text-slate-400">Seguridad de la Información</p>
              </div>
            </div>
          </div>
        )
      case "Estado de Solicitudes":
        return (
          <div className="rounded-lg p-6 border" style={{ backgroundColor: "#020817", borderColor: "#1E293B" }}>
            <h2 className="text-xl font-semibold mb-4">Estado de Solicitudes</h2>
            <p className="text-slate-400 mb-6">Revisa el progreso de tus solicitudes de certificación</p>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg" style={{ borderColor: "#1E293B" }}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">ISO 9001 - Acme Corp</h3>
                    <p className="text-sm text-slate-400">En proceso de revisión</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-full">En Revisión</span>
                </div>
              </div>
              <div className="p-4 border rounded-lg" style={{ borderColor: "#1E293B" }}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">ISO 14001 - Tech Solutions</h3>
                    <p className="text-sm text-slate-400">Auditoría programada</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Programada</span>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Solicitar Certificación</h1>
            <p className="text-slate-400">
              Gestiona tus solicitudes de certificación
            </p>
          </div>

          <CertificationTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}