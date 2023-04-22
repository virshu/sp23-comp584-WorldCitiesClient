import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {
  public countries!: Country[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let url = environment.baseUrl + 'api/Countries';
    this.http.get<Country[]>(url).subscribe(result => {
      this.countries = result;
    });
  }
}
