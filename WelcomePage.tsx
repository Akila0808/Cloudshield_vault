
import React from 'react';

interface WelcomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

const FeatureCard: React.FC<{ title: string; subtitle: string; delay?: string }> = ({ title, subtitle, delay }) => (
  <div
    className="bg-blue-950/30 border border-cyan-500/20 p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:bg-blue-950/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
    style={{ animationDelay: delay }}
  >
    <div className="text-2xl font-orbitron text-cyan-400">{title}</div>
    <div className="text-cyan-700 mt-2">{subtitle}</div>
  </div>
);

const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigateToLogin, onNavigateToSignup }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <header className="mb-12">
        <h1 className="text-6xl md:text-8xl font-bold text-cyan-400 tracking-widest">
          CLOUDSHIELD
        </h1>
        <p className="text-cyan-800 tracking-[0.5em] mt-2">SECURE DATA CUSTODIAN</p>
      </header>
      
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
        <FeatureCard title="CRYPTOGRAPHIC" subtitle="Active vault-level security" />
        <FeatureCard title="NEURAL TOKEN" subtitle="Two-step identity protection" delay="0.2s" />
        <FeatureCard title="10GB STORAGE" subtitle="Persistent cloud vault space" delay="0.4s" />
        <FeatureCard title="QUANTUM SPEED" subtitle="Max speed data transfer" delay="0.6s" />
      </main>

      <footer className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={onNavigateToLogin}
          className="px-12 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-orbitron rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-cyan-400 hover:text-slate-900 hover:shadow-lg hover:shadow-cyan-400/30"
        >
          Access Vault
        </button>
        <button
          onClick={onNavigateToSignup}
          className="px-12 py-4 bg-transparent border-2 border-blue-400 text-blue-400 font-orbitron rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-blue-400 hover:text-slate-900 hover:shadow-lg hover:shadow-blue-400/30"
        >
          Identity Setup
        </button>
      </footer>
    </div>
  );
};

export default WelcomePage;
