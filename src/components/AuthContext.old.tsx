import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface User {
  id: string;
  email: string;
  name?: string;
  isGuest: boolean;
  createdAt: string;
  lastLogin: string;
}

interface UserRegistration {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
  createdAt: string;
  lastLogin: string;
  ipAddress?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, name?: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
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

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: userData?.name || firebaseUser.displayName || 'User',
          isGuest: firebaseUser.isAnonymous,
          createdAt: userData?.createdAt || new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, name?: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date().toISOString();
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('vocabmaster-users') || '[]');
      const existingUser = existingUsers.find((u: UserRegistration) => u.email === email && !u.isGuest);
      
      let userData: User;
      
      if (existingUser) {
        // Update last login for existing user
        existingUser.lastLogin = now;
        const updatedUsers = existingUsers.map((u: UserRegistration) => 
          u.email === email && !u.isGuest ? existingUser : u
        );
        localStorage.setItem('vocabmaster-users', JSON.stringify(updatedUsers));
        
        userData = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          isGuest: false,
          createdAt: existingUser.createdAt,
          lastLogin: now
        };
      } else {
        // Create new user
        const newUserRegistration: UserRegistration = {
          id: userId,
          email,
          name: name || email.split('@')[0],
          isGuest: false,
          createdAt: now,
          lastLogin: now,
          ipAddress: '127.0.0.1' // In a real app, you'd get the actual IP
        };
        
        const updatedUsers = [...existingUsers, newUserRegistration];
        localStorage.setItem('vocabmaster-users', JSON.stringify(updatedUsers));
        
        userData = {
          id: userId,
          email,
          name: name || email.split('@')[0],
          isGuest: false,
          createdAt: now,
          lastLogin: now
        };
      }
      
      setUser(userData);
      localStorage.setItem('vocabmaster-user', JSON.stringify(userData));
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = () => {
    const now = new Date().toISOString();
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const guestUser: User = {
      id: guestId,
      email: 'guest@vocabmaster.com',
      name: 'Guest User',
      isGuest: true,
      createdAt: now,
      lastLogin: now
    };
    
    // Track guest sessions for admin
    const existingUsers = JSON.parse(localStorage.getItem('vocabmaster-users') || '[]');
    const guestSession: UserRegistration = {
      id: guestId,
      email: `guest_${guestId}@vocabmaster.com`,
      name: 'Guest User',
      isGuest: true,
      createdAt: now,
      lastLogin: now,
      ipAddress: '127.0.0.1'
    };
    
    const updatedUsers = [...existingUsers, guestSession];
    localStorage.setItem('vocabmaster-users', JSON.stringify(updatedUsers));
    
    setUser(guestUser);
    localStorage.setItem('vocabmaster-user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vocabmaster-user');
    
    // Also clear any game progress if needed
    localStorage.removeItem('vocabmaster-progress');
    localStorage.removeItem('admin-vocabulary');
    localStorage.removeItem('admin-languages');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
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