import { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import DetectionWizard from './components/DetectionWizard';
import StationList from './components/StationList';
import Education from './components/Education';
import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStartScan={() => setActiveTab('scan')} />;
      case 'scan':
        return <DetectionWizard />;
      case 'map':
        return <StationList />;
      case 'info':
        return <Education />;
      default:
        return <Home onStartScan={() => setActiveTab('scan')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <main className="max-w-md mx-auto min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default App;
