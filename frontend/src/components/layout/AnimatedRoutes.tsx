import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './PageTransition';
import { Home } from '../../pages/Home';
import { Gacha } from '../../pages/Gacha';
import { Collection } from '../../pages/Collection';
import { Rules } from '../../pages/Rules';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/gacha" element={<PageTransition><Gacha /></PageTransition>} />
        <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
        <Route path="/rules" element={<PageTransition><Rules /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};
