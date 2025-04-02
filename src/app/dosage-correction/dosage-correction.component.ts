import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dosage-correction',
  templateUrl: './dosage-correction.component.html',
  styleUrls: ['./dosage-correction.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class DosageCorrectionComponent implements OnInit {
  correctionForm: FormGroup;
  submitted = false;
  allDrugs: any = [];

  constructor(private fb: FormBuilder) {
    this.correctionForm = this.fb.group({
      drugName: ['', Validators.required],
      patientWeight: ['', Validators.required],
      patientAge: ['', Validators.required],
      patientCreatinine: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.allDrugs = [
      { id: 1, name: 'Acetaminophen', description: 'Used to treat pain and reduce fever', genericDosage: '325-650 mg', frequency: 'Every 4-6 hours as needed', indications: 'Pain, fever', sideEffects: 'Rare', precautions: 'Liver disease' },
      { id: 2, name: 'Ibuprofen', description: 'Used to treat pain, fever, and inflammation', genericDosage: '200-400 mg', frequency: 'Every 4-6 hours as needed', indications: 'Pain, fever, inflammation', sideEffects: 'Upset stomach, headache', precautions: 'Stomach ulcers, kidney disease' },
      { id: 3, name: 'Amoxicillin', description: 'Used to treat bacterial infections', genericDosage: '250-500 mg', frequency: 'Every 8 hours', indications: 'Bacterial infections', sideEffects: 'Diarrhea, nausea', precautions: 'Penicillin allergy' },
      { id: 4, name: 'Levothyroxine', description: 'Used to treat hypothyroidism', genericDosage: '25-300 mcg', frequency: 'Once daily', indications: 'Hypothyroidism', sideEffects: 'Weight loss, anxiety, tremors', precautions: 'Heart disease' },
      { id: 5, name: 'Amlodipine', description: 'Used to treat high blood pressure and chest pain', genericDosage: '2.5-10 mg', frequency: 'Once daily', indications: 'Hypertension, angina', sideEffects: 'Swelling, dizziness, headache', precautions: 'Heart failure' },
      { id: 6, name: 'Metoprolol', description: 'Used to treat high blood pressure and heart problems', genericDosage: '25-450 mg', frequency: '1-3 times daily', indications: 'Hypertension, angina, heart failure', sideEffects: 'Dizziness, fatigue, slow heart rate', precautions: 'Asthma' },
      { id: 7, name: 'Simvastatin', description: 'Used to lower cholesterol', genericDosage: '5-40 mg', frequency: 'Once daily', indications: 'High cholesterol, prevention of cardiovascular disease', sideEffects: 'Muscle pain, nausea, headache', precautions: 'Liver disease' },
      { id: 8, name: 'Omeprazole', description: 'Used to treat heartburn and acid reflux', genericDosage: '10-40 mg', frequency: 'Once daily', indications: 'GERD, ulcers', sideEffects: 'Headache, diarrhea, stomach pain', precautions: 'Long-term use' },
      { id: 9, name: 'Losartan', description: 'Used to treat high blood pressure', genericDosage: '25-100 mg', frequency: 'Once daily', indications: 'Hypertension', sideEffects: 'Dizziness, headache', precautions: 'Pregnancy' },
      { id: 10, name: 'Albuterol', description: 'Used to treat asthma and breathing problems', genericDosage: '2-4 mg', frequency: '3-4 times daily', indications: 'Asthma, COPD', sideEffects: 'Tremors, nervousness, increased heart rate', precautions: 'Heart disease' },
      { id: 11, name: 'Gabapentin', description: 'Used to treat seizures and nerve pain', genericDosage: '300-3600 mg', frequency: '3 times daily', indications: 'Seizures, nerve pain', sideEffects: 'Dizziness, drowsiness, fatigue', precautions: 'Kidney disease' },
      { id: 12, name: 'Hydrochlorothiazide', description: 'Used to treat high blood pressure and fluid retention', genericDosage: '12.5-50 mg', frequency: 'Once daily', indications: 'Hypertension, edema', sideEffects: 'Dizziness, headache, dehydration', precautions: 'Kidney disease, diabetes' },
    ];
  }

  onSubmit() {
    this.submitted = true;
    if (this.correctionForm.valid) {
      console.log('Form submitted:', this.correctionForm.value);
    }
  }
}
