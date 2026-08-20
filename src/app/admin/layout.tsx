'use client';

import React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
