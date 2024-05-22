import { Component } from '@angular/core';
import { scheduled } from 'rxjs';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent {
  restaurants = [
    {
      name: 'Restaurant 1',
      description: 'Description 1',
      image: 'assets/img/restaurant.jpg',
      address: 'Direccion 1',
      phone: '123456789',
      scheduled: 'Horario 1'
    },
    {
      name: 'Restaurant 2',
      description: 'Description 2',
      image: 'assets/img/restaurant.jpg',
      address: 'Direccion 2',
      phone: '123456789',
      scheduled: 'Horario 2'
    },
    {
      name: 'Restaurant 3',
      description: 'Description 3',
      image: 'assets/img/restaurant.jpg',
      address: 'Direccion 3',
      phone: '123456789',
      scheduled: 'Horario 3'
    }
  ]
}
