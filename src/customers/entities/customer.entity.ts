import { UserRole } from "src/common/common.interface";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class Customer extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.USER,
	})
	role!: UserRole;

	@Column({
		name: "user_id"
	})
	userId?: string;

	@OneToOne(() => User, (user) => user.customer)
	@JoinColumn({
		name: "user_id"
	})
	user!: User;
}
