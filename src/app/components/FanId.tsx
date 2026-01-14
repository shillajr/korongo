import { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { 
  IdCard, 
  Upload, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  Flag,
  CreditCard,
  Shield,
  Edit,
  Ticket,
  AlertCircle
} from 'lucide-react';

interface FanIdData {
  fullName: string;
  nationality: string;
  idNumber: string;
  documentType: string;
  status: 'pending' | 'approved' | 'rejected';
  fanIdNumber?: string;
  createdAt?: string;
  photoUrl?: string;
}

interface FanIdProps {
  onNavigate: (section: string) => void;
}

export function FanId({ onNavigate }: FanIdProps) {
  const [screen, setScreen] = useState<'create' | 'status' | 'manage'>('create');
  const [fanIdData, setFanIdData] = useState<FanIdData | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FanIdData>({
    fullName: '',
    nationality: '',
    idNumber: '',
    documentType: 'passport',
    status: 'pending'
  });

  // Load FAN ID from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('korongo_fan_id');
    if (saved) {
      const data = JSON.parse(saved);
      setFanIdData(data);
      setFormData(data);
      setScreen('status');
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleCreateFanId = () => {
    // Generate FAN ID number
    const fanIdNumber = `AFCON2027-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newFanId: FanIdData = {
      ...formData,
      fanIdNumber,
      createdAt: new Date().toISOString(),
      status: 'pending' // In real app, would be 'pending' until verified
    };

    // Simulate approval for demo purposes after 2 seconds
    setTimeout(() => {
      newFanId.status = 'approved';
      setFanIdData(newFanId);
      localStorage.setItem('korongo_fan_id', JSON.stringify(newFanId));
    }, 2000);

    setFanIdData(newFanId);
    localStorage.setItem('korongo_fan_id', JSON.stringify(newFanId));
    setScreen('status');
  };

  const handleUpdateDetails = () => {
    if (fanIdData) {
      const updatedData = {
        ...fanIdData,
        ...formData
      };
      setFanIdData(updatedData);
      localStorage.setItem('korongo_fan_id', JSON.stringify(updatedData));
      setIsEditing(false);
    }
  };

  // Render Creation Screen
  if (screen === 'create') {
    return (
      <div className="min-h-screen bg-gray-50 pb-32">
        <div className="max-w-md mx-auto p-5">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Create Your FAN ID</h1>
            <p className="text-muted-foreground">
              The FAN ID is mandatory for accessing stadiums and fan zones.
            </p>
          </div>

          <Card className="p-6 border border-border">
            <div className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name (as on ID)
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <Label htmlFor="nationality" className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-primary" />
                  Nationality
                </Label>
                <Input
                  id="nationality"
                  placeholder="e.g., Kenyan, Tanzanian, Ugandan"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="h-12"
                />
              </div>

              {/* ID Number */}
              <div className="space-y-2">
                <Label htmlFor="idNumber" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  ID/Passport Number
                </Label>
                <Input
                  id="idNumber"
                  placeholder="ID or Passport Number"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <Label htmlFor="document" className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary" />
                  Upload Identity Document
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="document"
                    accept="image/*,.pdf"
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                  <label htmlFor="document" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {documentFile ? documentFile.name : 'Click to upload ID or Passport'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG or PDF (max. 5MB)
                    </p>
                  </label>
                </div>
              </div>

              {/* Create Button */}
              <Button
                onClick={handleCreateFanId}
                disabled={!formData.fullName || !formData.nationality || !formData.idNumber || !documentFile}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <IdCard className="w-5 h-5 mr-2" />
                Create FAN ID
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your FAN ID will be reviewed and approved within 24-48 hours
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Render Status Screen
  if (screen === 'status' && fanIdData) {
    const statusConfig = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        text: 'Pending Review'
      },
      approved: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        text: 'Approved'
      },
      rejected: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        text: 'Rejected'
      }
    };

    const config = statusConfig[fanIdData.status];
    const StatusIcon = config.icon;

    return (
      <div className="min-h-screen bg-gray-50 pb-32">
        <div className="max-w-md mx-auto p-5">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Your FAN ID</h1>
            <p className="text-muted-foreground">
              Show this FAN ID at stadium and fan zone entrances.
            </p>
          </div>

          {/* FAN ID Card */}
          <Card className="overflow-hidden border-0 mb-4">
            <div className="bg-gradient-to-br from-primary to-primary/70 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  <span className="font-bold text-lg">AFCON 2027</span>
                </div>
                <Badge className={`${config.color} border flex items-center gap-1 px-3 py-1`}>
                  <StatusIcon className="w-4 h-4" />
                  {config.text}
                </Badge>
              </div>

              {/* Profile Section */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">{fanIdData.fullName}</h2>
                  <p className="text-sm opacity-90">{fanIdData.nationality}</p>
                </div>
              </div>

              {/* FAN ID Number */}
              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <p className="text-xs opacity-75 mb-1">FAN ID Number</p>
                <p className="font-mono font-bold text-lg">{fanIdData.fanIdNumber}</p>
              </div>
            </div>

            {/* QR Code Section */}
            {fanIdData.status === 'approved' && (
              <div className="bg-white p-6">
                <div className="flex flex-col items-center">
                  <QRCodeSVG
                    value={fanIdData.fanIdNumber || ''}
                    size={200}
                    level="H"
                    includeMargin
                  />
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Scan this QR code at entry points
                  </p>
                </div>
              </div>
            )}

            {fanIdData.status === 'pending' && (
              <div className="bg-yellow-50 p-4 border-t border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Under Review</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Your FAN ID is being verified. You'll receive a notification once approved.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => setScreen('manage')}
            >
              <Edit className="w-4 h-4 mr-2" />
              Manage FAN ID
            </Button>

            {fanIdData.status === 'approved' && (
              <Button
                variant="default"
                className="w-full h-12"
                onClick={() => onNavigate('matches')}
              >
                <Ticket className="w-4 h-4 mr-2" />
                View Linked Tickets
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render Management Screen
  if (screen === 'manage' && fanIdData) {
    return (
      <div className="min-h-screen bg-gray-50 pb-32">
        <div className="max-w-md mx-auto p-5">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Manage FAN ID</h1>
            <p className="text-muted-foreground">
              Update your personal details and security information.
            </p>
          </div>

          {/* Personal Details Card */}
          <Card className="p-6 border border-border mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Personal Details</h3>
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(fanIdData);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUpdateDetails}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editFullName">Full Name</Label>
                <Input
                  id="editFullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editNationality">Nationality</Label>
                <Input
                  id="editNationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editIdNumber">ID/Passport Number</Label>
                <Input
                  id="editIdNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>
            </div>
          </Card>

          {/* Verification Status Card */}
          <Card className="p-6 border border-border mb-4">
            <h3 className="font-semibold mb-4">Security & Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Identity Verified</p>
                    <p className="text-xs text-muted-foreground">Document approved</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Verified
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">FAN ID Status</p>
                    <p className="text-xs text-muted-foreground">{fanIdData.status === 'approved' ? 'Active' : 'Pending'}</p>
                  </div>
                </div>
                <Badge variant="outline" className={
                  fanIdData.status === 'approved' 
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                }>
                  {fanIdData.status === 'approved' ? 'Active' : 'Pending'}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Linked Tickets Card */}
          <Card className="p-6 border border-border mb-4">
            <h3 className="font-semibold mb-3">Linked Tickets</h3>
            <div className="text-center py-6">
              <Ticket className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-4">
                No tickets linked to your FAN ID yet
              </p>
              <Button
                variant="outline"
                onClick={() => onNavigate('matches')}
              >
                Browse Matches
              </Button>
            </div>
          </Card>

          {/* Back Button */}
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setScreen('status')}
          >
            Back to FAN ID
          </Button>
        </div>
      </div>
    );
  }

  return null;
}