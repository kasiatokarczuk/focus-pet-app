import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/home');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Nieprawidłowy email lub hasło.');
      } else {
        setError('Nie udało się zalogować. Spróbuj ponownie.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-white font-sans bg-background">
      {/* Lewa strona - Obraz i tekst (widoczne tylko na większych ekranach) */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface p-12 flex-col justify-center items-center relative overflow-hidden">
        {/* Glow effect w tle */}
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="max-w-md w-full relative z-10">
          <div className="w-80 h-80 mx-auto mb-16 rounded-full overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(109,225,181,0.1)]">
             <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Focus Cat" className="w-full h-full object-cover filter brightness-90 contrast-110" />
          </div>
          <div className="px-4">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">Deep Work Sanctuary</p>
            <h2 className="text-4xl font-medium text-gray-200 leading-[1.3] tracking-tight">
              Designed for cosmic flow<br />and quiet productivity.
            </h2>
          </div>
        </div>
      </div>

      {/* Prawa strona - Formularz logowania */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative z-10">
        <div className="w-full max-w-[420px]">
          {/* Logo i nagłówek (mobilnie) */}
          <div className="mb-12 lg:hidden text-primary font-bold text-xl">Focus Pet</div>
          
          <h1 className="text-[2.5rem] font-medium mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 mb-10 text-[15px]">Re-enter your focus chamber.</p>

          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Mail className="h-[18px] w-[18px] text-gray-500 group-focus-within:text-primary" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-[46px] pr-4 py-4 bg-[#0A1625] border border-gray-800/50 rounded-2xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-[15px]"
                  placeholder="cosmic@focuspet.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase">Password</label>
                <a href="#" className="text-[11px] font-bold text-primary hover:text-primaryHover transition-colors tracking-wider uppercase">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-[18px] w-[18px] text-gray-500 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-[46px] pr-12 py-4 bg-[#0A1625] border border-gray-800/50 rounded-2xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-[15px] tracking-widest"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[18px] px-4 bg-primary hover:bg-primaryHover text-[#04101E] text-[15px] font-semibold rounded-2xl transition-all flex justify-center items-center mt-8 disabled:opacity-70 shadow-[0_0_20px_rgba(109,225,181,0.2)] hover:shadow-[0_0_25px_rgba(109,225,181,0.3)] hover:-translate-y-0.5 duration-200"
            >
              {loading ? 'Logging in...' : 'Login to Focus Pet'}
              {!loading && <span className="ml-2 font-light">→</span>}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800/60"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-[11px] font-bold text-gray-500 tracking-wider uppercase">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="flex justify-center items-center py-3.5 bg-[#0A1625] hover:bg-[#0f1f33] border border-gray-800/50 rounded-2xl transition-all text-[14px] font-medium">
                Google
              </button>
              <button className="flex justify-center items-center py-3.5 bg-[#0A1625] hover:bg-[#0f1f33] border border-gray-800/50 rounded-2xl transition-all text-[14px] font-medium">
                Apple
              </button>
            </div>
            
            <p className="mt-8 text-center text-[14px] text-gray-400">
              Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline ml-1">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Header na duzych ekranach */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center pointer-events-none hidden lg:flex">
        <div className="text-primary font-bold text-xl pointer-events-auto ml-4">Focus Pet</div>
        <div className="flex items-center gap-8 text-[14px] font-medium pointer-events-auto mr-4">
          <button className="text-gray-400 hover:text-white transition-colors">Support</button>
          <Link to="/register" className="bg-primary hover:bg-primaryHover text-[#04101E] px-6 py-2.5 rounded-full transition-colors shadow-sm font-semibold">Create Account</Link>
        </div>
      </div>
      
      {/* Footer na duzych ekranach */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-center text-[11px] text-gray-600 font-medium hidden lg:flex pointer-events-none tracking-wider">
        <div className="ml-4 uppercase">© 2024 FOCUS PET. FIND YOUR COSMIC FLOW.</div>
        <div className="flex gap-8 pointer-events-auto mr-4">
          <a href="#" className="hover:text-gray-400 transition-colors">PRIVACY POLICY</a>
          <a href="#" className="hover:text-gray-400 transition-colors">TERMS OF SERVICE</a>
          <a href="#" className="hover:text-gray-400 transition-colors">COOKIE SETTINGS</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
