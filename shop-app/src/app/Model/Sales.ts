import { SalesDetails } from '../Model/SaleDetails';
export class Sales {
    id = 0;
    customerId = 0;
    customerName = '';
    saleNo = '';
    description = '';
    date: Date = new Date();
    productValueCheck: number;
    isDelete = false;
    salesDetails: SalesDetails[];
}
