import {MigrationInterface, Table, QueryRunner, TableForeignKey} from "typeorm";

export class CreateTodoItemsTable1613878222014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
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
          'todo_item',
          new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: "user",
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("todo_item");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("todo_item", foreignKey!);
        await queryRunner.dropTable("user");
        await queryRunner.dropTable("todo_item");
    }

}
