'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, Check, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, clearNotifications } = useApp();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
            <Bell className="w-3.5 h-3.5" />
            <span>ALERT CENTER</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">System Notifications ({notifications.length})</h1>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-600/20 text-slate-300 hover:text-red-400 rounded-xl text-xs font-bold transition-all border border-slate-700"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Alerts</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
              n.read
                ? 'bg-slate-950 border-slate-800 opacity-60'
                : 'bg-slate-900 border-amber-500/30 shadow-lg'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 font-bold shrink-0">
                ⚡
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{n.title}</h3>
                <p className="text-xs text-slate-400">{n.message}</p>
                <div className="text-[10px] text-slate-500 mt-1">{n.timestamp}</div>
              </div>
            </div>

            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md" title="Unread" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
