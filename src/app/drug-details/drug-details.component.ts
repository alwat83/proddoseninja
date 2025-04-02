import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Drug } from '../drug';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-drug-details',
    templateUrl: './drug-details.component.html',
    styleUrls: ['./drug-details.component.css'],
    standalone: true,
    imports: [CommonModule, HttpClientModule]
})
export class DrugDetailsComponent implements OnInit {
    drug: Drug | undefined;
    errorMessage: string | undefined;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit() {
        const rxcui = this.route.snapshot.paramMap.get('rxcui');
        console.log("rxcui: ", rxcui)
        if (rxcui) {
          this.getDrugDetails(rxcui).subscribe({
            next: (drug) => {
              this.drug = drug;
              this.errorMessage = undefined;
              console.log("Drug: ", this.drug)
            },
            error: (error) => {
              this.drug = undefined;
              this.errorMessage = 'Failed to fetch drug details.';
              console.error("Error fetching drug details: ", error);
            }
          });
        }
    }

    getDrugDetails(rxcui: string): Observable<Drug> {
        const url = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/related.json?tty=IN`;
        return this.http.get(url).pipe(
            map((response: any) => {
                console.log("API response: ", response)
                if (response && response.relatedGroup && response.relatedGroup.conceptGroup) {
                    const properties = response.relatedGroup.conceptGroup.flatMap((group:any) => {
                      return Array.isArray(group.conceptProperties) ? group.conceptProperties : [];
                    });
                    console.log("API concept properties: ", properties)
                    let name = 'Name not available';
                    let description = 'Description not available';

                    if (properties.length > 0) {
                      const nameProp = properties.find((prop:any) => prop.name);
                      name = nameProp ? nameProp.name : 'Name not available';
                      const descriptionProp = properties.find((prop:any) => prop.synonym);
                      description = descriptionProp ? descriptionProp.synonym : 'Description not available';
                    }

                    return {
                        id: parseInt(rxcui), // We don't have the id in the response
                        name: name,
                        description: description,
                        genericDosage: '',
                        frequency: '',
                        indications: '',
                        sideEffects: '',
                        precautions: ''
                    };
                } else {
                    throw new Error('Invalid API response');
                }
            }),
            catchError((error) => {
                console.error('API error:', error);
                return throwError(() => error); // Re-throw the error
            })
        );
    }
}
