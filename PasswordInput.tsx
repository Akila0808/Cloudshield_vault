
import React, { useState } from 'react';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="w-full pl-3 pr-10 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-300 placeholder-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-cyan-500 hover:text-cyan-300"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default PasswordInput;
