import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environment/environment';
import { CountryPopulation } from './country-population';
import { Country } from './country';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {
  country?: Country;
  form!: FormGroup;
  id!: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl(''),
        iso2: new FormControl(''),
        iso3: new FormControl(''),
      }
    );

    this.loadData();
  }

  loadData(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    let url = environment.baseUrl + `api/Countries/${idParam}`;
    this.http.get<Country>(url).subscribe(result => {
      this.country = result;
      this.form.patchValue(this.country);
    });
  }

  onSubmit() {
    let country = this.country!;

    country.name = this.form.controls['name'].value;
    country.iso2 = this.form.controls['iso2'].value;
    country.iso3 = this.form.controls['iso3'].value;

    let url = environment.baseUrl + `api/Countries/${country.id}`;

    this.http.put<Country>(url, country).subscribe({
      next: () => {
        console.log(`Country ${country.id} was updated successfully`);
        this.router.navigate(['/countries']);
      }
    });
  }

}
