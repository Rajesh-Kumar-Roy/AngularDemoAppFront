import { SalesDetails } from '../Model/SaleDetails';
export class Sales {
    id = 0;
    customerId = 0;
    customerName = '';
    saleNo = '';
    description = '';
    date: Date = new Date();
    paymentStatusId = 0;
    isDelete = false;
    salesDetails: SalesDetails[];
}
