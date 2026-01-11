import React from 'react';

const GlassCard = ({ children, className = "", title, icon: Icon }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl">
      {(title || Icon) && (
        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-700/50">
          {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
          {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
        </div>
      )}
      {children}
    </div>
  </div>
);

export default GlassCard;
