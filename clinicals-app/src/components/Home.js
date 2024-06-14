import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/clinicalservices/api/patients/');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Patients</h1>
      <table align='center' width='80%'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Clinical Data</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.first_name}</td>
              <td>{patient.last_name}</td>
              <td>{patient.age}</td>
              <td><Link to={`/addClinicals/${patient.id}/`}>Add Clinical Data</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/addPatient">Add Patient</Link>
    </div>
  );
}


export default Home;