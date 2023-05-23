import { Component,NgModule } from '@angular/core';
// import { AgmCoreModule } from '@agm/core';

// @NgModule({
//   imports: [
//      AgmCoreModule
//    ]
//  });
@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})

export class LocalisationComponent {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
}
