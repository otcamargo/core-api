import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export type Status = "created" | "done"

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
        type: "enum",
        enum: ["created", "in_progress", "done"],
        default: "created",
    })
    status!: Status;
}
