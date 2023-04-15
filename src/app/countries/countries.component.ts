import { Component } from '@angular/core';
import { Country } from './country';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {
  public countries: Country[] = [];

  constructor(http: HttpClient) {
    http.get<Country[]>(environment.baseUrl + 'api/Countries').subscribe(result => {
      this.countries = result;
    }, error => console.error(error));
}

}
