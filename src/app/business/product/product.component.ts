import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  products = [
    {
      name: 'Product 1',
      description: 'Description 1',
      image: 'assets/img/pizza-1.jpg',
      price: 100,
      category : 'Pizza'
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      image: 'assets/img/pizza-2.jpg',
      price: 200,
      category : 'Canelon'
    },
    {
      name: 'Product 3',
      description: 'Description 3',
      image: 'assets/img/pizza-3.jpg',
      price: 300,
      category : 'Hamburgueza'
    },
    {
      name: 'Product 1',
      description: 'Description 1',
      image: 'assets/img/pizza-1.jpg',
      price: 100,
      category : 'Pizza'
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      image: 'assets/img/pizza-2.jpg',
      price: 200,
      category : 'Canelon'
    },
    {
      name: 'Product 3',
      description: 'Description 3',
      image: 'assets/img/pizza-3.jpg',
      price: 300,
      category : 'Hamburgueza'
    }
  ]

  public selectedCategory = '';
  filteredProducts = this.products;
  uniqueCategories: string[] = [];

  constructor() {
    this.getUniqueCategories();
  }

  getUniqueCategories() {
    this.uniqueCategories = [...new Set(this.products.map(product => product.category))];
  }

  filterProducts() {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
  }
}
