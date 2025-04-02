import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { MedicationSearchComponent } from './medication-search/medication-search.component';
import { DosageCorrectionComponent } from './dosage-correction/dosage-correction.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'drug-details/:rxcui', component: DrugDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tracking-list', component: TrackingListComponent },
    { path: 'medication-search', component: MedicationSearchComponent },
    { path: 'dosage-correction', component: DosageCorrectionComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
