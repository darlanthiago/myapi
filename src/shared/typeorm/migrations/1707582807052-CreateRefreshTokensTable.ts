import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshTokensTable1707582807052
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "user_id", type: "uuid" },
          { name: "token", type: "varchar", isUnique: true },
          { name: "valid", type: "boolean", default: true },
          { name: "expires", type: "timestamp" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "refresh_tokens_users",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("refresh_tokens");
  }
}
