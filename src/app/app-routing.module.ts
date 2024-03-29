import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { LoginComponent } from './auth/login.component';
import { CountryPopulationComponent } from './countries/country-population.component';
import { CountryEditComponent } from './countries/country-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countrypopulation/:id', component: CountryPopulationComponent },
  { path: 'countryedit/:id', component: CountryEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fetch-data', component: FetchDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
