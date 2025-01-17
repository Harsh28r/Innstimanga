import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Edit2, Trash2, Plus, Search, ArrowRight } from 'lucide-react';
import styled from 'styled-components';

// Define styled components with improved styles
const Container = styled.div`
  padding: 20px;
  background-color: #f9fafb; // Lighter background for better contrast
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // Softer shadow
`;

const Header = styled.h1`
  font-size: 30px; // Slightly larger font size
  font-weight: bold;
  color: #111827; // Darker color for better contrast
  margin-bottom: 24px; // More space below header
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); // Enhanced shadow on hover
  }
`;

const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  background-color: #e0f2fe; // Softer blue background
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem; // Slightly larger font size
  font-weight: 500;
  color: #1f2937;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem; // Increased padding
  font-size: 0.9rem; // Slightly larger font size
  color: #2563eb;
  background-color: #eff6ff;
  border-radius: 0.375rem;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    color: #1d4ed8;
    background-color: #dbeafe;
  }
`;

const Input = styled.input`
  padding-left: 2.5rem; // More padding for better spacing
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.3s; // Smooth transition
  &:focus {
    border-color: #3b82f6;
  }
`;

const NewButton = styled(Button)`
  color: #1d4ed8;
  background-color: #dbeafe;
`;

const Section = styled.div`
  margin-top: 2rem; // More space above section
`;

const CardContent = styled.div`
  padding: 2rem; // Increased padding for better spacing
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem; // More space for icon
  top: 0.75rem;
  height: 1.25rem; // Larger icon
  width: 1.25rem;
  color: #9ca3af;
`;

const Modal = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow: auto;
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
`;

