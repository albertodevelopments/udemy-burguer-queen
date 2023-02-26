import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-products-order',
  templateUrl: './products-order.component.html',
  styleUrls: ['./products-order.component.css']
})
export class ProductsOrderComponent implements OnInit {

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

}
