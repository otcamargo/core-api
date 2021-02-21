import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn()
    id!: number;
    
  @Column({
    type: 'timestamp',
    width: 11,
    nullable: false,
    readonly: true,
    default: () => 'now()',
  })
  @Type(() => Date)
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    width: 11,
    nullable: true,
    default: () => null,
  })
  @Type(() => Date)
  updatedAt!: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }

}
