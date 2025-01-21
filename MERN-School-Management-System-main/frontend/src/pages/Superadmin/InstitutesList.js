import React from 'react';
import { Building2, Users, GraduationCap, CheckCircle, XCircle } from 'lucide-react';
import { mockInstitutes } from '../../data/mockUsers.js';
import { Institute } from '../../types/auth';
import { useNavigate } from 'react-router-dom';

const InstitutesList = () => {
  const navigate = useNavigate();

  const handleManageInstitute = (adminId) => {
    // Navigate to Manage Institute which will then redirect to Admin Dashboard
    navigate(`/manage-institute/${adminId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Institutes</h2>
        <p className="mt-1 text-sm text-gray-500">Manage all registered institutes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockInstitutes.map((institute) => (
          <div
            key={institute.id}
            className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleManageInstitute(institute.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Building2 className="text-blue-600" size={20} />
                  <h3 className="text-lg font-medium text-gray-900">
                    {institute.name}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-gray-500">{institute.location}</p>
              </div>
              {institute.status === 'active' ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <XCircle className="text-red-500" size={20} />
              )}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>{institute.teacherCount} Teachers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap size={16} />
                <span>{institute.studentCount} Students</span>
              </div>
            </div>

            <button
              className="mt-4 w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleManageInstitute(institute.id);
              }}
            >
              Manage Institute
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstitutesList;
