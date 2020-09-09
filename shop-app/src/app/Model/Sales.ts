import{SalesDetails} from '../Model/SaleDetails';
export class Sales{
    id: number;
    customerName: number;
    saleNo: string;
    phoneNo: string;
    address: string;
    email: string;
    
    firstName: string;
    lastName: string;
    description: string;
    date: Date = new Date();
    productValueCheck: number;
    details: SalesDetails[];
}