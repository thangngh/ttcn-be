import { UserRole } from "src/common/common.interface";
import { CommonEntity } from "src/common/entites/common.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("customers")
export class Customer {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	userId!: string;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.USER,
	})
	role!: UserRole;

	@OneToOne(() => User, user => user.customer)
	@JoinColumn({
		name: "userId",
	})
	user!: User;
}
