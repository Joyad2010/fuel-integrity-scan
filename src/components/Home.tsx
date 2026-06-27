import React from 'react';
import { ShieldCheck, Zap, Globe, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface HomeProps {
  onStartScan: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartScan }) => {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="relative h-[45vh] w-full overflow-hidden">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/61c90c04-cc6b-4707-add9-c568301e916c/fuel-guard-hero-93714a90-1782520104132.webp" 
          alt="Fuel Guard AI" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <Badge className="mb-2 bg-primary/20 text-primary border-primary/50 backdrop-blur-sm">Global Network Active</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">FuelGuard AI</h1>
          <p className="text-muted-foreground mt-2 max-w-[80%]">Detect adulterated petroleum products instantly using AI-powered field analysis.</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <ShieldCheck className="text-primary mb-2" size={32} />
              <h3 className="text-sm font-bold">Safe Pumping</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Verify station quality before you fill up.</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Zap className="text-primary mb-2" size={32} />
              <h3 className="text-sm font-bold">Fast Results</h3>
              <p className="text-[10px] text-muted-foreground mt-1">3-step field test for instant purity results.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Globe size={24} />
            </div>
            <div>
              <h3 className="font-bold">Community Driven</h3>
              <p className="text-xs text-muted-foreground">1.2M+ verified fuel samples worldwide.</p>
            </div>
          </div>
          <Button onClick={onStartScan} className="w-full py-6 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
            Start Purity Test
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold flex items-center gap-2">
            <AlertTriangle size={18} className="text-yellow-500" /> Recent Alerts
          </h3>
          <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 flex gap-3">
            <div className="shrink-0 w-2 h-2 rounded-full bg-destructive mt-1.5 animate-pulse"></div>
            <p className="text-xs">High adulteration risk reported in <span className="font-bold">Central District</span>. Check the map for suspicious stations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Badge } from './ui/badge';
export default Home;
