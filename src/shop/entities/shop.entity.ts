import { CategoryEntity } from "src/category/entities/category.entity";
import { IAddress } from "src/common/common.interface";
import { CommonEntity } from "src/common/entites/common.entity";
import { ProductShopEntity } from "src/product-shop/entities/product-shop.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity("shop")
export class ShopEntity extends CommonEntity {

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({
		type: 'jsonb',
	})
	address: IAddress;

	@Column()
	phone: string;

	@Column()
	email: string;

	@Column({
		type: 'boolean',
		default: false,
	})
	isActive: boolean;

	@Column()
	userid: string;

	@OneToOne(type => UserEntity, user => user.shop)
	@JoinColumn({ name: 'userid' })
	user: UserEntity;

	@OneToMany(type => ProductShopEntity, productshops => productshops.shop)
	productshops: ProductShopEntity[];

	@OneToOne(() => CategoryEntity, category => category.shop)
	category: CategoryEntity;
}
