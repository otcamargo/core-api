import {MigrationInterface, QueryRunner, getRepository, Table, TableForeignKey} from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1613884848314 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
          {
              name: "id",
              type: "int",
              isPrimary: true
          },
          {
              name: "username",
              type: "varchar",
          },
          {
              name: "password",
              type: "int",
          },
          {
              name: "role",
              type: "varchar"
          },
          {
              name: "createdAt",
              type: "timestamp",
          },
          {
              name: "updatedAt",
              type: "timestamp",
          }
      ]
  }), true)

  await queryRunner.createForeignKey(
    'todoItem',
    new TableForeignKey({
      columnNames: ['userId'],
      referencedTableName: "user",
      referencedColumnNames: ['id']
    })
  );

  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable("user");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
    await queryRunner.dropTable("user");
    await queryRunner.dropForeignKey("user", foreignKey!);
  }

}
