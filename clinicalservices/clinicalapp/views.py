from django.shortcuts import render
from rest_framework import viewsets
from .models import Patient,ClinicalData
from .serializers import PatientSerializer,ClinicalDataSerializer

# Create your views here.
# viewset for patient that uses the patient serializer
class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

# viewset for clinical data that uses the clinical data serializer
class ClinicalDataViewSet(viewsets.ModelViewSet):
    queryset = ClinicalData.objects.all()
    serializer_class = ClinicalDataSerializer
