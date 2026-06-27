import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  Wind,
  Search,
  Camera,
  RotateCcw
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

type Step = 'fuel-type' | 'visual' | 'physics' | 'result';

interface TestData {
  fuelType: string;
  color: string;
  clarity: string;
  residue: string;
  density: string;
}

const fuelTypes = [
  { id: 'petrol', label: 'Petrol (Gasoline)', icon: Flame, color: 'text-orange-500' },
  { id: 'diesel', label: 'Diesel', icon: Droplets, color: 'text-yellow-600' },
  { id: 'cng', label: 'CNG', icon: Wind, color: 'text-blue-500' },
  { id: 'lng', label: 'LNG', icon: FlaskConical, color: 'text-cyan-500' },
];

const DetectionWizard: React.FC = () => {
  const [step, setStep] = useState<Step>('fuel-type');
  const [data, setData] = useState<TestData>({
    fuelType: '',
    color: '',
    clarity: '',
    residue: '',
    density: '',
  });

  const updateData = (fields: Partial<TestData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    if (step === 'fuel-type') setStep('visual');
    else if (step === 'visual') setStep('physics');
    else if (step === 'physics') setStep('result');
  };

  const prevStep = () => {
    if (step === 'visual') setStep('fuel-type');
    else if (step === 'physics') setStep('visual');
    else if (step === 'result') setStep('fuel-type');
  };

  const calculateResult = () => {
    // Simple mock logic for adulteration detection
    if (data.clarity === 'cloudy' || data.residue === 'oily' || data.density === 'low') {
      return {
        status: 'suspicious',
        message: 'Potential Adulteration Detected',
        score: 35,
        details: 'The visual clarity and residue tests indicate non-standard chemical markers.',
        color: 'text-destructive',
      };
    }
    return {
      status: 'pure',
      message: 'Quality Appears Optimal',
      score: 98,
      details: 'Based on your visual and manual inputs, this fuel meets standard purity markers.',
      color: 'text-emerald-500',
    };
  };

  const result = calculateResult();

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Fuel Guard AI</h2>
          <p className="text-muted-foreground text-sm">Digital Quality Analysis</p>
        </div>
        <div className="text-right">
          <Progress value={step === 'fuel-type' ? 25 : step === 'visual' ? 50 : step === 'physics' ? 75 : 100} className="w-24 h-2" />
          <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1 block">Step {step === 'fuel-type' ? 1 : step === 'visual' ? 2 : step === 'physics' ? 3 : 4} of 4</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'fuel-type' && (
          <motion.div
            key="fuel-type"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Select Fuel Type
                </CardTitle>
                <CardDescription>What product are we analyzing today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {fuelTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          updateData({ fuelType: type.id });
                          nextStep();
                        }}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                          data.fuelType === type.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon size={32} className={type.color} />
                        <span className="font-semibold text-sm">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'visual' && (
          <motion.div
            key="visual"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Visual Inspection
                </CardTitle>
                <CardDescription>Examine a small sample in a clear glass.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>How clear is the liquid?</Label>
                  <RadioGroup value={data.clarity} onValueChange={(v) => updateData({ clarity: v })}>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg">
                      <RadioGroupItem value="crystal" id="crystal" />
                      <Label htmlFor="crystal" className="flex-1">Crystal Clear</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg">
                      <RadioGroupItem value="cloudy" id="cloudy" />
                      <Label htmlFor="cloudy" className="flex-1">Cloudy / Hazy</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex-1">Abnormally Dark</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button className="flex-1" disabled={!data.clarity} onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'physics' && (
          <motion.div
            key="physics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-primary" />
                  Manual Residue Test
                </CardTitle>
                <CardDescription>Drip a small amount on white paper and let it evaporate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>After 2 minutes, what remains?</Label>
                  <RadioGroup value={data.residue} onValueChange={(v) => updateData({ residue: v })}>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none" className="flex-1">No visible stain</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg">
                      <RadioGroupItem value="oily" id="oily" />
                      <Label htmlFor="oily" className="flex-1">Oily / Greasy patch</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg">
                      <RadioGroupItem value="colored" id="colored" />
                      <Label htmlFor="colored" className="flex-1">Colored residue</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button className="flex-1" disabled={!data.residue} onClick={nextStep}>
                    Analyze <CheckCircle2 className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <Card className={`border-t-8 ${result.status === 'pure' ? 'border-t-emerald-500' : 'border-t-destructive'}`}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  {result.status === 'pure' ? (
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  ) : (
                    <AlertTriangle size={40} className="text-destructive" />
                  )}
                </div>
                <CardTitle className={`text-2xl ${result.color}`}>
                  {result.message}
                </CardTitle>
                <div className="text-4xl font-bold mt-2">
                  {result.score}<span className="text-sm font-normal text-muted-foreground">% Purity</span>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground italic">
                  "{result.details}"
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg text-left space-y-2">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Analysis Metadata</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between border-b pb-1">
                      <span>Fuel Type:</span>
                      <span className="font-medium capitalize">{data.fuelType}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span>Clarity:</span>
                      <span className="font-medium capitalize">{data.clarity}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span>Residue:</span>
                      <span className="font-medium capitalize">{data.residue}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span>Analyzed:</span>
                      <span className="font-medium">Just Now</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline" onClick={() => {
                    setData({ fuelType: '', color: '', clarity: '', residue: '', density: '' });
                    setStep('fuel-type');
                  }}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Retest
                  </Button>
                  <Button className="flex-1" onClick={() => toast.success("Report shared with community database")}>
                    Share Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Important Notice</h4>
                    <p className="text-xs text-white/80 mt-1">
                      This digital analysis is a preliminary field assessment. For critical engine protection, always use laboratory-certified test kits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetectionWizard;
