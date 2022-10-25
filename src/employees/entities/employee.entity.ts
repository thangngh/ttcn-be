import { UserRole } from "src/common/common.interface";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("employee")
export class Employee extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	citizen_identification!: string;

	@Column({
		nullable: true,
	})
	hourWorked!: number;

	@Column({
		nullable: true,
	})
	rating!: number;

	@Column({
		nullable: true,
	})
	salary!: number;

	@Column({
		nullable: true,
	})
	timeOff!: number;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.EMPLOYEE,
	})
	role!: UserRole;

	@OneToOne(() => User, (user) => user.employee)
	@JoinColumn()
	user!: User;

}
