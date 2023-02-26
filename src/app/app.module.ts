import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './services/translate.service';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { ProductService } from './services/product.service';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductComponent } from './components/product/product.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsOrderComponent } from './components/products-order/products-order.component';

export const translateFactory = (provider: TranslateService) => {
  return () => provider.getData()
}

export const productFactory = (provider: ProductService) => {
  return () => provider.getData()
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    ListCategoriesComponent,
    ListProductsComponent,
    ProductComponent,
    ProductsOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    ProductService,
    {
      provide: APP_INITIALIZER,
      useFactory: productFactory,
      deps: [ProductService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
