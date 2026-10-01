import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { supabase } from './supabase';
import type { ProfileData } from './supabase';
import { profile as defaultProfile, about as defaultAbout } from '../data';

const STORAGE_KEY = 'portfolio_profile_data';

const defaultProfileData: ProfileData = {
  name: defaultProfile.name,
  role: defaultProfile.role,
  tagline: defaultProfile.tagline,
  intro: defaultProfile.intro,
  about: defaultAbout.description,
  location: 'Visakhapatnam, India',
  email: defaultProfile.email,
  phone: defaultProfile.phone,
  github: defaultProfile.github,
  linkedin: defaultProfile.linkedin,
  resume: defaultProfile.resume,
  photo_url: null,
};

type ProfileContextValue = {
  data: ProfileData;
  loading: boolean;
  saving: boolean;
  error: string | null;
  save: (next: ProfileData) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProfileData>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) return { ...defaultProfileData, ...JSON.parse(cached) };
    } catch { /* ignore */ }
    return defaultProfileData;
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: row, error: err } = await supabase
          .from('profile_data')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (err) throw err;
        if (!cancelled && row) {
          const merged = {
            name: row.name ?? defaultProfileData.name,
            role: row.role ?? defaultProfileData.role,
            tagline: row.tagline ?? defaultProfileData.tagline,
            intro: row.intro ?? defaultProfileData.intro,
            about: row.about ?? defaultProfileData.about,
            location: row.location ?? defaultProfileData.location,
            email: row.email ?? defaultProfileData.email,
            phone: row.phone ?? defaultProfileData.phone,
            github: row.github ?? defaultProfileData.github,
            linkedin: row.linkedin ?? defaultProfileData.linkedin,
            resume: row.resume ?? defaultProfileData.resume,
            photo_url: row.photo_url ?? null,
          };
          setData(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        }
      } catch (e) {
        // Network/permission error — keep cached/default data, don't crash
        if (!cancelled) setError(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const save = useCallback(async (next: ProfileData) => {
    setSaving(true);
    setError(null);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setData(next);

      const { error: err } = await supabase
        .from('profile_data')
        .upsert({ id: 1, ...next, updated_at: new Date().toISOString() }, { onConflict: 'id' });

      if (err) throw err;
    } catch (e) {
      setError('Saved locally, but could not sync to the cloud. Your changes will persist on this device.');
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ data, loading, saving, error, save }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
