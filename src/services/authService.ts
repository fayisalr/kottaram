import { createClient } from '@/utils/supabase/client';
import { UserRole, StaffMember } from '@/types';

const supabase = createClient();

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole | 'customer';
  avatar?: string;
}

export const authService = {
  // Demo default accounts for showroom staff & customers
  demoAccounts: [
    {
      email: 'kottaramalr@gmail.com',
      password: 'admin123',
      name: 'Store Owner / Super Admin',
      role: 'super_admin' as UserRole
    },
    {
      email: 'admin@kottaram.com',
      password: 'admin123',
      name: 'Fayis (Super Admin)',
      role: 'super_admin' as UserRole
    },
    {
      email: 'manager@kottaram.com',
      password: 'manager123',
      name: 'Rahul S (Manager)',
      role: 'manager' as UserRole
    },
    {
      email: 'designer@kottaram.com',
      password: 'designer123',
      name: 'Anjali M (Poster Designer)',
      role: 'designer' as UserRole
    },
    {
      email: 'staff@kottaram.com',
      password: 'staff123',
      name: 'Showroom Staff',
      role: 'staff' as UserRole
    },
    {
      email: 'customer@kottaram.com',
      password: 'user123',
      name: 'Customer Account',
      role: 'customer' as const
    }
  ],

  // Login with Email & Password (with Supabase fallback)
  async loginWithEmailPassword(email: string, pass: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    // 1. Check local demo accounts
    const match = this.demoAccounts.find(
      acc => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.password === pass
    );

    if (match) {
      const user: AuthUser = {
        id: `usr-${Date.now()}`,
        email: match.email,
        name: match.name,
        role: match.role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('sm_auth_user', JSON.stringify(user));
      }
      return { success: true, user };
    }

    // 2. Try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass
      });

      if (data?.user && !error) {
        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.name || email.split('@')[0],
          role: data.user.user_metadata?.role || 'staff'
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('sm_auth_user', JSON.stringify(user));
        }
        return { success: true, user };
      }
    } catch (err) {
      console.warn('Supabase Auth fallback:', err);
    }

    return {
      success: false,
      error: 'തെറ്റായ ഈമെയിൽ അല്ലെങ്കിൽ പാസ്‌വേഡ്! (Invalid email or password)'
    };
  },

  // Register New User
  async registerUser(email: string, pass: string, name: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: { name, role: 'customer' }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const newUser: AuthUser = {
        id: data.user?.id || `usr-${Date.now()}`,
        email,
        name,
        role: 'customer'
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('sm_auth_user', JSON.stringify(newUser));
      }

      return { success: true, user: newUser };
    } catch (err: any) {
      // Fallback local registration
      const newUser: AuthUser = {
        id: `usr-${Date.now()}`,
        email,
        name,
        role: 'customer'
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('sm_auth_user', JSON.stringify(newUser));
      }
      return { success: true, user: newUser };
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sm_auth_user');
    }
  },

  // Get Current Session User
  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('sm_auth_user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
};
