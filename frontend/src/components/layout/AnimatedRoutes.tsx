import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './PageTransition';

const lazyWithRetry = (componentImport: () => Promise<any>) => {
  return React.lazy(async () => {
    const pageHasReloaded = sessionStorage.getItem('page-reload-chunk-error');
    try {
      const component = await componentImport();
      sessionStorage.removeItem('page-reload-chunk-error');
      return component;
    } catch (error) {
      if (!pageHasReloaded) {
        sessionStorage.setItem('page-reload-chunk-error', 'true');
        window.location.reload();
      }
      throw error;
    }
  });
};

const Home = lazyWithRetry(() => import('../../pages/Home').then(m => ({ default: m.Home })));
const Gacha = lazyWithRetry(() => import('../../pages/Gacha').then(m => ({ default: m.Gacha })));
const Collection = lazyWithRetry(() => import('../../pages/Collection').then(m => ({ default: m.Collection })));
const Rules = lazyWithRetry(() => import('../../pages/Rules').then(m => ({ default: m.Rules })));
const Login = lazyWithRetry(() => import('../../pages/Login').then(m => ({ default: m.Login })));
const Register = lazyWithRetry(() => import('../../pages/Register').then(m => ({ default: m.Register })));
const BindersPage = lazyWithRetry(() => import('../../pages/Binders/BindersPage').then(m => ({ default: m.BindersPage })));
const BinderDetailPage = lazyWithRetry(() => import('../../pages/Binders/BinderDetailPage').then(m => ({ default: m.BinderDetailPage })));
const BattlePage = lazyWithRetry(() => import('../../battle/BattlePage').then(m => ({ default: m.BattlePage })));

const DeckBuilderPage = lazyWithRetry(() => import('../../pages/DeckBuilderPage').then(m => ({ default: m.DeckBuilderPage })));

const LoadingFallback = () => (
  <div className="w-full h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-white/20 border-t-[#d7b73b] rounded-full animate-spin" />
  </div>
);

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/gacha" element={<PageTransition><Gacha /></PageTransition>} />
          <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
          <Route path="/rules" element={<PageTransition><Rules /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/binders" element={<PageTransition><BindersPage /></PageTransition>} />
          <Route path="/binders/:binderId" element={<PageTransition><BinderDetailPage /></PageTransition>} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/battle/deck-builder" element={<DeckBuilderPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};
