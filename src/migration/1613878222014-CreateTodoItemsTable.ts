import {MigrationInterface, Table, QueryRunner} from "typeorm";

export class CreateTodoItemsTable1613878222014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "todo_item",
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
                    name: "status",
                    type: "int",
                    default: 0
                },
                {
                    name: "created_at",
                    type: "timestamp",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("todo_item");
    }

}
