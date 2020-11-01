using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopApplication.Context.Migrations
{
    public partial class payment_table_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<double>(nullable: false),
                    VatAmount = table.Column<double>(nullable: false),
                    Pay = table.Column<double>(nullable: false),
                    Due = table.Column<double>(nullable: false),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    DuePaymentDate = table.Column<DateTime>(nullable: true),
                    PaymentOptionId = table.Column<int>(nullable: false),
                    MobBankTypeId = table.Column<int>(nullable: true),
                    MobileBankingNo = table.Column<string>(nullable: true),
                    MobBankRefNo = table.Column<string>(nullable: true),
                    BankName = table.Column<string>(nullable: true),
                    CheckNo = table.Column<string>(nullable: true),
                    CheckIssueDate = table.Column<DateTime>(nullable: false),
                    CardHolderName = table.Column<string>(nullable: true),
                    CardNo = table.Column<string>(nullable: true),
                    CardEndMonth = table.Column<int>(nullable: false),
                    CardEndYear = table.Column<int>(nullable: false),
                    CVVNo = table.Column<string>(nullable: true),
                    PaymentTypeId = table.Column<int>(nullable: true),
                    OperationId = table.Column<int>(nullable: false),
                    OperationBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_MobileBankingType_MobBankTypeId",
                        column: x => x.MobBankTypeId,
                        principalTable: "MobileBankingType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Payments_PaymentOption_PaymentOptionId",
                        column: x => x.PaymentOptionId,
                        principalTable: "PaymentOption",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payments_PaymentType_PaymentTypeId",
                        column: x => x.PaymentTypeId,
                        principalTable: "PaymentType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_MobBankTypeId",
                table: "Payments",
                column: "MobBankTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_PaymentOptionId",
                table: "Payments",
                column: "PaymentOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_PaymentTypeId",
                table: "Payments",
                column: "PaymentTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payments");
        }
    }
}
