import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For testing, just navigate home
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        className="w-full max-w-[400px] bg-white rounded-[13px] p-8"
        style={{ boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 2px inset' }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <h1 className="text-[40px] text-black font-[800] leading-[1.07] m-0 mb-6">DAFTAR.</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[14px] font-[800] text-black block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 rounded-[38px] text-[16px] font-[400] text-black bg-white border-none outline-none"
              style={{ boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 2px inset' }}
              placeholder="namakamu"
            />
          </div>
          <div>
            <label className="text-[14px] font-[800] text-black block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-[38px] text-[16px] font-[400] text-black bg-white border-none outline-none"
              style={{ boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 2px inset' }}
              placeholder="kamu@email.com"
            />
          </div>
          <div>
            <label className="text-[14px] font-[800] text-black block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-[38px] text-[16px] font-[400] text-black bg-white border-none outline-none"
              style={{ boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 2px inset' }}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-[14px] font-[800] text-black block mb-2">Konfirmasi Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-[38px] text-[16px] font-[400] text-black bg-white border-none outline-none"
              style={{ boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 2px inset' }}
              placeholder="••••••••"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 rounded-[38px] text-[16px] font-[800] text-white cursor-pointer border-none mt-4"
            style={{ backgroundColor: '#000000' }}
            whileHover={{ backgroundColor: '#333333' }}
            whileTap={{ scale: 0.95 }}
          >
            DAFTAR
          </motion.button>
        </form>

        <p className="text-[14px] font-[400] text-black/60 text-center mt-6 m-0">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-[#7333f1] font-[800] no-underline hover:underline">Masuk</Link>
        </p>
      </motion.div>
    </div>
  );
};
