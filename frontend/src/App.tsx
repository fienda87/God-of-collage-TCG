import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { AnimatedRoutes } from './components/layout/AnimatedRoutes';
import { ScatteredBackground } from './components/layout/ScatteredBackground';
import ClickSpark from './components/ui/ClickSpark';
import { useEnergyStore } from './store/energyStore';

function App() {
  const checkRefill = useEnergyStore((s) => s.checkRefill);

  useEffect(() => {
    // Run refill check on mount
    checkRefill();

    // Check periodically in background (every 5 seconds)
    const interval = setInterval(checkRefill, 5000);

    // Run check on focus/visibility change (tab reactivation)
    const handleReactivation = () => checkRefill();
    window.addEventListener('focus', handleReactivation);
    document.addEventListener('visibilitychange', handleReactivation);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleReactivation);
      document.removeEventListener('visibilitychange', handleReactivation);
    };
  }, [checkRefill]);

  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Router>
        <ScatteredBackground />
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 w-full relative z-10">
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </ClickSpark>
  );
}

export default App;
