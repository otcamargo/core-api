import {MigrationInterface, Table, QueryRunner} from "typeorm";

export class CreateTodoItemsTable1613878222014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "todoItem",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "content",
                    type: "varchar",
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: "status",
                    type: "int",
                    default: 0
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("todoItem");
    }

}
