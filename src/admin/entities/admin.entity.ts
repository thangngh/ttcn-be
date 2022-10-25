import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
export class Admin extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;
}
