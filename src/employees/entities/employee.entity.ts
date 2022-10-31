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
		name: "hour_worked"
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
		name: "time_off"
	})
	timeOff!: number;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.EMPLOYEE,
	})
	role!: UserRole;

	@Column({
		name: "user_id"
	})
	userId!: string;

	@OneToOne(() => User, (user) => user.employee)
	@JoinColumn({
		name: "user_id"
	})
	user!: User;

}
