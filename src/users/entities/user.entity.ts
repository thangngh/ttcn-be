import { IAddress, IGender, ProviderType } from "src/common/common.interface";
import { CommonEntity } from "src/common/entites/common.entity";
import { RoleEntity } from "src/role/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ShopEntity } from "src/shop/entities/shop.entity";

@Entity("user")
export class UserEntity extends CommonEntity {

	@Column()
	firstname: string


	@Column()
	lastname: string;

	@Column({
		type: 'enum',
		enum: IGender,
	})
	gender: IGender;

	@Column({
		type: 'enum',
		enum: ProviderType,
		default: ProviderType.USERNAME,
	})
	providertype: ProviderType;

	@Column({
		type: 'jsonb'
	})
	address: IAddress;

	@Column()
	phone: string;

	@Column()
	email: string;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	avatar: string;

	@Column({
		type: 'boolean',
		default: true
	})
	isactive: boolean;

	/*
		1 => customer
		2 => shopper
		3 => admin
	*/
	@Column()
	roleid: string;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
	}

	async validatePassword(password: string): Promise<boolean> {
		const isMatch = await bcrypt.compare(password, this.password);
		return isMatch;
	}


	@OneToOne(type => RoleEntity, role => role.id)
	@JoinColumn({
		name: "roleid"
	})
	role: RoleEntity;

	@OneToOne(type => ShopEntity, shop => shop.user)
	shop: ShopEntity;

	constructor(partial: Partial<UserEntity>) {
		super();
		Object.assign(this, partial);
	}
}