// Function to get status color
function getStatusColor(status) {
  switch (status) {
    case 'new':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'contacted':
    case 'under_review':
      return 'bg-blue-100 text-blue-800';
    case 'converted':
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'closed':
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

const EnquiryForm = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAdmission, setNewAdmission] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    grade: '',
    status: 'new',
    date: new Date().toISOString().replace('Z', '') // Default to today's date
  });
  const [newEnquiry, setNewEnquiry] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    grade: '',
    status: 'new',
    date: new Date().toISOString().replace('Z', '') // Default to today's date
  });
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [showAdmissionForm, setShowAdmissionForm] = useState(false); // State to toggle admission form visibility
  const [someOtherState, setSomeOtherState] = useState(false); // Example of declaring a separate state updater function

  const baseURL = 'http://localhost:5000';

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get(`${baseURL}/enquiries`);
        console.log('Enquiries fetched:', response.data);
        setEnquiries(response.data);
      } catch (error) {
        console.error('Error fetching enquiries:', error.message);
        setError('Failed to fetch enquiries. Please check your network connection.');
      } finally {
        setLoading(false);
      }
    };

    const fetchAdmissions = async () => {
      try {
        const response = await axios.get(`${baseURL}/admissions`);
        console.log('Admissions fetched:', response.data);
        setAdmissions(response.data);
      } catch (error) {
        console.error('Error fetching admissions:', error.message);
        setError('Failed to fetch admissions. Please check your network connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
    fetchAdmissions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEnquiry({ ...newEnquiry, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      studentName: newEnquiry.studentName,
      parentName: newEnquiry.parentName,
      phone: newEnquiry.phone,
      email: newEnquiry.email,
      grade: newEnquiry.grade
    };

    try {
      const response = await axios.post(`${baseURL}/admissions`, data);
      console.log('Admission submitted:', response.data);
      setAdmissions([...admissions, response.data]);
      setNewEnquiry({
        studentName: '',
        parentName: '',
        phone: '',
        email: '',
        grade: '',
        status: 'new',
        date: new Date().toISOString()
      });
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error('Error submitting admission:', error.response.data);
    }
  };

  const handleAdmissionInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmission({ ...newAdmission, [name]: value });
  };

  const handleAdmissionSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      studentName: newAdmission.studentName,
      parentName: newAdmission.parentName,
      phone: newAdmission.phone,
      email: newAdmission.email,
      grade: newAdmission.grade
    };

    try {
      const response = await axios.post(`${baseURL}/admissions`, data);
      console.log('Admission submitted:', response.data);
      setAdmissions([...admissions, response.data]);
      setNewAdmission({
        studentName: '',
        parentName: '',
        phone: '',
        email: '',
        grade: '',
        status: 'new',
        date: new Date().toISOString()
      });
      setShowAdmissionForm(false); // Hide form after submission
      console.log('New admission added successfully');
    } catch (error) {
      console.error('Error submitting admission:', error.response.data);
    }
  };

  const handleEnquirySubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      studentName: newEnquiry.studentName,
      parentName: newEnquiry.parentName,
      phone: newEnquiry.phone,
      email: newEnquiry.email,
      grade: newEnquiry.grade
    };

    try {
      const response = await axios.post(`${baseURL}/enquiries`, data);
      console.log('Enquiry submitted:', response.data);
      setEnquiries([...enquiries, response.data]);
      setNewEnquiry({
        studentName: '',
        parentName: '',
        phone: '',
        email: '',
        grade: '',
        status: 'new',
        date: new Date().toISOString()
      });
      setShowForm(false); // Hide form after submission
      console.log('New enquiry added successfully');
    } catch (error) {
      console.error('Error submitting enquiry:', error.response.data);
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log('Edit button clicked for id:', id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log('Delete button clicked for id:', id);
  };

  return (
    <Container>
      <Header>Enquiry Form</Header>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <FormsSection
          enquiries={enquiries}
          admissions={admissions}
          newAdmission={newAdmission}
          setShowForm={setShowAdmissionForm}
          onEdit={handleEdit}
          onDelete={id => handleDelete(id)}
        />
      )}
      <Modal show={showAdmissionForm}>
        <ModalContent>
          <CloseButton onClick={() => setShowAdmissionForm(false)}>&times;</CloseButton>
          <form onSubmit={handleAdmissionSubmit}>
            <input
              type="text"
              name="studentName"
              value={newAdmission.studentName}
              onChange={handleAdmissionInputChange}
              placeholder="Student Name"
              required
            />
            <input
              type="text"
              name="parentName"
              value={newAdmission.parentName}
              onChange={handleAdmissionInputChange}
              placeholder="Parent Name"
              required
            />
            <input
              type="text"
              name="phone"
              value={newAdmission.phone}
              onChange={handleAdmissionInputChange}
              placeholder="Phone"
              required
            />
            <input
              type="email"
              name="email"
              value={newAdmission.email}
              onChange={handleAdmissionInputChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="grade"
              value={newAdmission.grade}
              onChange={handleAdmissionInputChange}
              placeholder="Grade"
              required
            />
            <button type="submit">Add Admission</button>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default EnquiryForm;

export function FormsSection({ enquiries = [], admissions = [], newAdmission, setShowForm, onEdit, onDelete }) {
  return (
    <Section>
      <div>
        <h2 style={{ color: '#374151' }}>Forms Management</h2>
        <p style={{ color: '#6b7280' }}>Manage admission and enquiry forms</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {/* Enquiry Forms Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <FileText style={{ color: '#3b82f6' }} size={20} />
              <h3>Enquiry Forms</h3>
            </CardTitle>
            <Button>
              View All
              <ArrowRight size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <SearchContainer>
                <SearchIcon />
                <Input
                  type="text"
                  placeholder="Search enquiries..."
                />
              </SearchContainer>
              <NewButton onClick={() => setShowForm(true)}>
                <Plus size={16} className="inline mr-1" />
                New Enquiry
              </NewButton>
            </div>
            <div className="divide-y">
              {enquiries.slice(0, 4).map((enquiry) => (
                <div key={enquiry.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{enquiry.studentName || 'Unknown Student'}</h4>
                      <p className="text-sm text-gray-500">{enquiry.parentName || 'Unknown Parent'}</p>
                    </div>
                    <StatusBadge className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(enquiry.status)}`}>
                      {enquiry.status ? enquiry.status.replace('_', ' ').charAt(0).toUpperCase() + enquiry.status.slice(1) : 'Unknown Status'}
                    </StatusBadge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">
                      <p>Grade {enquiry.grade || 'Unknown Grade'}</p>
                      <p>{enquiry.date || 'Unknown Date'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Download size={16} />
                      </button>
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" onClick={() => onEdit(enquiry.id)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded" onClick={() => onDelete(enquiry.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admission Forms Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <FileText style={{ color: '#3b82f6' }} size={20} />
              <h3>Admission Forms</h3>
            </CardTitle>
            <Button>
              View All
              <ArrowRight size={16} />
            </Button>
          </CardHeader>
          <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <SearchContainer>
                <SearchIcon />
                <Input
                  type="text"
                  placeholder="Search enquiries..."
                />
              </SearchContainer>
              <NewButton onClick={() => setShowForm(true)}>
                <Plus size={16} className="inline mr-1" />
                New Admission
              </NewButton>
            </div>
            <div className="divide-y">
              {admissions.map((admission) => (
                <div key={admission.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{admission.studentName || 'Unknown Student'}</h4>
                      <p className="text-sm text-gray-500">{admission.parentName || 'Unknown Parent'}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(admission.status)}`}>
                      {admission.status ? admission.status.replace('_', ' ').charAt(0).toUpperCase() + admission.status.slice(1) : 'Unknown Status'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">
                      <p>Grade {admission.grade || 'Unknown Grade'}</p>
                      <p>{admission.date || 'Unknown Date'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Download size={16} />
                      </button>
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" onClick={() => onEdit(admission.id)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded" onClick={() => onDelete(admission.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
