import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, ADMIN_EMAIL } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name?: string;
  isGuest: boolean;
  isAdmin: boolean;
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await loadUserProfile(session.user.id, session.user.email || '');
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user.id, session.user.email || '');
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string, email: string) => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );
      
      const queryPromise = supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

      if (error) throw error;

      setUser({
        id: userId,
        email: email,
        name: data?.name || 'User',
        isGuest: data?.is_guest || false,
        isAdmin: email === ADMIN_EMAIL,
        createdAt: data?.created_at || new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUser({
        id: userId,
        email: email,
        name: 'User',
        isGuest: false,
        isAdmin: email === ADMIN_EMAIL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Update last login
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', authUser.id);
    }
  };

  const signup = async (email: string, password: string, name?: string): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Create user profile
      await supabase.from('users').insert({
        id: data.user.id,
        email: email,
        name: name || email.split('@')[0],
        is_guest: false,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      });
    }
  };

  const loginAsGuest = async (): Promise<void> => {
    const guestEmail = `guest_${Date.now()}@vocabmaster.com`;
    const guestPassword = `guest_${Math.random().toString(36).slice(2)}`;

    const { data, error } = await supabase.auth.signUp({
      email: guestEmail,
      password: guestPassword,
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email: guestEmail,
        name: 'Guest User',
        is_guest: true,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      });
    }
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    loginAsGuest,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
