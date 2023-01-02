import { UserOrder } from "src/user-order/entities/user-order.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	type: string;

	@Column()
	name: string;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP'
	})
	createdat: Date;

	@Column({
		type: 'timestamp',
	})
	updatedat: Date;

	@OneToOne(() => UserOrder, userorder => userorder.payment)
	userorder: UserOrder;
}
