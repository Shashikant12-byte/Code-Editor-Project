
import React, { useState,useContext } from 'react';
import { Code2, LogIn, UserPlus, LogOut, Terminal, Sparkles, User, HelpCircle, Menu, X } from 'lucide-react';
import { data } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Navbar({ currentPage, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let { serverUrl,currentUser, setCurrentUser } = useContext(data);
  let navigate = useNavigate();

  const handleLogout= async()=>{
      await axios.post(`${serverUrl}/auth/logout`,{}, {withCredentials:true});
      setCurrentUser(null);
  }


  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-900/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-all group-hover:scale-105" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent group-hover:to-indigo-300 transition-all">
                CodeCraft
              </span>
            </button>

            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === 'home' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Features
              </button>
              <a 
                href="#editor-preview" 
                className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    setCurrentPage('home');
                    
                    setTimeout(() => {
                      document.getElementById('editor-preview')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
              >
                Interactive Playpen
              </a>
              <a 
                href="#faq" 
                className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    setCurrentPage('home');
                    setTimeout(() => {
                      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
              >
                About
              </a>
            </div>
          </div>

          
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                {/* Logged in User Profile badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                    <User className="w-3 h-3 text-indigo-300" />
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-300 font-bold text-white">
                    {currentUser.username}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 rounded-lg transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                    currentPage === 'login' 
                      ? 'bg-slate-900 text-indigo-400 border border-slate-800' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>

                <button
                  onClick={() => navigate('/signup')}
                  className="relative group overflow-hidden px-4 py-1.5 rounded-lg text-sm font-semibold text-white shadow-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 hover:shadow-indigo-500/20 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4" />
                    <span>Get Started</span>
                  </div>
                </button>
              </>
            )}
          </div>

          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

     
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-900 bg-slate-950 px-4 pt-2 pb-4 space-y-2">
          <button 
            onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentPage === 'home' ? 'text-indigo-400 bg-slate-900' : 'text-slate-300 hover:bg-slate-900'}`}
          >
            Home / Features
          </button>
          <a 
            href="#editor-preview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-900"
          >
            Interactive Playpen
          </a>
          <a 
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-900"
          >
            FAQ & Contact
          </a>

          <div className="pt-4 border-t border-slate-900 space-y-2">
            {currentUser ? (
              <div className="space-y-3 px-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-indigo-300" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">{currentUser.username}</div>
                    <div className="text-xs text-slate-500">{currentUser.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-rose-400 bg-rose-950/10 border border-rose-900/30 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-1">
                <button
                  onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-900 rounded-lg hover:text-white"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                <button
                  onClick={() => { setCurrentPage('register'); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
