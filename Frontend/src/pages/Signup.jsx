import React, { useState, useEffect, useContext } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  ArrowLeft,
  RefreshCw,
  Code2,
  AlertCircle,
  Shield,
  CheckCircle2
} from 'lucide-react';

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { data } from '../context/userContext';


function Signup() {

  const navigate = useNavigate();
  let { serverUrl } = useContext(data);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Custom interactive selectors
  const [favLanguage, setFavLanguage] = useState('typescript');
  const [experienceLevel, setExperienceLevel] = useState('mid-level');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Dynamic Password Validation Checklist
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    hasNumber: false,
    hasUpper: false
  });

  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasUpper: /[A-Z]/.test(password)
    });
  }, [password]);

  // Dynamic Password Strength Meter
  const getPasswordStrength = () => {
    let score = 0;
    if (passwordCriteria.length) score++;
    if (passwordCriteria.hasNumber) score++;
    if (passwordCriteria.hasUpper) score++;

    if (password.length === 0) return { label: 'Empty', color: 'bg-slate-800', width: 'w-0', textColor: 'text-slate-500' };
    if (score === 1) return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/3', textColor: 'text-rose-400' };
    if (score === 2) return { label: 'Medium', color: 'bg-amber-500', width: 'w-2/3', textColor: 'text-amber-400' };
    return { label: 'Strong Sec', color: 'bg-emerald-500', width: 'w-full', textColor: 'text-emerald-400' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Form Field Validations
    if (!username.trim()) {
      setError('Please provide a unique developer username.');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid developer email address.');
      return;
    }
    if (!password) {
      setError('Password security field is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must satisfy the minimum length criterion of 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords you entered do not match. Please verify your typing.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the CodeCraft Developer License Agreement.');
      return;
    }

    setIsLoading(true);

    // Save registration securely inside local storage so they can log in
    try {
      let data = await axios.post(`${serverUrl}/auth/signup`, {
        username,
        email,
        password
      }, { withCredentials: true });

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/room");
      }, 4000);

      setIsLoading(false);

    } catch (err) {
      setError('Error creating developer session profile.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-lg w-full space-y-6 relative">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 hover:text-indigo-400 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Homepage
        </button>

        {/* Card Container */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

          {/* Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 mb-3">
              <Code2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">Create Developer Profile</h2>
            <p className="text-slate-500 text-xs mt-1 font-mono">
              Initialize a permanent workspace across your devices.
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-400 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-emerald-400">Profile Created Successfully!</p>
              <p className="text-xs text-slate-500 font-mono">Provisioning clean virtual workspaces...</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Username */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="coder_42"
                      className="block w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dev@domain.com"
                      className="block w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password Input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Password Criteria & Strength Bar (Renders if user started typing) */}
              {password.length > 0 && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-500">Password Strength:</span>
                    <span className={`${strength.textColor} font-semibold uppercase`}>{strength.label}</span>
                  </div>

                  {/* Progress Bar background */}
                  <div className="h-1 bg-slate-850 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}></div>
                  </div>

                  {/* Requirements grid */}
                  <div className="grid grid-cols-3 gap-1 pt-1 text-[9px] font-mono text-slate-500">
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full flex items-center justify-center ${passwordCriteria.length ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900'}`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>6+ chars</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full flex items-center justify-center ${passwordCriteria.hasNumber ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900'}`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>1+ Number</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full flex items-center justify-center ${passwordCriteria.hasUpper ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900'}`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>1+ Upper</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences: Language and Experience */}
              <div className="space-y-3 pt-2 border-t border-slate-900">
                {/* Language Select badges */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Primary Programming Language
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'typescript', label: 'TypeScript', color: 'border-blue-500/20 hover:border-blue-400/50 text-blue-400' },
                      { id: 'python', label: 'Python', color: 'border-yellow-500/20 hover:border-yellow-400/50 text-yellow-400' },
                      { id: 'javascript', label: 'JavaScript', color: 'border-amber-500/20 hover:border-amber-400/50 text-amber-400' }
                    ].map(lang => (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => setFavLanguage(lang.id)}
                        className={`py-1.5 px-3 rounded-xl border text-[11px] font-mono transition-all text-center cursor-pointer ${favLanguage === lang.id
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : `bg-slate-950 text-slate-400 ${lang.color}`
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Select */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['junior', 'mid-level', 'senior'].map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setExperienceLevel(lvl)}
                        className={`py-1.5 px-3 rounded-xl border border-slate-800 text-[10px] font-mono uppercase tracking-wider transition-all text-center cursor-pointer ${experienceLevel === lvl
                            ? 'bg-slate-100 border-white text-slate-950 font-bold'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                          }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agree terms and license agreement checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 bg-slate-950 w-4 h-4 accent-indigo-500 mt-0.5 cursor-pointer"
                />
                <label htmlFor="agree-terms" className="text-xs text-slate-400 cursor-pointer select-none leading-relaxed">
                  I agree to the <span className="text-indigo-400 hover:underline">Developer License Terms</span> and consent to caching workspace files on local compile runtimes.
                </label>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-sm font-semibold text-white shadow-lg shadow-indigo-950/20 transition-all focus:outline-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Registering developer keys...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                    Initialize Free Environment
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Navigation prompt to Login page */}
        {!isSuccess && (
          <p className="text-center text-sm text-slate-500">
            Already registered?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline focus:outline-none cursor-pointer"
            >
              Sign In to your workspace
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
