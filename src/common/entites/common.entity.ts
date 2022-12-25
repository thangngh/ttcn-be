import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommonEntity extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdat!: Date;

	@Column({
		type: "timestamp",
		default: null
	})
	updatedat?: Date;

	@Column({
		type: "timestamp",
		default: null
	})
	deletedat?: Date;
}