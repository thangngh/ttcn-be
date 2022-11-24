import { IAddress, IFullName, ISex, ProviderType } from "src/common/common.interface";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";
import { CommonEntity } from "src/common/entites/common.entity";
import { Customer } from "src/customer/entities/customer.entity";
import { Shopper } from "src/shopper/entities/shopper.entity";

@Entity("users")
export class User extends CommonEntity {

	@Column({
		type: "json",
		nullable: false,
	})
	fullName!: IFullName;

	@Column({
		type: "enum",
		enum: ISex,
		default: null
	})
	gender?: ISex;

	@Column({
		type: "enum",
		enum: ProviderType,
		default: ProviderType.USERNAME,
	})
	providerType!: ProviderType;

	@Column({
		type: "json",
	})
	address?: IAddress;

	@Column()
	phone?: string;

	@Column()
	email?: string;

	@Column()
	username!: string;

	@Column()
	password!: string;

	@Column()
	securityCode?: string;

	@Column()
	avatarPath?: string;

	@Column()
	avatarThumbnailPath?: string;

	@OneToOne(() => Customer, customer => customer.user)
	customer!: Customer;

	@OneToOne(() => Shopper, shopper => shopper.user)
	shopper!: Shopper;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(): Promise<void> {
		const salt = await bcrypt.genSalt();
		if (this.password && !/^\$2a\$\d+\$/.test(this.password)) {
			this.password = await bcrypt.hash(this.password, salt);
		}
	}

	async checkPassword(plainPassword: string): Promise<boolean> {
		return await bcrypt.compare(plainPassword, this.password);
	}



	constructor(partial: Partial<User>) {
		super();
		Object.assign(this, partial);
	}
}
