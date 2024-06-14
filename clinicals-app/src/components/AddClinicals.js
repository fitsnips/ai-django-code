import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddClinicals = () => {
  const [patient, setPatient] = useState(null);
  const { patientId } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/clinicalservices/api/patients/' + patientId + '/');
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const componentName = document.getElementById('component_name').value;
    const componentValues = document.getElementById('component_values').value;
    try {
      await axios.post('http://localhost:8000/clinicalservices/api/clinicaldata/', {
        patient: patientId,
        component_name: componentName,
        component_value: componentValues,
      });
      toast.success('Clinical data saved successfully');
    } catch (error) {
      console.error('Error saving clinical data:', error);
    }
  }

  return (
    <div>
      {patient ? (
        <div>
          <h2>Patient Details</h2>
          Patient Name: <h2>{patient.first_name} {patient.last_name}</h2>
          <p>Age: {patient.age}</p>
          <form>
            <h3>Add Clinicals</h3>
            <div>
              <label htmlFor="component_name">Component Name:</label>
              <input type="text" id="component_name" name="component_name" />
            </div>
            <div>
              <label htmlFor="component_values">Component Values:</label>
              <input type="text" id="component_values" name="component_values" />
            </div>
            <button type="submit" onClick={handleSubmit}>Save</button>
          </form>
        </div>
      ) : (
        <p>Loading patient details...</p>
      )}
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default AddClinicals;