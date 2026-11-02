import React from 'react';
import { ShieldCheck, Star, FileText, Eye, Compass } from 'lucide-react';

export default function Navbar({ onLoadPreset, onOpenReport, onRunAudit, isAuditing }) {
  return (
    <header className="border-b border-[#1e293b] bg-[#0c121e]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand & Telemetry Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#0284c7]/15 border border-[#0284c7]/40 flex items-center justify-center">
            <Compass className="w-5 h-5 text-[#38bdf8]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[13px] tracking-wide text-white uppercase">
                STRUCTURA<span className="text-[#0284c7]">OS</span> • AUTONOMOUS STRUCTURAL VISION
              </span>
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#0284c7]/10 text-[#38bdf8] border border-[#0284c7]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
                <span>OSHA 1926 & ACI 318 Calibrated</span>
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8]">
              Autonomous Field Telemetry, Structural Forensics & Site Safety Platform • Cloud-Native
            </p>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onLoadPreset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#0f172a] hover:bg-[#1e293b] text-zinc-300 border border-[#1e293b] text-xs font-medium transition cursor-pointer shadow-sm"
          >
            <Star className="w-3.5 h-3.5 text-[#38bdf8] fill-[#38bdf8]" />
            <span>Load Preset Sample</span>
          </button>

          <button
            onClick={onOpenReport}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#0f172a] hover:bg-[#1e293b] text-zinc-300 border border-[#1e293b] text-xs font-medium transition cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export Audit Dossier (PDF/MD)</span>
          </button>

          <button
            onClick={onRunAudit}
            disabled={isAuditing}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-md bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-semibold shadow transition cursor-pointer disabled:opacity-50"
          >
            <Eye className="w-3.5 h-3.5 text-white" />
            <span>{isAuditing ? 'Auditing...' : 'Run Safety Audit'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
