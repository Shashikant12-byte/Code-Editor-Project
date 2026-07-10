import React, { useState, useContext } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  RefreshCw,
  Code2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { data } from '../context/userContext';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate=useNavigate()
  let {serverUrl,getUserdata} = useContext(data);

  function goToSingup(){
    navigate('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Form Validation
    if (!email) {
      setError('Please provide your registered email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid developer email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 6) {
      setError('Security constraint: Passwords must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
        let data= await axios.post(`${serverUrl}/auth/login`, {
                email,
                password
        },{withCredentials:true});
        
        setIsSuccess(true);
        await getUserdata();
        setTimeout(() => {
          navigate("/");
        },2000);

        setIsLoading(false);
      } catch (err) {
        setError('Error creating developer session profile.');
        setIsLoading(false);
      }
  };

   
    
      
        

  return (
    <div className="bg-slate-950 text-slate-100 min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-md w-full space-y-8 relative">
       
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 hover:text-indigo-400 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Homepage
        </button>

        
        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 mb-4">
              <Code2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">Welcome Back</h2>
            <p className="text-slate-500 text-xs mt-1.5 font-mono">
              Initialize your secure cloud developer environment.
            </p>
          </div>

          
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-400 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 animate-bounce">
                <Check className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-emerald-400">Authentication successful!</p>
              <p className="text-xs text-slate-500 font-mono">Synchronizing workspace preferences...</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider" htmlFor="email-address">
                  Developer Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all font-mono"
                  />
                </div>
              </div>

              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <button 
                    type="button"
                    onClick={() => {
                      alert("Tip: If you've registered a new user, input those credentials. Otherwise, try email: 'demo@codecraft.com' with password: 'password123'.");
                    }}
                    className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 bg-slate-950 w-4 h-4 accent-indigo-500"
                  />
                  <span className="text-xs text-slate-400">Remember session context</span>
                </label>
              </div>

             
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-sm font-semibold text-white shadow-lg shadow-indigo-950/20 transition-all focus:outline-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Authenticating credentials...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                    Sign In to Workspace
                  </>
                )}
              </button>
            </form>
          )}

          
          {!isSuccess && (
            <div className="mt-6">
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-800 w-full absolute"></div>
                <span className="bg-slate-900/95 px-3 text-[10px] text-slate-500 font-mono uppercase tracking-wider relative z-10">
                  Or initialize via OAuth
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('GitHub')}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold font-mono transition-all cursor-pointer"
                >
                 
                  GitHub
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold font-mono transition-all cursor-pointer"
                >
                 
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
              </div>
            </div>
          )}
        </div>

       
        {!isSuccess && (
          <p className="text-center text-sm text-slate-500">
            New to CodeCraft?{' '}
            <button
              onClick={goToSingup}
              className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline focus:outline-none cursor-pointer"
            >
              Create a free profile
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;