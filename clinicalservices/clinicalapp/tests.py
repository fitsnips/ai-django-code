from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework import status
from .models import Patient

class PatientViewSetTestCase(APITestCase):
    def setUp(self):
        self.list_url = reverse('patient-list')
        self.patient_data = {'first_name': 'Test', 'last_name': 'Patient', 'age': 40}

    def test_create_patient(self):
        response = self.client.post(self.list_url, self.patient_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Patient.objects.count(), 1)
        self.assertEqual(Patient.objects.get().first_name, 'Test')
        self.assertEqual(Patient.objects.get().last_name, 'Patient')
        self.assertEqual(Patient.objects.get().age, 40)

    def test_read_patient(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_patient(self):
        patient = Patient.objects.create(**self.patient_data)
        new_data = {'first_name': 'Updated', 'last_name': 'Patient', 'age': 40}
        detail_url = reverse('patient-detail', args=[patient.id])
        response = self.client.put(detail_url, new_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Patient.objects.get().first_name, 'Updated')
        
    def test_delete_patient(self):
        patient = Patient.objects.create(**self.patient_data)
        detail_url = reverse('patient-detail', args=[patient.id])
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Patient.objects.count(), 0)      

    def test_get_all_patients(self):
        patient_1 = Patient.objects.create(first_name='Test', last_name='Patient', age=40)
        patient_2 = Patient.objects.create(first_name='Another', last_name='Patient', age=30)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['first_name'], 'Test')
        self.assertEqual(response.data[1]['first_name'], 'Another')
