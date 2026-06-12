import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { AnimatedRoutes } from './components/layout/AnimatedRoutes';
import { ScatteredBackground } from './components/layout/ScatteredBackground';
import ClickSpark from './components/ui/ClickSpark';

function App() {
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
