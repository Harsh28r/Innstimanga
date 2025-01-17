import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Plus, Edit, Trash2, Building2 } from 'lucide-react';
import './Timetable.css'; // Import the CSS file

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM','12:30 AM - 1:30 PM'];
const mockTimeSlots = [
  { day: 'Monday', time: '8:00 AM - 9:00 AM', grade: '11', section: 'A', subject: 'Math', teacher: 'Mr. Smith', room: '101' },
  // Add more mock data as needed
];

export default function TimeTableSection({ instituteId }) {
  const [selectedGrade, setSelectedGrade] = useState('11');
  const [selectedSection, setSelectedSection] = useState('A');
  const [timeTableData, setTimeTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    day: 'Monday',
    time: '8:00 AM - 9:00 AM',
    grade: selectedGrade,
    section: selectedSection,
    subject: '',
    teacher: '',
    room: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [addScheduleData, setAddScheduleData] = useState({
    grade: '',
    section: '',
    day: 'Monday',
    time: '8:00 AM - 9:00 AM',
    subject: '',
    teacher: '',
    room: ''
  });

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/timetable');
      const data = await response.json();
      setTimeTableData(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete timetable entry with id: ${id}`); // Log the id being deleted
      const response = await fetch(`http://localhost:5000/api/timetable/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Timetable entry deleted successfully');
        fetchTimetableData(); // Refetch data after deletion
      } else {
        const errorData = await response.json();
        console.error('Error response from server:', errorData); // Log server error response
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
      alert('An error occurred while deleting the timetable entry');
    }
  };

  const handleCreate = async (newEntry) => {
    try {
      console.log('Creating new entry:', newEntry); // Log the entry being sent to the API
      const response = await fetch('http://localhost:5000/api/timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        alert('Timetable entry created successfully');
        fetchTimetableData(); // Refetch data after creation
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error creating timetable entry:', error);
      alert(`An error occurred while creating the timetable entry: ${error.message}`);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Log form data before submission

    if (isEditing) {
      await handleEdit(editingId, formData);
    } else {
      await handleCreate(formData);
    }

    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleAddScheduleClick = () => {
    setAddScheduleData({
      grade: '',
      section: '',
      day: 'Monday',
      time: '8:00 AM - 9:00 AM',
      subject: '',
      teacher: '',
      room: ''
    });
    setIsAddScheduleModalOpen(true);
  };

  const handleAddScheduleFormChange = (e) => {
    setAddScheduleData({ ...addScheduleData, [e.target.name]: e.target.value });
  };

  const handleAddScheduleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Adding new schedule:', addScheduleData); // Log the new schedule data
    await handleCreate(addScheduleData);
    setIsAddScheduleModalOpen(false);
  };

  const handleEdit = async (id, updatedEntry) => {
    try {
      console.log(`Editing timetable entry with id: ${id}`, updatedEntry); // Log the entry being updated
      const response = await fetch(`http://localhost:5000/api/timetable/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
      });

      if (response.ok) {
        alert('Timetable entry updated successfully');
        fetchTimetableData(); // Refetch data after update
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating timetable entry:', error);
      alert(`An error occurred while updating the timetable entry: ${error.message}`);
    }
  };

  const handleEditClick = (schedule) => {
    setFormData({
      day: schedule.day,
      time: schedule.time,
      grade: schedule.grade,
      section: schedule.section,
      subject: schedule.subject,
      teacher: schedule.teacher,
      room: schedule.room,
    });
    setEditingId(schedule.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="timetable-container">
      <div className="header">
        <div>
          <h2 className="title">Timetable Management</h2>
          <p className="subtitle">Configure and manage class schedules</p>
        </div>
        <button
          className="add-schedule-button"
          onClick={handleAddScheduleClick}
        >
          Add Schedule
        </button>
      </div>

      <div className="selectors">
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="grade-select"
        >
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
        </select>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="section-select"
        >
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
      </div>

      <div className="timetable">
        <div className="table-container">
          <table className="schedule-table">
            <thead className="table-header">
              <tr>
                <th className="time-header">Time</th>
                {weekDays.map((day) => (
                  <th key={day} className="day-header">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table-body">
              {timeSlots.map((slot) => (
                <tr key={slot}>
                  <td className="time-slot">
                    <div className="time-slot-content">
                      <Clock className="clock-icon" />
                      <span className="time-text">{slot}</span>
                    </div>
                  </td>
                  {weekDays.map((day) => {
                    const schedule = timeTableData.find(
                      (t) => t.day === day && t.time === slot
                    );
                    return (
                      <td key={`${day}-${slot}`} className="schedule-cell">
                        {schedule ? (
                          <div className="schedule-details">
                            <div className="schedule-header">
                              <div className="subject">{schedule.subject}</div>
                              <div className="action-buttons">
                                <button
                                  className="edit-button"
                                  onClick={() => handleEditClick(schedule)}
                                >
                                  <Edit className="edit-icon" />
                                </button>
                                <button
                                  className="delete-button"
                                  onClick={() => handleDelete(schedule.id)}
                                >
                                  <Trash2 className="delete-icon trash-icon-red" />
                                </button>
                              </div>
                            </div>
                            <div className="teacher-room">
                              <div className="teacher-info">
                                <User className="teacher-icon" style={{ marginRight: '8px' }} />
                                <span>{schedule.teacher}</span>
                              </div>
                              <div className="room-info">
                                <Building2 className="room-icon" />
                                <span>Room No.{schedule.room}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button 
                            className="add-schedule-placeholder"
                            onClick={() => handleAddScheduleClick(day, slot)}
                          >
                            <Plus className="plus-icon" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleFormSubmit}>
              <label>
                Subject:
                <input type="text" name="subject" value={formData.subject} onChange={handleFormChange} />
              </label>
              <label>
                Teacher:
                <input type="text" name="teacher" value={formData.teacher} onChange={handleFormChange} />
              </label>
              <label>
                Room:
                <input type="text" name="room" value={formData.room} onChange={handleFormChange} />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {isAddScheduleModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleAddScheduleFormSubmit}>
              <label>
                Grade:
                <select name="grade" value={addScheduleData.grade} onChange={handleAddScheduleFormChange}>
                  <option value="">Select Grade</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </label>
              <label>
                Section:
                <select name="section" value={addScheduleData.section} onChange={handleAddScheduleFormChange}>
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </label>
              <label>
                Day:
                <select name="day" value={addScheduleData.day} onChange={handleAddScheduleFormChange}>
                  {weekDays.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </label>
              <label>
                Time:
                <select name="time" value={addScheduleData.time} onChange={handleAddScheduleFormChange}>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </label>
              <label>
                Subject:
                <input type="text" name="subject" value={addScheduleData.subject} onChange={handleAddScheduleFormChange} />
              </label>
              <label>
                Teacher:
                <input type="text" name="teacher" value={addScheduleData.teacher} onChange={handleAddScheduleFormChange} />
              </label>
              <label>
                Room:
                <input type="text" name="room" value={addScheduleData.room} onChange={handleAddScheduleFormChange} />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsAddScheduleModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

