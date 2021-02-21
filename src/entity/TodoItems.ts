import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TodoItems {

    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    user_id!: number;

    @Column()
    content!: string;

    @Column()
    status!: number;

}
