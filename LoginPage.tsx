
import React, { useState } from 'react';
import { User } from '../types';
import PasswordInput from './PasswordInput';

interface LoginPageProps {
  onLogin: (username: string, password) => Promise<void>;
  onNavigateToSignup: () => void;
  isLoading: boolean;
  error: string | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignup, isLoading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-blue-950/30 border border-cyan-500/20 p-8 rounded-2xl backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
        <h2 className="text-3xl font-orbitron text-center text-cyan-400 mb-8">VAULT ACCESS</h2>
        
        {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-cyan-600 mb-2">OPERATOR ID</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter your operator ID"
              className="w-full p-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-300 placeholder-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-cyan-600 mb-2">MASTER PASSWORD</label>
            <PasswordInput
              id="password-login"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter your master password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-orbitron rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-cyan-400 hover:text-slate-900 hover:shadow-lg hover:shadow-cyan-400/30 disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoading ? 'Authorizing...' : 'Authorize Access'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-cyan-800">
          Don't have an ID?{' '}
          <button onClick={onNavigateToSignup} className="font-medium text-cyan-500 hover:text-cyan-300">
            Create Identity
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
