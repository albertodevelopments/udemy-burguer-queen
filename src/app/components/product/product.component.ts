import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild("modal_add_product", {static: false}) modalAddProduct

  public product: Product
  public loadProduct: boolean
  public extras: any
  public selectedExtra: number

  constructor(
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private modalService: NgbModal
  ) { 
    this.product = null
    this.extras = null
    this.selectedExtra = 0
    this.loadProduct = false
  }

  ngOnInit(): void {

    if(!this.productService.selectedProduct){
      this.router.navigate(['/list-categories'])
    }else{
      this.product = new Product(this.productService.selectedProduct)

      if(this.product.extras){
        this.extras = this.product.extras[this.selectedExtra]
      }

      this.loadProduct = true
    }
  }

  hasPrevious(): boolean{
    if(!this.product || !this.product.extras){
      return false
    }
    return this.product.extras[this.selectedExtra - 1]
  }

  hasNext(): boolean{
    if(!this.product.extras){
      return false
    }
    return this.product.extras[this.selectedExtra + 1]
  }

  previous(){
    this.selectedExtra = this.selectedExtra - 1
    this.extras = this.product.extras[this.selectedExtra]
  }

  next(){
    this.selectedExtra = this.selectedExtra + 1
    this.extras = this.product.extras[this.selectedExtra]
  }

  addProductOrder(){
    this.orderService.order.addProduct(this.product)

    console.log(this.orderService.order)

    this.modalService.open(this.modalAddProduct)
    this.productService.resetProducts()
    this.router.navigate(['/list-categories'])
  }

}
