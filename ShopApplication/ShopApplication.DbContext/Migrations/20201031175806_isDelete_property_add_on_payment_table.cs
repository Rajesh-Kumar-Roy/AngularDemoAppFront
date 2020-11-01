using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopApplication.Context.Migrations
{
    public partial class isDelete_property_add_on_payment_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Payments",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Payments");
        }
    }
}
