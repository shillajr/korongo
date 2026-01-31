import React, { useContext, useState } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Upload, CheckCircle2 } from 'lucide-react';

/**
 * Step 5A (conditional): Visa application form with document upload
 */
export const VisaApplicationFlow: React.FC = () => {
  const { t } = useLanguage();
  const context = useContext(TanzaniaArrivalContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!context) {
    throw new Error('VisaApplicationFlow must be used within TanzaniaArrivalProvider');
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    }
  };

  const handleContinue = () => {
    if (selectedFile && documentType) {
      context.setCurrentStep(6);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {t('arrivalFlow.visaApplication.title')}
        </h1>
        <p className="text-base text-slate-600">{t('arrivalFlow.visaApplication.subtitle')}</p>
      </div>

      {/* Form */}
      <div className="space-y-4 flex-1 mb-6">
        {/* Document Type */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {t('arrivalFlow.visaApplication.documentType')}
          </label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-[12px] text-slate-900 focus:outline-none focus:border-warm-amber"
          >
            <option value="">{t('arrivalFlow.visaApplication.selectDocument')}</option>
            <option value="passport">{t('arrivalFlow.visaApplication.passport')}</option>
            <option value="birthCertificate">{t('arrivalFlow.visaApplication.birthCertificate')}</option>
            <option value="travelInsurance">{t('arrivalFlow.visaApplication.travelInsurance')}</option>
            <option value="bankStatement">{t('arrivalFlow.visaApplication.bankStatement')}</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {t('arrivalFlow.visaApplication.uploadFile')}
          </label>
          <label className="relative flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-[12px] cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="text-center">
              {selectedFile ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-600">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-700">{t('arrivalFlow.visaApplication.dragOrClick')}</p>
                </>
              )}
            </div>
            <input type="file" className="hidden" onChange={handleFileSelect} accept=".pdf,.jpg,.jpeg,.png" />
          </label>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {t('arrivalFlow.visaApplication.additionalNotes')}
          </label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Any additional information..."
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-[12px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-warm-amber resize-none"
          />
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-2 border-blue-200 p-4" style={{ borderRadius: '12px' }}>
          <p className="text-sm text-blue-900">
            💡 All documents are securely stored and used only for visa processing.
          </p>
        </Card>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!selectedFile || !documentType}
        className="w-full h-12 rounded-[10px]"
        variant="accent"
      >
        {t('common.continue')}
      </Button>
    </div>
  );
};
