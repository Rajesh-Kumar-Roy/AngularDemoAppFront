using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.DtoModels.PaymentDto
{
    public class PaymentDto: IEntity,IDelete
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public double VatAmount { get; set; }
        public double Pay { get; set; }
        public double Due { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime? DuePaymentDate { get; set; }

        public int PaymentOptionId { get; set; }
        public int? MobBankTypeId { get; set; }
        public string MobileBankingNo { get; set; }
        public string MobBankRefNo { get; set; }
        public string BankName { get; set; }
        public string CheckNo { get; set; }
        public DateTime CheckIssueDate { get; set; }

        public string CardHolderName { get; set; }
        public string CardNo { get; set; }
        public int CardEndMonth { get; set; }
        public int CardEndYear { get; set; }
        public string CVVNo { get; set; }



        public int PaymentTypeId { get; set; }
        public int OperationId { get; set; }
        public string OperationBy { get; set; }
        public PaymentType PaymentType { get; set; }
        public PaymentOption PaymentOption { get; set; }

        public MobileBankingType MobBankType { get; set; }
        public bool IsDelete { get; set; }
    }
}
