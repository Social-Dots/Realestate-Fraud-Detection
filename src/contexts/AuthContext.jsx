import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('propertyGuardUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('propertyGuardUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - in real app, this would call an API
    const mockUsers = [
      { email: 'demo@propertyguard.ca', password: 'demo123', name: 'Demo User' },
      { email: 'user@example.com', password: 'password123', name: 'Test User' }
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userData = {
        email: user.email,
        name: user.name,
        id: Date.now().toString(),
        loginDate: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('propertyGuardUser', JSON.stringify(userData));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (name, email, password) => {
    // Mock registration - in real app, this would call an API
    const userData = {
      email,
      name,
      id: Date.now().toString(),
      loginDate: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('propertyGuardUser', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('propertyGuardUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};