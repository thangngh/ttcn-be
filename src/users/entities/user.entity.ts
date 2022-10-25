import { IAddress, IFullName, ISex, ProviderType } from "src/common/common.interface";
import { Customer } from "src/customers/entities/customer.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Owner } from "src/owners/entities/owner.entity";
import { Shipper } from "src/shippers/entities/shipper.entity";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity("users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({
		type: "json",
		nullable: false,
		name: "full_name",
	})
	fullName!: IFullName;

	@Column({
		type: "enum",
		enum: ISex,
	})
	sex!: ISex;

	@Column({
		name: "provider_type",
		type: "enum",
		enum: ProviderType,
		default: ProviderType.USERNAME,
	})
	providerType!: ProviderType;

	@Column({
		type: "json",
	})
	address!: IAddress;

	@Column()
	phone!: string;

	@Column()
	email!: string;

	@Column({
		name: "user_name",
	})
	userName!: string;

	@Column({
		name: "pass_word",
	})
	passWord!: string;

	@Column({
		nullable: true,
		name: "security_code"
	})
	securityCode!: string;

	@Column({
		nullable: true,
		name: "avatar_path"
	})
	avatarPath!: string;

	@Column({
		nullable: true,
		name: "avatar_thumbnail_path"
	})
	avatarThumbnailPath!: string;

	@Column({
		type: "timestamp",
		name: "created_at",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt!: Date;

	@Column({
		type: "timestamp",
		name: "updated_at",
	})
	updatedAt!: Date;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(): Promise<void> {
		const salt = await bcrypt.genSalt();
		if (this.passWord && !/^\$2a\$\d+\$/.test(this.passWord)) {
			this.passWord = await bcrypt.hash(this.passWord, salt);
		}
	}

	async checkPassword(plainPassword: string): Promise<boolean> {
		return await bcrypt.compare(plainPassword, this.passWord);
	}

	@OneToOne(() => Owner, owner => owner.user)
	owner!: Owner;

	@OneToOne(() => Shipper, shipper => shipper.user)
	shipper!: Shipper;

	@OneToOne(() => Employee, employee => employee.user)
	employee!: Employee;

	@OneToOne(() => Customer, customer => customer.user)
	customer!: Customer;

}
