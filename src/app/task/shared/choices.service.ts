import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Choice } from './choices';

@Injectable({
  providedIn: 'root'
})
export class ChoicesService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getChoices(index: number, rows: number): Observable<Choice[]> {
    // Specify the type for the response
    return this.http.get<Choice[]>(`${this.apiUrl}choices`).pipe(
      map((choices: Choice[]) => {
        // Calculate the start and end index for the desired range
        // const startIndex = index * rows;
        const startIndex = index;
        const endIndex = startIndex + rows;

        // Return the choices within the specified range
        return choices.slice(startIndex, endIndex);
      })
    );
  }


  addTargetChoice(fieldName: string = "TargetChoices", data: any[]) {
    return this.http.post<any>(this.apiUrl + fieldName, data);
  }

}
