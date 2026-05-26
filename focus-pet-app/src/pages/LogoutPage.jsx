import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Błąd wylogowania:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Wróć do poprzedniej strony (zazwyczaj home/session)
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 text-white font-sans relative">
      {/* Header jak na mock-upie */}
      <div className="absolute top-0 left-0 p-8 text-primary font-bold text-xl ml-4">
        Focus Pet
      </div>

      <div className="bg-surface border border-gray-800/80 rounded-[2.5rem] p-10 max-w-[400px] w-full flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Delikatna poświata w tle dla pieska */}
        <div className="absolute top-10 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="relative mb-10 mt-4">
          <div className="w-[140px] h-[140px] rounded-full overflow-hidden border border-gray-700 shadow-[0_0_30px_rgba(109,225,181,0.15)] bg-[#0A1625]">
             <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Twój zwierzak (Mochi)" className="w-full h-full object-cover filter brightness-90 contrast-110" />
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#1A2D45] text-gray-300 text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-gray-700/80 flex items-center gap-2 shadow-lg">
            <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_rgba(109,225,181,0.8)]"></div>
            MOCHI
          </div>
        </div>

        <h1 className="text-[2rem] font-medium mb-3 text-white tracking-tight">Before you go...</h1>
        <p className="text-gray-400 text-[15px] mb-10 px-2 leading-relaxed">
          Your pet will be waiting for you.<br />
          Are you sure you want to log out?
        </p>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full py-[18px] bg-primary hover:bg-primaryHover text-[#04101E] text-[15px] font-semibold rounded-2xl transition-all mb-4 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(109,225,181,0.15)] hover:shadow-[0_0_25px_rgba(109,225,181,0.25)] hover:-translate-y-0.5 duration-200"
        >
          <LogOut className="w-[18px] h-[18px]" strokeWidth={2.5} />
          {loading ? 'Wylogowywanie...' : 'Log out'}
        </button>
        
        <button
          onClick={handleCancel}
          disabled={loading}
          className="w-full py-[18px] bg-[#132235] hover:bg-[#1a2d45] text-gray-300 hover:text-white text-[15px] font-medium rounded-2xl transition-all duration-200 border border-transparent hover:border-gray-700/50"
        >
          Stay with Focus Pet
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
