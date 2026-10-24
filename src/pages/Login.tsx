import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, getActiveUser, setActiveUser, type UserAccount } from '../data/auth';

const Login = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
  const [isLogin, setIsLogin] = useState(false); // Default to registration so clients can create account first
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const active = getActiveUser();
    if (active) {
      setCurrentUser(active);
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!email) return;

    if (!isLogin) {
      // Create Account (Sign Up)
      const res = registerUser({
        firstName: firstName || 'Valued',
        lastName: lastName || 'Client',
        email,
        password
      });

      if (!res.success) {
        setNotification({ type: 'error', text: res.message });
        return;
      }

      setIsLoggedIn(true);
      setCurrentUser(res.user || null);
      setNotification({ type: 'success', text: `Welcome to Maison ÉPURE, ${res.user?.firstName}!` });
      setTimeout(() => {
        navigate('/cart');
      }, 1500);
    } else {
      // Sign In
      const res = loginUser(email, password);
      setIsLoggedIn(true);
      setCurrentUser(res.user || null);
      setNotification({ type: 'success', text: `Signed in as ${res.user?.firstName || res.user?.email}` });
      setTimeout(() => {
        navigate('/cart');
      }, 1200);
    }
  };

  const handleLogout = () => {
    setActiveUser(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setNotification({ type: 'success', text: 'You have been signed out.' });
  };

  // If already logged in: Display a luxury Account profile dashboard
  if (currentUser) {
    return (
      <div className="px-4 py-12 md:py-20 max-w-lg mx-auto min-h-[70vh]">
        <div className="bg-white p-8 rounded-sm border border-[#ede5db] shadow-sm">
          <div className="flex items-center gap-4 pb-6 border-b border-[#ede5db] mb-6">
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-['Cormorant_Garamond'] text-2xl font-bold">
              {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#8b7355] block">
                VIP Client Profile
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#1a1a1a]">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-xs text-gray-500">{currentUser.email}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8 text-xs text-gray-600">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Client ID</span>
              <span className="font-mono text-gray-800">{currentUser.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Member Since</span>
              <span className="text-gray-800">{currentUser.createdAt}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Perks</span>
              <span className="text-[#8b7355] font-semibold">Complimentary US FedEx Express</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => navigate('/cart')}
              className="w-full bg-[#1a1a1a] text-white py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors"
            >
              Continue to Shopping Bag
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#ede5db] text-[#1a1a1a] py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#d5cdc3] transition-colors"
            >
              Browse The Wardrobe
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-center text-xs text-red-600 hover:underline pt-2 font-medium"
            >
              Sign Out of Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 md:py-20 max-w-md mx-auto min-h-[70vh] flex flex-col justify-center">
      <div className="text-center mb-8">
        <h1 className="font-['Cormorant_Garamond'] text-4xl mb-2">
          {isLogin ? 'Sign In to Your Account' : 'Create Your ÉPURE Account'}
        </h1>
        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
          {isLogin 
            ? 'Access your saved pieces, expedited FedEx shipping, and orders.' 
            : 'Register your profile to complete your order and unlock tailored atelier service.'}
        </p>
      </div>

      {notification && (
        <div className={`mb-6 p-3.5 rounded-sm text-xs font-medium ${
          notification.type === 'success' 
            ? 'bg-[#ede5db] text-[#1a1a1a] border border-[#c4b5a4]' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {notification.text}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                First Name *
              </label>
              <input 
                type="text" 
                required 
                placeholder="Eleanor"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full bg-white border border-[#ede5db] focus:border-[#1a1a1a] rounded-sm px-3.5 py-3 text-xs outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                Last Name *
              </label>
              <input 
                type="text" 
                required 
                placeholder="Vane"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full bg-white border border-[#ede5db] focus:border-[#1a1a1a] rounded-sm px-3.5 py-3 text-xs outline-none transition-colors" 
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
            Email Address *
          </label>
          <input 
            type="email" 
            required 
            placeholder="eleanor@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-white border border-[#ede5db] focus:border-[#1a1a1a] rounded-sm px-3.5 py-3 text-xs outline-none transition-colors" 
          />
        </div>

        <div>
          <div className="flex justify-between items-end mb-1">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500">
              Password *
            </label>
            {isLogin && (
              <a href="#" onClick={(e) => { e.preventDefault(); alert("A password reset link has been sent to your email."); }} className="text-[10px] text-gray-400 hover:text-[#1a1a1a] transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          <input 
            type="password" 
            required 
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-white border border-[#ede5db] focus:border-[#1a1a1a] rounded-sm px-3.5 py-3 text-xs outline-none transition-colors" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm mt-3 hover:bg-black transition-colors"
        >
          {isLogin ? 'Sign In' : 'Create My Account'}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-[#ede5db] pt-6">
        <p className="text-xs text-gray-500 mb-2">
          {isLogin ? 'New to Maison ÉPURE?' : 'Already have an existing account?'}
        </p>
        <button 
          type="button" 
          onClick={() => {
            setIsLogin(!isLogin);
            setNotification(null);
          }} 
          className="text-[10px] font-bold tracking-widest uppercase border-b border-[#1a1a1a] pb-0.5 inline-flex hover:text-[#8b7355] hover:border-[#8b7355] transition-colors"
        >
          {isLogin ? 'Create an Account' : 'Sign In Instead'}
        </button>
      </div>
    </div>
  );
};

export default Login;
