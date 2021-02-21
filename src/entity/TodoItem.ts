import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class TodoItem extends BaseEntity {

    @Column()
    user_id!: number;

    @Column()
    content!: string;

    @Column()
    status!: number;

}
