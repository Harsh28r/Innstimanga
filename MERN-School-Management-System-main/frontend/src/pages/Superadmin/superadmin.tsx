import { useState } from 'react';
import { Building2, BarChart3 } from 'lucide-react';
import { InstitutesList } from './InstitutesList';
import { AdminDashboard } from '../admin/AdminDashboard';
import type { Institute } from '../../types/auth';

const tabs = [
  { id: 'institutes', label: 'Institutes', icon: <Building2 size={20} /> },
  { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} /> },
];

export function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('institutes');
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);

  // Reset selected institute when switching to institutes tab
  const handleTabChange = (tabId: string) => {
    if (tabId === 'institutes') {
      setSelectedInstitute(null);
    }
    setActiveTab(tabId);
  };

  // When an institute is selected, switch to overview tab
  const handleInstituteSelect = (institute: Institute) => {
    setSelectedInstitute(institute);
    setActiveTab('overview');
  };

  return (
    <div className="h-[calc(100vh-73px)]">
      {/* Top Navigation */}
      <div className="bg-white border-b">
        <div className="flex items-center space-x-4 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 py-4 px-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Institute Info */}
      {selectedInstitute && activeTab === 'overview' && (
        <div className="bg-white border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedInstitute.name}
              </h2>
              <p className="text-sm text-gray-500">{selectedInstitute.location}</p>
            </div>
            <button
              onClick={() => setSelectedInstitute(null)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Change Institute
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'institutes' && (
          <InstitutesList onSelectInstitute={handleInstituteSelect} />
        )}
        {activeTab === 'overview' && selectedInstitute && (
          <AdminDashboard instituteId={selectedInstitute.id} />
        )}
      </div>
    </div>
  );
}