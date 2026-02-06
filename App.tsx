
import React, { useState, useCallback } from 'react';
import { User, AuthStatus, StoredFile } from './types';
import { signupUser, loginUser } from './apiService';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import MfaPage from './components/MfaPage';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.LoggedOut);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  // File state remains local for now. Can be connected to backend next.
  const [files, setFiles] = useState<Record<string, StoredFile[]>>({
    "cyber_ninja": [
        { name: 'project_alpha.zip', type: 'application/zip', size: 1024 * 128, raw_name: 'encrypted_project_alpha.zip' },
        { name: 'secure_notes.txt', type: 'text/plain', size: 1024 * 2, raw_name: 'encrypted_secure_notes.txt' },
    ]
  });
  const [view, setView] = useState<'welcome' | 'login' | 'signup'>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async (username: string, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await loginUser(username, password);
      // In a real app, the API would return user details. We'll simulate it.
      setActiveUser(user);
      setAuthStatus(AuthStatus.AwaitingMfa);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMfaSuccess = useCallback(() => {
    setAuthStatus(AuthStatus.LoggedIn);
  }, []);

  const handleSignup = useCallback(async (newUser: Omit<User, 'gender'>) => {
    setIsLoading(true);
    setError(null);
    try {
      await signupUser(newUser);
      alert('Identity Setup Complete. Proceed to Access Vault.');
      setView('login');
      return true;
    } catch (err: any) {
      setError(err.message);
      // We can also display this error on the signup form itself.
      alert(`Identity Conflict: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleLogout = useCallback(() => {
    setActiveUser(null);
    setAuthStatus(AuthStatus.LoggedOut);
    setView('welcome');
  }, []);
  
  const handleFileUpload = useCallback((newFiles: File[]) => {
      if (!activeUser) return;
      const newStoredFiles: StoredFile[] = newFiles.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
          raw_name: `encrypted_${Date.now()}_${file.name}`
      }));
      setFiles(prev => ({
          ...prev,
          [activeUser.username]: [...(prev[activeUser.username] || []), ...newStoredFiles]
      }));

  }, [activeUser]);

  const handleFileDelete = useCallback((raw_name: string) => {
      if (!activeUser) return;
      setFiles(prev => ({
          ...prev,
          [activeUser.username]: prev[activeUser.username].filter(f => f.raw_name !== raw_name)
      }));
  }, [activeUser]);


  const renderContent = () => {
    if (authStatus === AuthStatus.LoggedIn && activeUser) {
      return <DashboardPage user={activeUser} files={files[activeUser.username] || []} onLogout={handleLogout} onFileUpload={handleFileUpload} onFileDelete={handleFileDelete} />;
    }
    if (authStatus === AuthStatus.AwaitingMfa && activeUser) {
      return <MfaPage username={activeUser.username} onMfaSuccess={handleMfaSuccess} />;
    }

    switch (view) {
        case 'login':
            return <LoginPage onLogin={handleLogin} onNavigateToSignup={() => setView('signup')} isLoading={isLoading} error={error} />;
        case 'signup':
            return <SignupPage onSignup={handleSignup} onNavigateToLogin={() => setView('login')} isLoading={isLoading} />;
        case 'welcome':
        default:
            return <WelcomePage onNavigateToLogin={() => setView('login')} onNavigateToSignup={() => setView('signup')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-grid-cyan-500/[0.05]">
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900">
            {renderContent()}
        </div>
    </div>
  );
};

export default App;
