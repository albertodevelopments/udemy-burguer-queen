import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash'
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _data: any
  private _dataOriginal: any
  private _selectedProducts: Product[]
  private _selectedProduct: Product

  constructor(private http: HttpClient) { }

  getCategories(){
    return _.get(this._data, 'categories')
  }

  public getData(){
    return new Promise((resolve, reject) => {
      this.http.get('../../assets/data/products.json').subscribe(data => {

        this._data = _.cloneDeep(data)
        this._dataOriginal = _.cloneDeep(data)
        resolve(true)
      }, error => {
        console.error('Error al recuperar los pedidos', error)
        reject(true)
      })
    })
  }

  get selectedProducts(): Product[]{
    return this._selectedProducts
  }

  set selectedProducts(value: Product[]){
    this._selectedProducts = value
  }

  get selectedProduct(): Product{
    return this._selectedProduct
  }

  set selectedProduct(value: Product){
    this._selectedProduct = value
  }

  resetProducts(){
    this._data = _.cloneDeep(this._dataOriginal)
  }
}
