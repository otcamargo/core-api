import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class TodoItem extends BaseEntity {

    @ManyToOne(() => User, user => user.todoItems)
    userId!: User;

    @Column({
        nullable: false
    })
    title!: string;

    @Column()
    content!: string;

    @Column({
        default: 0,
    })
    status!: number;
}
