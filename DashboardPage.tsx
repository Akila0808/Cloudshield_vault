
import React, { useRef, useState, useCallback } from 'react';
import { User, StoredFile } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { FileIcon } from './icons/FileIcon';
import { TrashIcon } from './icons/TrashIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface DashboardPageProps {
  user: User;
  files: StoredFile[];
  onLogout: () => void;
  onFileUpload: (files: File[]) => void;
  onFileDelete: (raw_name: string) => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const DashboardPage: React.FC<DashboardPageProps> = ({ user, files, onLogout, onFileUpload, onFileDelete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };
  
  const handleUploadClick = () => {
    if (selectedFiles.length > 0) {
      onFileUpload(selectedFiles);
      setSelectedFiles([]);
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setSelectedFiles(Array.from(event.dataTransfer.files));
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl text-cyan-400 font-orbitron">CloudShield Vault</h1>
            <p className="text-cyan-700">Welcome, Operator {user.username}</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-6 py-2 bg-transparent border-2 border-red-500 text-red-500 font-orbitron rounded-lg uppercase tracking-widest text-sm transition-all duration-300 hover:bg-red-500 hover:text-slate-900 hover:shadow-lg hover:shadow-red-500/30"
          >
            Logout
          </button>
        </header>

        <div className="bg-blue-950/30 border-l-4 border-cyan-500 p-6 rounded-r-lg mb-8 backdrop-blur-sm">
          <h3 className="text-xl font-orbitron text-cyan-400">AGENT: {user.username}</h3>
          <p className="text-cyan-700 text-sm">
            EMAIL: {user.email} | CONTACT: {user.contact} | STATUS: {user.gender}
          </p>
        </div>

        <div onDragOver={onDragOver} onDrop={onDrop} className="border-2 border-dashed border-cyan-700/50 p-8 text-center rounded-2xl bg-slate-800/20 mb-8 transition-all duration-300 hover:border-cyan-500 hover:bg-slate-800/40">
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple className="hidden" />
          <UploadIcon className="w-16 h-16 mx-auto text-cyan-600 mb-4" />
          <p className="mb-4 text-cyan-500">Drag & Drop files or click to select payloads</p>
          {selectedFiles.length > 0 && (
            <div className="text-left text-sm text-cyan-300 mb-4 max-h-32 overflow-y-auto">
              {selectedFiles.map(f => <p key={f.name}>{f.name} ({formatBytes(f.size)})</p>)}
            </div>
          )}
          <button onClick={() => fileInputRef.current?.click()} className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-orbitron rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-cyan-400 hover:text-slate-900 hover:shadow-lg hover:shadow-cyan-400/30 mr-4">
            Select Payloads
          </button>
          <button onClick={handleUploadClick} disabled={selectedFiles.length === 0} className="px-8 py-3 bg-transparent border-2 border-blue-400 text-blue-400 font-orbitron rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-blue-400 hover:text-slate-900 hover:shadow-lg hover:shadow-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed">
            Secure Uplink
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-orbitron text-cyan-400 mb-4">VAULT CONTENTS</h2>
          <div className="space-y-3">
            {files.length > 0 ? files.map(file => (
              <div key={file.raw_name} className="flex items-center justify-between bg-slate-800/30 border border-cyan-900 p-4 rounded-lg transition-all duration-300 hover:border-cyan-700 hover:bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <FileIcon className="w-6 h-6 text-cyan-500" />
                  <div>
                    <p className="text-cyan-300 font-semibold">{file.name}</p>
                    <p className="text-xs text-cyan-700">{formatBytes(file.size)} - {file.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button title="Download" className="text-cyan-500 hover:text-cyan-300 transition-colors">
                    <DownloadIcon className="w-6 h-6" />
                  </button>
                  <button onClick={() => onFileDelete(file.raw_name)} title="Delete" className="text-red-500 hover:text-red-300 transition-colors">
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )) : (
              <p className="text-center text-cyan-700 py-8">Vault is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
