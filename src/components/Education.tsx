import React from 'react';
import { BookOpen, AlertCircle, Droplets, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const Education: React.FC = () => {
  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Education Center</h2>
        <p className="text-muted-foreground text-sm">Learn to identify quality fuel</p>
      </div>

      <Card className="mb-6 bg-primary text-primary-foreground overflow-hidden">
        <CardContent className="p-6 relative">
          <Info className="absolute -right-4 -top-4 w-24 h-24 opacity-10" />
          <h3 className="text-lg font-bold mb-2">Why Quality Matters?</h3>
          <p className="text-sm text-primary-foreground/80 leading-relaxed">
            Adulterated fuel can cause permanent engine damage, reduced fuel efficiency, and increased toxic emissions. Knowing how to spot fake products is your first line of defense.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <BookOpen size={18} className="text-primary" /> Quick Guides
        </h3>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="petrol">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600">
                  <Droplets size={18} />
                </div>
                <span>Petrol (Gasoline) Purity</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Pure petrol is typically clear or has a slightly yellowish tint depending on local additives. It should evaporate quickly without leaving an oily residue. Adulterated petrol often contains kerosene or naphtha which smells different and leaves stains.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="diesel">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-600/10 text-yellow-600">
                  <Droplets size={18} />
                </div>
                <span>Diesel Standards</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Diesel should be amber-colored and translucent. Cloudiness usually indicates water contamination or biological growth. High-quality diesel has a specific oily feel but should not have floating particles.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cng-lng">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                  <AlertCircle size={18} />
                </div>
                <span>CNG & LNG Safety</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Gaseous fuels are harder to test manually. Look for consistent pressure readings at the pump and lack of odor (except for the added mercaptan). Fluctuating pressure often indicates gas dilution or compressor issues.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-bold">Emergency Actions</h3>
        <Card className="border-destructive/20">
          <CardContent className="p-4 space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">1</div>
              <p className="text-sm">Stop the engine immediately if you notice knocking or loss of power.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">2</div>
              <p className="text-sm">Drain the fuel tank before restarting to prevent fuel pump failure.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">3</div>
              <p className="text-sm">Keep the receipt and report the station in the app.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Education;
