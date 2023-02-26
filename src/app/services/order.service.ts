import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import * as _ from 'lodash'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _order: Order;
  private _numOrder: number

  constructor(
    private http: HttpClient
  ) { 
    this._order = new Order({})
    this._numOrder = 1
  }

  public get numOrder(): number {
    return this._numOrder;
  }
  public set numOrder(value: number) {
    this._numOrder = value;
  }

  public get order(): Order{
    return this._order
  }

  public set order(value: Order){
    this._order = value
  }

  convertOrder(){
    const finalOrder = {
      "products": [],
      "date": new Date(),
      "numOrder": this._numOrder,
      "priceOrder": this.order.totalOrder()
    }

    _.forEach(this.order.productsOrder, product => {
      const finalProduct = {
        "name": product.name,
        "finalPrice": product.totalPrice() * product.quantity,
        "extras": product.getExtras(),
        "quantity": product.quantity
      }

      finalOrder.products.push(finalProduct)
    })

    this._numOrder++

    return finalOrder
  }

  createOrder(): Observable<any>{
    let headers = new HttpHeaders()
    headers = headers.set('Content-type', 'application/json')

    const url = "https://burguer-queen-93e42-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
    const body = JSON.stringify(this.convertOrder())

    return this.http.post(url, body, {headers})

  }

  clearOrder(){
    this.order = new Order({})
  }
}
