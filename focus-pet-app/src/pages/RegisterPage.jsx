import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await register(email, password);
      navigate('/onboarding');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Konto z tym adresem email już istnieje.');
      } else if (err.code === 'auth/weak-password') {
        setError('Hasło musi mieć co najmniej 6 znaków.');
      } else {
        setError('Nie udało się utworzyć konta. Spróbuj ponownie.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 text-white font-sans relative overflow-hidden">
      {/* Delikatna poświata w tle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[400px] relative z-10 flex flex-col items-center">
        
        {/* Placeholder dla pety (Egg) */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-10 shadow-[0_0_30px_rgba(109,225,181,0.15)] bg-surface border border-gray-800 flex items-center justify-center relative">
           {/* Mały blask pod jajkiem */}
           <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
           <img src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Mysterious Egg" className="w-14 h-14 object-cover rounded-full filter contrast-125 brightness-110 hue-rotate-[200deg] drop-shadow-2xl relative z-10" />
        </div>

        <h1 className="text-[2.5rem] font-medium mb-3 text-center tracking-tight leading-none">Join the Sanctuary</h1>
        <p className="text-gray-400 text-center mb-10 text-[15px] max-w-[320px] leading-relaxed">
          Create an account to start your focus journey with your new pet.
        </p>

        {error && <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full px-[18px] py-[15px] bg-[#0A1625] border border-gray-800/50 rounded-2xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-[15px]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-[18px] py-[15px] bg-[#0A1625] border border-gray-800/50 rounded-2xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-[15px]"
              placeholder="email@sanctuary.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">Create Password</label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-[18px] pr-12 py-[15px] bg-[#0A1625] border border-gray-800/50 rounded-2xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-[15px] tracking-widest"
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
            className="w-full py-[18px] px-4 bg-primary hover:bg-primaryHover text-[#04101E] text-[15px] font-semibold rounded-2xl transition-all mt-6 disabled:opacity-70 shadow-[0_0_20px_rgba(109,225,181,0.2)] hover:shadow-[0_0_25px_rgba(109,225,181,0.3)] hover:-translate-y-0.5 duration-200"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-10 w-full">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800/60"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-[11px] font-bold text-gray-500 tracking-wider uppercase">Or join with</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            <button className="flex justify-center items-center py-3.5 bg-[#0A1625] hover:bg-[#0f1f33] border border-gray-800/50 rounded-2xl transition-all text-[14px] font-medium">
              Google
            </button>
            <button className="flex justify-center items-center py-3.5 bg-[#0A1625] hover:bg-[#0f1f33] border border-gray-800/50 rounded-2xl transition-all text-[14px] font-medium">
              Apple
            </button>
          </div>
          
          <p className="mt-10 text-center text-[14px] text-gray-400">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline ml-1">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
