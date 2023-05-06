import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environment/environment';
import { CountryPopulation } from './country-population';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-population',
  templateUrl: './country-population.component.html',
  styleUrls: ['./country-population.component.css']
})
export class CountryPopulationComponent implements OnInit {
  countryPopulation?: CountryPopulation
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    let url = environment.baseUrl + `api/Countries/Population/${idParam}`;
    this.http.get<CountryPopulation>(url).subscribe(result => {
      this.countryPopulation = result;
    });
  }

}
