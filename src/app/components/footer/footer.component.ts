import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @ViewChild("modal_order", {static: false}) modal_order
  @ViewChild("modal_num_order", {static: false}) modal_num_order

  constructor(
    private modalService: NgbModal,
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

  openModalOrder(){
    this.modalService.open(this.modal_order, {windowClass: 'my-modal-dialog'}).result.then(result => {
      if(result === 'yes'){
        console.log('Vamos a crear el pedido')
        this.orderService.createOrder().subscribe(data => {
          this.orderService.clearOrder()
          this.modalService.open(this.modal_num_order)
        }, error => {
          console.log("Se ha producido un error:", error)
        })
      }else{
        console.log('Se ha cancelado el pedido')
      }
    })
  }

}
