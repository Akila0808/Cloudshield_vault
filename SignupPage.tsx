
import React, { useState } from 'react';
import { User } from '../types';
import PasswordInput from './PasswordInput';

interface SignupPageProps {
  onSignup: (newUser: Omit<User, 'gender'>) => Promise<boolean>;
  onNavigateToLogin: () => void;
  isLoading: boolean;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigateToLogin, isLoading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    const success = await onSignup({
      username,
      password,
      email,
      contact,
    });
    if (success) {
      setUsername('');
      setEmail('');
      setContact('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-blue-950/30 border border-blue-500/20 p-8 rounded-2xl backdrop-blur-sm shadow-2xl shadow-blue-500/10">
        <h2 className="text-3xl font-orbitron text-center text-blue-400 mb-8">IDENTITY SETUP</h2>
        {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="OPERATOR ID" disabled={isLoading} className="w-full p-3 bg-slate-800/50 border border-blue-500/30 rounded-lg text-blue-300 placeholder-blue-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition disabled:opacity-50" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="EMAIL" disabled={isLoading} className="w-full p-3 bg-slate-800/50 border border-blue-500/30 rounded-lg text-blue-300 placeholder-blue-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition disabled:opacity-50" />
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required placeholder="CONTACT" disabled={isLoading} className="w-full p-3 bg-slate-800/50 border border-blue-500/30 rounded-lg text-blue-300 placeholder-blue-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition disabled:opacity-50" />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="MASTER PASSWORD" disabled={isLoading} />
          <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="CONFIRM MASTER PASSWORD" disabled={isLoading} />
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 bg-transparent border-2 border-blue-400 text-blue-400 font-orbitron rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-blue-400 hover:text-slate-900 hover:shadow-lg hover:shadow-blue-400/30 disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoading ? 'Registering...' : 'Register Identity'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-blue-800">
          Already have an ID?{' '}
          <button onClick={onNavigateToLogin} className="font-medium text-blue-500 hover:text-blue-300">
            Access Vault
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
