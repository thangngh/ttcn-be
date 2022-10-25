import { UserRole } from "src/common/common.interface";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("owner")
export class Owner extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.ADMIN,
	})
	role!: UserRole;

	@OneToOne(() => User, (user) => user.owner)
	@JoinColumn()
	user!: User;
}
