import { Payment } from "src/payment/entities/payment.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserOrder extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userid: string;

	@Column()
	amount: number;

	@Column()
	productid: string

	@Column()
	paymentid: string;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP'
	})
	createdat: Date;

	@Column({
		type: 'timestamp',
	})
	updatedat: Date;

	@OneToOne(() => UserEntity, user => user.userorder)
	@JoinColumn({ name: 'userid' })
	user: UserEntity;

	@OneToOne(() => Payment, payment => payment.userorder)
	@JoinColumn({ name: 'paymentid' })
	payment: Payment;

}
