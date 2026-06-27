import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  AlertCircle, 
  Plus, 
  ChevronRight,
  Navigation as NavIcon,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from './ui/dialog';
import { toast } from 'sonner';

interface Station {
  id: string;
  name: string;
  location: string;
  distance: string;
  status: 'verified' | 'suspicious' | 'unknown';
  rating: number;
  reports: number;
}

const MOCK_STATIONS: Station[] = [
  { id: '1', name: 'Global Energy Main', location: '122 Downtown Ave', distance: '0.8 km', status: 'verified', rating: 4.8, reports: 0 },
  { id: '2', name: 'City Pumping Station', location: '45 Industrial Pkwy', distance: '1.2 km', status: 'suspicious', rating: 2.1, reports: 12 },
  { id: '3', name: 'Sunrise Fuel & Gas', location: '89 Bypass Rd', distance: '2.5 km', status: 'verified', rating: 4.5, reports: 2 },
  { id: '4', name: 'Apex Petroleum', location: '303 North Blvd', distance: '3.1 km', status: 'unknown', rating: 3.7, reports: 0 },
];

const StationList: React.FC = () => {
  const [stations, setStations] = useState<Station[]>(MOCK_STATIONS);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    location: '',
    issue: '',
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fuel_reports');
    if (saved) {
      const userStations = JSON.parse(saved);
      setStations(prev => [...userStations, ...prev]);
    }
  }, []);

  const handleSubmitReport = () => {
    if (!newReport.name || !newReport.location) {
      toast.error("Please fill in the station name and location");
      return;
    }

    const reportStation: Station = {
      id: Date.now().toString(),
      name: newReport.name,
      location: newReport.location,
      distance: 'Now',
      status: 'suspicious',
      rating: 1.0,
      reports: 1
    };

    const updatedStations = [reportStation, ...stations];
    setStations(updatedStations);
    
    // Save only user reports to local storage for persistence demonstration
    const userReports = updatedStations.filter(s => s.distance === 'Now');
    localStorage.setItem('fuel_reports', JSON.stringify(userReports));

    toast.success("Station reported successfully. Thank you for keeping the community safe.");
    setIsReportModalOpen(false);
    setNewReport({ name: '', location: '', issue: '' });
  };

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Nearby Stations</h2>
          <p className="text-muted-foreground text-sm">Quality verification database</p>
        </div>
        
        <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Report Bad Fuel</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Station Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Blue Sky Gas" 
                  value={newReport.name}
                  onChange={e => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location / Street</Label>
                <Input 
                  id="location" 
                  placeholder="e.g. 12th Street, West side" 
                  value={newReport.location}
                  onChange={e => setNewReport(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issue">What was the issue?</Label>
                <Textarea 
                  id="issue" 
                  placeholder="e.g. Engine knocking, dark diesel, etc." 
                  value={newReport.issue}
                  onChange={e => setNewReport(prev => ({ ...prev, issue: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmitReport}>Submit Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <div className="h-48 w-full rounded-xl bg-muted overflow-hidden relative">
          {/* Mock Map View */}
          <div className="absolute inset-0 flex items-center justify-center bg-[url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/61c90c04-cc6b-4707-add9-c568301e916c/fuel-station-mockup-f520d450-1782520104690.webp')] bg-cover bg-center opacity-40 grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          
          {/* Mock Markers */}
          <div className="absolute top-1/2 left-1/4 animate-bounce text-primary"><MapPin size={32} fill="currentColor" /></div>
          <div className="absolute top-1/3 right-1/3 text-destructive"><MapPin size={24} fill="currentColor" /></div>
          <div className="absolute bottom-1/4 right-1/2 text-emerald-500"><MapPin size={28} fill="currentColor" /></div>

          <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <NavIcon size={16} className="text-primary" /> Tracking your location...
            </span>
            <Button variant="ghost" size="sm">Open Map</Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {stations.map(station => (
          <Card key={station.id} className="overflow-hidden border-l-4 group hover:border-primary transition-colors duration-300" 
            style={{ borderLeftColor: station.status === 'verified' ? '#10b981' : station.status === 'suspicious' ? '#ef4444' : '#94a3b8' }}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    {station.name}
                    {station.status === 'verified' && <ShieldCheck size={16} className="text-emerald-500" />}
                    {station.status === 'suspicious' && <AlertCircle size={16} className="text-destructive" />}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin size={12} /> {station.location} • {station.distance}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {station.rating}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{station.reports} reports</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Badge variant={station.status === 'verified' ? 'default' : station.status === 'suspicious' ? 'destructive' : 'secondary'} className="text-[10px]">
                    {station.status.toUpperCase()}
                  </Badge>
                  {station.reports > 0 && (
                    <Badge variant="outline" className="text-[10px] flex items-center gap-1">
                      <MessageSquare size={10} /> {station.reports} Reviews
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2 group-hover:translate-x-1 transition-transform">
                  Details <ChevronRight size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StationList;
