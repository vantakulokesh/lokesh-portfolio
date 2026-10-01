import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

const ADMIN_KEY = 'portfolio_admin_mode';

type AdminContextValue = {
  adminMode: boolean;
  toggleAdmin: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminMode, setAdminMode] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const toggleAdmin = () => {
    setAdminMode((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(ADMIN_KEY, String(next));
      } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <AdminContext.Provider value={{ adminMode, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
