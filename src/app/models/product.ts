import * as _ from 'lodash'
import { IProduct } from '../interfaces/iproduct';

export class Product implements IProduct{
    constructor(data){
        _.set(this, 'data', data)
    }

    get price(): number{
        return _.get(this, 'data.price')
    }
    
    get name(): string{
        return _.get(this, 'data.name')
    }
    
    get img(): string{
        return _.get(this, 'data.img')
    }
    
    get extras(): any[]{
        return _.get(this, 'data.extras')
    }
    
    get quantity(): number{
        return _.get(this, 'data.quantity')
    }

    set quantity(value: number){
        _.set(this, 'data.quantity', value)
    }

    getExtras(){
        const extras = []
        _.forEach(this.extras, extra => {
            const products = extra.products

            _.forEach(products, product => {
                if(product.selectedOption){
                    extras.push({
                        "name": product.name,
                        "selected": product.selectedOption.name
                    })
                }else if(product.options[0].activate){
                    extras.push({
                        "name": product.name
                    })
                }
            })
        })

        return extras
    }

    totalPrice(){
        let total = this.price

        _.forEach(this.extras, extra => {
            const products = extra.products

            _.forEach(products, product => {
                if(product.selectedOption){
                    total += product.selectedOption.price
                    
                }else if(product.options[0].activate){
                    total += product.options[0].price
                }
            })
        })

        return total
    }
}
