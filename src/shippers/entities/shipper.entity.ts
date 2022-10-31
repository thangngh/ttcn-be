import { UserRole } from "src/common/common.interface";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("shipper")
export class Shipper extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	citizen_identification!: string;

	@Column({
		type: "boolean",
		default: false,
		name: "is_ready"
	})
	isReady!: boolean;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.EMPLOYEE,
	})
	role!: UserRole;

	@Column({
		nullable: true,
	})
	rating!: number;

	@Column({
		name: "user_id"
	})
	userId!: string;

	@OneToOne(() => User, (user) => user.shipper)
	@JoinColumn({
		name: "user_id"
	})
	user!: User;

}
