import { useState } from 'react';
import { 
  Search, Plus, Video, FileText, Book, Download, 
  ExternalLink, Edit2, Trash2, File 
} from 'lucide-react';

// Define your styles as JavaScript objects
const styles = {
  container: {
    margin: '2rem 0',
    padding: '1rem',
    backgroundColor: '#f9fafb', // light gray background
    borderRadius: '0.5rem',
  },
  title: {
    fontWeight: 700,
    color: '#111827', // darker gray for better contrast
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
  },
  subject: {
    color: '#4b5563', // slightly darker gray
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    border: '1px solid #d1d5db',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    transition: 'transform 0.3s, box-shadow 0.3s',
    margin: '0.75rem',
    flex: '1 1 calc(25% - 1.5rem)',
    maxWidth: 'calc(25% - 1.5rem)',
  },
  actionBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1.5rem',
    backgroundColor: '#f3f4f6',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb', // blue-700
    color: 'white',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  buttonHover: {
    backgroundColor: '#1d4ed8', // darker blue
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
  },
};

const mockResources = [
  {
    id: '1',
    title: 'Advanced Calculus Introduction',
    type: 'video',
    subject: 'Mathematics',
    grade: '12',
    description: 'Comprehensive introduction to advanced calculus concepts',
    uploadedBy: 'John Smith',
    uploadDate: '2024-03-15',
    fileSize: '250 MB',
    downloadCount: 128,
    url: '#'
  },
  {
    id: '2',
    title: 'Chemical Bonding Notes',
    type: 'document',
    subject: 'Chemistry',
    grade: '11',
    description: 'Detailed notes on chemical bonding and molecular structures',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2024-03-14',
    fileSize: '2.5 MB',
    downloadCount: 245,
    url: '#'
  },
  {
    id: '3',
    title: 'Physics Formula Handbook',
    type: 'ebook',
    subject: 'Physics',
    grade: '11-12',
    description: 'Complete handbook of physics formulas and concepts',
    uploadedBy: 'Michael Brown',
    uploadDate: '2024-03-13',
    fileSize: '5.8 MB',
    downloadCount: 567,
    url: '#'
  },
  {
    id: '4',
    title: 'English Grammar Practice',
    type: 'worksheet',
    subject: 'English',
    grade: '11',
    description: 'Practice worksheets for advanced English grammar',
    uploadedBy: 'Emma Davis',
    uploadDate: '2024-03-12',
    fileSize: '1.2 MB',
    downloadCount: 189,
    url: '#'
  },
  {
    id: '5',
    title: 'Biology Lab Experiments',
    type: 'video',
    subject: 'Biology',
    grade: '12',
    description: 'Video demonstrations of important lab experiments',
    uploadedBy: 'Robert Wilson',
    uploadDate: '2024-03-11',
    fileSize: '180 MB',
    downloadCount: 156,
    url: '#'
  },
  {
    id: '6',
    title: 'History Timeline Charts',
    type: 'document',
    subject: 'History',
    grade: '11',
    description: 'Visual timeline charts of major historical events',
    uploadedBy: 'Lisa Anderson',
    uploadDate: '2024-03-10',
    fileSize: '3.4 MB',
    downloadCount: 234,
    url: '#'
  }
];

const getResourceIcon = (type) => {
  switch (type) {
    case 'video':
      return <Video className="text-blue-600" />;
    case 'document':
      return <FileText className="text-green-600" />;
    case 'ebook':
      return <Book className="text-purple-600" />;
    case 'worksheet':
      return <File className="text-orange-600" />;
    default:
      return null;
  }
};

const ResourceManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const subjects = Array.from(new Set(mockResources.map(r => r.subject)));
  const types = Array.from(new Set(mockResources.map(r => r.type)));

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = subjectFilter === 'all' ? true : resource.subject === subjectFilter;
    const matchesType = typeFilter === 'all' ? true : resource.type === typeFilter;

    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div style={styles.container}>
      <div>
        <h2 style={styles.title}>Educational Resources</h2>
        <p className="mt-1 text-sm text-gray-500">Manage and organize learning materials</p>
      </div>

      {/* Action Bar */}
      <div style={styles.actionBar}>
        <div className="flex-1 min-w-[240px] relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
            aria-label="Search resources"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            style={styles.select}
            aria-label="Filter by subject"
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={styles.select}
            aria-label="Filter by type"
          >
            <option value="all">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>

          <button 
            style={styles.button} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            aria-label="Add new resource"
          >
            <Plus size={20} />
            Add Resource
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="flex flex-wrap gap-4" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {filteredResources.map((resource) => (
          <div 
            key={resource.id} 
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getResourceIcon(resource.type)}
                <div>
                  <h3 style={styles.title}>{resource.title}</h3>
                  <p style={styles.subject}>{resource.subject} - Grade {resource.grade}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" aria-label="Edit resource">
                  <Edit2 size={16} />
                </button>
                <button className="p-1 text-red-600 hover:bg-red-50 rounded" aria-label="Delete resource">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{resource.description}</p>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{resource.fileSize}</span>
              <span>{resource.downloadCount} downloads</span>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <p>Uploaded by: {resource.uploadedBy}</p>
                <p>Date: {resource.uploadDate}</p>
              </div>
              <div className="flex items-center gap-2">
                {resource.type === 'video' ? (
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" aria-label="View video">
                    <ExternalLink size={16} />
                  </button>
                ) : (
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" aria-label="Download resource">
                    <Download size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceManagement;