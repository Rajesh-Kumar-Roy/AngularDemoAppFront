import{SalesDetails} from '../Model/SaleDetails';
export class Sales{
    id: number;
    customerName: number;
    phoneNo: string;
    address: string;
    description: string;
    date: Date = new Date();
    productValueCheck: number;
    details: SalesDetails[];
}