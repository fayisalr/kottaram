'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole, StaffMember } from '@/types';
import {
  Users,
  Plus,
  Shield,
  Check,
  Edit,
  Trash2,
  X,
  CheckCircle2,
  Lock,
  UserCheck,
  UserX,
  Sparkles,
  Info
} from 'lucide-react';

export default function StaffPage() {
  const { staff, addStaff, updateStaff, deleteStaff, currentStaff } = useApp();

  // Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('staff');

  // Edit Modal State
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  // Success Notification State
  const [alertMsg, setAlertMsg] = useState('');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addStaff({
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active'
    });

    setShowAddModal(false);
    setName('');
    setEmail('');
    setRole('staff');
    setAlertMsg(`Successfully added "${name}" as ${role.replace('_', ' ').toUpperCase()}!`);
    setTimeout(() => setAlertMsg(''), 3000);
  };

  const handleSaveStaffEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;

    updateStaff(editingStaff.id, {
      name: editingStaff.name,
      email: editingStaff.email,
      role: editingStaff.role,
      status: editingStaff.status
    });

    setAlertMsg(`Updated role & permissions for "${editingStaff.name}"!`);
    setEditingStaff(null);
    setTimeout(() => setAlertMsg(''), 3000);
  };

  const handleDeleteStaff = (member: StaffMember) => {
    if (member.id === currentStaff.id) {
      alert('You cannot delete your own active staff account!');
      return;
    }
    if (confirm(`Are you sure you want to remove role-based access for "${member.name}"?`)) {
      deleteStaff(member.id);
      setAlertMsg(`Role-based access for "${member.name}" deleted.`);
      setTimeout(() => setAlertMsg(''), 3000);
    }
  };

  const rolePrivileges: Record<UserRole, { title: string; color: string; desc: string }> = {
    super_admin: {
      title: 'Super Admin',
      color: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
      desc: 'Full system access, staff & role management, branding & settings.'
    },
    manager: {
      title: 'Manager',
      color: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
      desc: 'Appliance catalog management, offer expiries, campaigns & WhatsApp.'
    },
    designer: {
      title: 'Designer',
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      desc: 'AI Offer Poster Studio, bulk poster studio & poster templates.'
    },
    staff: {
      title: 'Staff',
      color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
      desc: 'Appliance & pricing entry, stock status updates.'
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Staff Roles & Access Permissions ({staff.length})</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Staff Member</span>
        </button>
      </div>

      {/* Alert Banner */}
      {alertMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 text-emerald-400 text-xs font-bold animate-in fade-in-50">
          <CheckCircle2 className="w-5 h-5" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Role Privilege Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(rolePrivileges).map(([key, info]) => (
          <div key={key} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${info.color}`}>
                {info.title}
              </span>
              <Lock className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <p className="text-xs text-slate-300 font-medium leading-snug">{info.desc}</p>
          </div>
        ))}
      </div>

      {/* Staff Members Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Staff Member</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Account Status</th>
              <th className="p-4">Last Active</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-slate-950/60 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-600 to-blue-700 font-black text-xs flex items-center justify-center text-white shadow">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        <span>{member.name}</span>
                        {member.id === currentStaff.id && (
                          <span className="bg-amber-400/20 text-amber-400 text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-amber-400/30">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-[11px] font-mono">{member.email}</div>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-full font-black text-[10px] uppercase border ${
                      rolePrivileges[member.role]?.color || 'bg-slate-800 text-white'
                    }`}
                  >
                    {member.role.replace('_', ' ')}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`flex items-center gap-1 w-max px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      member.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {member.status === 'active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                    <span>{member.status.toUpperCase()}</span>
                  </span>
                </td>

                <td className="p-4 text-slate-400 font-mono text-[11px]">{member.lastActive}</td>

                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingStaff({ ...member })}
                      className="px-3 py-1.5 bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 rounded-xl font-bold text-xs border border-sky-500/30 flex items-center gap-1 transition-all"
                      title="Edit Staff Role & Access"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Role</span>
                    </button>

                    <button
                      onClick={() => handleDeleteStaff(member)}
                      className="p-1.5 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-800 transition-all"
                      title="Delete Role-Based Access"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD STAFF MODAL POPUP */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>Add Staff & Assign Role</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="rahul@kottaramhomeneeds.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Assigned Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="super_admin">Super Admin (Full Control)</option>
                  <option value="manager">Manager (Products, Offers, Campaigns)</option>
                  <option value="designer">Designer (Poster Generator & Studio)</option>
                  <option value="staff">Staff (Appliance Entry & Pricing)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STAFF & ROLE MODAL POPUP */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Edit className="w-5 h-5 text-sky-400" />
                <span>Edit Staff Role & RBAC Access</span>
              </h3>
              <button
                onClick={() => setEditingStaff(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStaffEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingStaff.name}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingStaff.email}
                  onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Change Assigned Role</label>
                <select
                  value={editingStaff.role}
                  onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value as UserRole })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="super_admin">Super Admin (Full System Access)</option>
                  <option value="manager">Manager (Catalog, Offers, Campaigns)</option>
                  <option value="designer">Designer (AI Poster Generator & Templates)</option>
                  <option value="staff">Staff (Appliance & Price Entry)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Account Status</label>
                <select
                  value={editingStaff.status}
                  onChange={(e) => setEditingStaff({ ...editingStaff, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="active">Active Access (ലഭ്യമാണ്)</option>
                  <option value="inactive">Inactive / Suspended (നിഷ്‌ക്രിയമാക്കി)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs rounded-xl shadow"
                >
                  Save Role Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
