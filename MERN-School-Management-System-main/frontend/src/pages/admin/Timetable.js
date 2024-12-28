import React, { useEffect, useState } from 'react';

const Timetable = () => {
    const [classes, setClasses] = useState([]);
    const [time, setTime] = useState('');
    const [subject, setSubject] = useState('');
    const [teacher, setTeacher] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await fetch('http://localhost:5000/api/classes');
            const data = await response.json();
            setClasses(data);
        };

        fetchClasses();
    }, []);

    const handleAddClass = async (e) => {
        e.preventDefault();
        const newClass = { time, subject, teacher };
        const response = await fetch('http://localhost:5000/api/classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClass),
        });
        const data = await response.json();
        setClasses([...classes, data]);
        setTime('');
        setSubject('');
        setTeacher('');
    };

    return (
        <div>
            <h1>Timetable</h1>
            <form onSubmit={handleAddClass}>
                <input
                    type="text"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Teacher"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    required
                />
                <button type="submit">Add Class</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((cls) => (
                        <tr key={cls.id}>
                            <td>{cls.time}</td>
                            <td>{cls.subject}</td>
                            <td>{cls.teacher}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Timetable;
