import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  BookOpen,
  Globe,
  Target,
  Trophy,
  X,
  ArrowLeft,
  Users,
  UserCheck,
  UserX,
  Calendar,
  Activity,
  TrendingUp,
  LogOut,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { popularLanguagePairs } from '../data/languages';
import { supabase } from '../lib/supabase';
import { fetchWordWithTranslation } from '../lib/dictionaryAPI';
import { useAuth } from './AuthContext';

// Simplified vocabulary item interface
interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
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

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [vocabularyData, setVocabularyData] = useState<{ [key: string]: VocabularyItem[] }>({});
  const [userRegistrations, setUserRegistrations] = useState<UserRegistration[]>([]);
  const [isAddingVocab, setIsAddingVocab] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load users from Supabase
  const loadUsersFromFirestore = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const users: UserRegistration[] = (data || []).map((user) => ({
        id: user.id,
        email: user.email || '',
        name: user.name || 'Unknown',
        isGuest: user.is_guest || false,
        createdAt: user.created_at || new Date().toISOString(),
        lastLogin: user.last_login || new Date().toISOString(),
        ipAddress: 'N/A'
      }));

      setUserRegistrations(users);
      console.log('Loaded users from Supabase:', users.length);
    } catch (error) {
      console.error('Error loading users from Supabase:', error);
    }
  };

  // Initialize with sample data to avoid timeout
  useEffect(() => {
    const initializeData = async () => {
      console.log('AdminDashboard: Initializing data...');
      // Create sample vocabulary data
      const sampleData: { [key: string]: VocabularyItem[] } = {
        es: [
          { id: '1', word: 'Cat', translation: 'Gato', category: 'Animals', difficulty: 'easy' },
          { id: '2', word: 'Dog', translation: 'Perro', category: 'Animals', difficulty: 'easy' },
          { id: '3', word: 'Hello', translation: 'Hola', category: 'Greetings', difficulty: 'easy' },
          { id: '4', word: 'Water', translation: 'Agua', category: 'Nature', difficulty: 'easy' },
          { id: '5', word: 'House', translation: 'Casa', category: 'Buildings', difficulty: 'easy' },
        ],
        fr: [
          { id: '6', word: 'Cat', translation: 'Chat', category: 'Animals', difficulty: 'easy' },
          { id: '7', word: 'Dog', translation: 'Chien', category: 'Animals', difficulty: 'easy' },
          { id: '8', word: 'Hello', translation: 'Bonjour', category: 'Greetings', difficulty: 'easy' },
        ]
      };

      // Load from localStorage or use sample data
      const savedVocab = localStorage.getItem('admin-vocabulary');
      if (savedVocab) {
        try {
          setVocabularyData(JSON.parse(savedVocab));
        } catch (e) {
          setVocabularyData(sampleData);
        }
      } else {
        setVocabularyData(sampleData);
      }

      // Load user registrations from Firestore
      console.log('AdminDashboard: Loading users from Firestore...');
      await loadUsersFromFirestore();
      
      setIsLoading(false);
    };

    // Use timeout to prevent blocking
    const timer = setTimeout(initializeData, 100);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading && Object.keys(vocabularyData).length > 0) {
      localStorage.setItem('admin-vocabulary', JSON.stringify(vocabularyData));
    }
  }, [vocabularyData, isLoading]);

  const stats = {
    totalVocabulary: Object.values(vocabularyData).reduce((acc, lang) => acc + lang.length, 0),
    languagePairs: popularLanguagePairs.length,
    categories: [...new Set(Object.values(vocabularyData).flat().map(item => item.category))].length,
    totalChallenges: 12, // Static number for simplicity
    totalUsers: userRegistrations.length,
    registeredUsers: userRegistrations.filter(u => !u.isGuest).length,
    guestSessions: userRegistrations.filter(u => u.isGuest).length,
    newUsersToday: userRegistrations.filter(u => {
      const today = new Date().toDateString();
      return new Date(u.createdAt).toDateString() === today;
    }).length,
  };

  const handleAddVocabulary = (newVocab: Omit<VocabularyItem, 'id'>, languageCode: string) => {
    const id = Date.now().toString();
    const vocabWithId = { ...newVocab, id };
    
    setVocabularyData(prev => ({
      ...prev,
      [languageCode]: [...(prev[languageCode] || []), vocabWithId]
    }));
    
    setIsAddingVocab(false);
  };

  const handleDeleteVocabulary = (vocabId: string, languageCode: string) => {
    setVocabularyData(prev => ({
      ...prev,
      [languageCode]: prev[languageCode]?.filter(item => item.id !== vocabId) || []
    }));
  };

  const filteredVocabulary = Object.entries(vocabularyData).reduce((acc, [lang, items]) => {
    const filtered = items.filter(item => 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[lang] = filtered;
    }
    return acc;
  }, {} as typeof vocabularyData);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Settings className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold">VocabMaster Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-900 text-green-400 border-green-500">
              Admin Mode
            </Badge>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="text-red-400 border-red-600 hover:bg-red-900 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-900">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.totalVocabulary}</div>
                    <div className="text-sm text-gray-400">Total Words</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
                    <div className="text-sm text-gray-400">Total Users</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.registeredUsers}</div>
                    <div className="text-sm text-gray-400">Registered</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.newUsersToday}</div>
                    <div className="text-sm text-gray-400">New Today</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* User Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-lg font-bold text-white">{stats.languagePairs}</div>
                    <div className="text-sm text-gray-400">Language Pairs</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-orange-400" />
                  <div>
                    <div className="text-lg font-bold text-white">{stats.guestSessions}</div>
                    <div className="text-sm text-gray-400">Guest Sessions</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="text-lg font-bold text-white">{stats.totalChallenges}</div>
                    <div className="text-sm text-gray-400">Challenge Types</div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => {
                    setActiveTab('vocabulary');
                    setIsAddingVocab(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vocabulary
                </Button>
                <Button
                  onClick={() => setActiveTab('vocabulary')}
                  className="bg-green-600 hover:bg-green-500 text-white"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All Words
                </Button>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4">Vocabulary by Language</h3>
              <div className="space-y-3">
                {Object.entries(vocabularyData).map(([langCode, items]) => {
                  const lang = popularLanguagePairs.find(pair => pair.to.code === langCode);
                  return (
                    <div key={langCode} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang?.to.flag || '🌐'}</span>
                        <div>
                          <div className="font-medium">{lang?.to.name || langCode}</div>
                          <div className="text-sm text-gray-400">{items.length} words</div>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setActiveTab('vocabulary');
                          setSearchTerm('');
                        }}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Vocabulary Tab */}
          <TabsContent value="vocabulary" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Vocabulary Management</h2>
              <Button
                onClick={() => setIsAddingVocab(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Word
              </Button>
            </div>

            <div className="flex gap-4">
              <Input
                placeholder="Search vocabulary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-6">
              {Object.entries(filteredVocabulary).map(([langCode, items]) => {
                const lang = popularLanguagePairs.find(pair => pair.to.code === langCode);
                return (
                  <Card key={langCode} className="bg-gray-900 border-gray-800">
                    <div className="p-4 border-b border-gray-800">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="text-xl">{lang?.to.flag || '🌐'}</span>
                        {lang?.to.name || langCode} ({items.length} words)
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-3">
                        {items.map((vocab) => (
                          <div key={vocab.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-4">
                                <div>
                                  <div className="font-medium text-white">{vocab.word}</div>
                                  <div className="text-sm text-gray-400">{vocab.translation}</div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {vocab.category}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={
                                    vocab.difficulty === 'easy' ? 'text-green-400 border-green-400' :
                                    vocab.difficulty === 'medium' ? 'text-yellow-400 border-yellow-400' :
                                    'text-red-400 border-red-400'
                                  }
                                >
                                  {vocab.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleDeleteVocabulary(vocab.id, langCode)}
                                variant="outline"
                                size="sm"
                                className="border-red-600 text-red-400 hover:bg-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex gap-2">
                <Button
                  onClick={loadUsersFromFirestore}
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-400 hover:bg-blue-900"
                >
                  Refresh Users
                </Button>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  {stats.registeredUsers} Registered
                </Badge>
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  {stats.guestSessions} Guests
                </Badge>
              </div>
            </div>

            <div className="flex gap-4">
              <Input
                placeholder="Search users by email or name..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            {/* User Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-lg font-bold text-white">{stats.newUsersToday}</div>
                    <div className="text-sm text-gray-400">New Today</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-lg font-bold text-white">
                      {userRegistrations.filter(u => {
                        const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                        return new Date(u.createdAt) > lastWeek;
                      }).length}
                    </div>
                    <div className="text-sm text-gray-400">This Week</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-lg font-bold text-white">
                      {userRegistrations.filter(u => {
                        const today = new Date().toDateString();
                        return new Date(u.lastLogin).toDateString() === today;
                      }).length}
                    </div>
                    <div className="text-sm text-gray-400">Active Today</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="text-lg font-bold text-white">
                      {((stats.registeredUsers / Math.max(stats.totalUsers, 1)) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-400">Conversion Rate</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Users List */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold">All Users ({userRegistrations.length})</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {userRegistrations
                    .filter(user => 
                      user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                      user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
                    )
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-white flex items-center gap-2">
                              {user.name}
                              {user.isGuest ? (
                                <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
                                  Guest
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                                  Registered
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                            <div className="text-xs text-gray-500">
                              Joined: {new Date(user.createdAt).toLocaleDateString()} • 
                              Last active: {new Date(user.lastLogin).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.isGuest ? (
                            <UserX className="w-4 h-4 text-orange-400" />
                          ) : (
                            <UserCheck className="w-4 h-4 text-green-400" />
                          )}
                          <span className="text-xs text-gray-500">
                            {user.ipAddress || 'N/A'}
                          </span>
                        </div>
                      </div>
                    ))}
                  
                  {userRegistrations.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No users registered yet</p>
                      <p className="text-sm">Users will appear here as they sign up</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4">Data Management</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                  <div>
                    <div className="font-medium">Export Vocabulary</div>
                    <div className="text-sm text-gray-400">Download all vocabulary data as JSON</div>
                  </div>
                  <Button 
                    onClick={() => {
                      const dataStr = JSON.stringify(vocabularyData, null, 2);
                      const dataBlob = new Blob([dataStr], {type: 'application/json'});
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'vocabulary-data.json';
                      link.click();
                    }}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Export
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                  <div>
                    <div className="font-medium">Clear All Data</div>
                    <div className="text-sm text-gray-400">Remove all vocabulary from storage</div>
                  </div>
                  <Button 
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all data?')) {
                        setVocabularyData({});
                        localStorage.removeItem('admin-vocabulary');
                      }
                    }}
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-900"
                  >
                    Clear Data
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Vocabulary Modal */}
      {isAddingVocab && (
        <VocabularyModal
          isOpen={isAddingVocab}
          onClose={() => setIsAddingVocab(false)}
          onSave={handleAddVocabulary}
          title="Add New Vocabulary"
        />
      )}
    </div>
  );
}

// Simplified Vocabulary Modal Component
interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vocab: Omit<VocabularyItem, 'id'>, languageCode: string) => void;
  title: string;
}

function VocabularyModal({ isOpen, onClose, onSave, title }: VocabularyModalProps) {
  const [formData, setFormData] = useState({
    word: '',
    translation: '',
    category: 'basic',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    languageCode: 'es',
  });
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);

  const categories = ['basic', 'food', 'travel', 'business', 'family', 'nature', 'technology', 'sports', 'arts'];

  const handleFetchFromDictionary = async () => {
    if (!formData.word.trim()) return;
    
    setIsLoadingTranslation(true);
    try {
      const result = await fetchWordWithTranslation(formData.word, formData.languageCode);
      if (result) {
        setFormData(prev => ({
          ...prev,
          translation: result.translation
        }));
      } else {
        alert('Could not find translation for this word');
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
      alert('Error fetching translation');
    } finally {
      setIsLoadingTranslation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.word.trim() && formData.translation.trim()) {
      const { languageCode, ...vocabData } = formData;
      onSave(vocabData, languageCode);
      setFormData({
        word: '',
        translation: '',
        category: 'basic',
        difficulty: 'medium',
        languageCode: 'es',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Target Language
            </label>
            <Select value={formData.languageCode} onValueChange={(value: any) => setFormData(prev => ({ ...prev, languageCode: value }))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="es" className="text-white">🇪🇸 Spanish</SelectItem>
                <SelectItem value="fr" className="text-white">🇫🇷 French</SelectItem>
                <SelectItem value="de" className="text-white">🇩🇪 German</SelectItem>
                <SelectItem value="ja" className="text-white">🇯🇵 Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Word (English)
            </label>
            <div className="flex gap-2">
              <Input
                value={formData.word}
                onChange={(e) => setFormData(prev => ({ ...prev, word: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white flex-1"
                placeholder="Enter English word"
                required
              />
              <Button
                type="button"
                onClick={handleFetchFromDictionary}
                disabled={!formData.word.trim() || isLoadingTranslation}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoadingTranslation ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Auto-Fill'
                )}
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Translation
            </label>
            <Input
              value={formData.translation}
              onChange={(e) => setFormData(prev => ({ ...prev, translation: e.target.value }))}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Enter translation or use Auto-Fill"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white capitalize">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Difficulty
            </label>
            <Select value={formData.difficulty} onValueChange={(value: string) => setFormData(prev => ({ ...prev, difficulty: value as 'easy' | 'medium' | 'hard' }))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="easy" className="text-white">Easy</SelectItem>
                <SelectItem value="medium" className="text-white">Medium</SelectItem>
                <SelectItem value="hard" className="text-white">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
