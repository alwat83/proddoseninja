import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Drug } from '../drug';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Interfaces for XML response
interface XmlConceptProperty {
    rxcui: string;
    name: string;
    synonym: string;
    tty: string;
    language: string;
    suppress: string;
    umlscui: string;
}

interface XmlConceptGroup {
    tty: string;
    conceptProperties?: XmlConceptProperty[];
}

interface XmlDrugGroup {
    conceptGroup: XmlConceptGroup[];
}

interface XmlApiResponse {
    drugGroup: XmlDrugGroup;
}

// Interfaces for JSON response
interface JsonConceptProperty {
    rxcui: string;
    name: string;
    synonym: string;
}

interface JsonConceptGroup {
    conceptProperties: JsonConceptProperty[];
}

interface JsonDrugGroup {
    conceptGroup: JsonConceptGroup[];
}

interface JsonApiResponse {
    drugGroup: JsonDrugGroup;
}

@Component({
    selector: 'app-medication-search',
    templateUrl: './medication-search.component.html',
    styleUrls: ['./medication-search.component.css'],
    imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
    standalone: true
})
export class MedicationSearchComponent implements OnInit {
    searchTerm: string = '';
    searchResults: { name: string; description: string; rxcui: string }[] = [];
    private apiUrl = 'https://rxnav.nlm.nih.gov/REST/drugs'; // Correct API URL

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    searchDrugs() {
        console.log("Search drugs method called with the term: ", this.searchTerm)
        if (this.searchTerm) {
            const url = `${this.apiUrl}?name=${this.searchTerm}`;
            console.log("API Url: ", url)
            this.http.get(url, { responseType: 'text' }).pipe(
                map((response: string) => {
                    console.log("API response: ", response)
                    if (response.startsWith('<')) {
                        // Handle XML response
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(response, "text/xml");
                        return this.parseXmlResponse(xmlDoc);
                    } else {
                        // Handle JSON response
                        const jsonResponse: JsonApiResponse = JSON.parse(response);
                        return this.parseJsonResponse(jsonResponse);
                    }
                })
            ).subscribe((results: { name: string; description: string; rxcui: string }[]) => {
                console.log("API Results: ", results)
                this.searchResults = results;
                console.log("Search Results: ", this.searchResults)
            });
        } else {
            this.searchResults = [];
        }
    }
    private parseXmlResponse(xmlDoc: XMLDocument): { name: string; description: string; rxcui: string }[] {
        const conceptProperties = xmlDoc.querySelectorAll('conceptProperties');
        const results: { name: string; description: string; rxcui: string }[] = [];

        conceptProperties.forEach(cp => {
            const name = cp.querySelector('name')?.textContent;
            const synonym = cp.querySelector('synonym')?.textContent;
            const rxcui = cp.querySelector('rxcui')?.textContent;
            if (name && synonym && rxcui) {
                results.push({ name, description: synonym, rxcui });
            }
        });
        return results;
    }

    private parseJsonResponse(response: JsonApiResponse): { name: string; description: string; rxcui: string }[] {
        if (response && response.drugGroup && response.drugGroup.conceptGroup) {
            return response.drugGroup.conceptGroup.flatMap(group => {
              if(group && group.conceptProperties){
                return group.conceptProperties.map((prop: JsonConceptProperty) => ({
                    name: prop.name,
                    description: prop.synonym,
                    rxcui: prop.rxcui
                }))
              } else {
                return [];
              }
            }
            );
        } else {
            return [];
        }
    }
}
