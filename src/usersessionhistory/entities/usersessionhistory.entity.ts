import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usersessionhistory {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: string;

	@Column()
	startTime: Date;

	@Column()
	endTime: Date;
}
