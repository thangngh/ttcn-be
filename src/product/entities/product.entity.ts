import { CategoryEntity } from "src/category/entities/category.entity";
import { CommonEntity } from "src/common/entites/common.entity";
import { ProductShopEntity } from "src/product-shop/entities/product-shop.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity("product")
export class ProductEntity extends CommonEntity {

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column({ type: 'jsonb', nullable: true })
	image: string

	@Column()
	quantity: number;

	@Column()
	categoryid: string;

	@OneToMany(type => ProductShopEntity, productshops => productshops.products)
	productshops: ProductShopEntity[];

	@ManyToOne(() => CategoryEntity, category => category.product)
	@JoinColumn({ name: "categoryid" })
	category!: CategoryEntity;

	constructor(partial: Partial<ProductEntity>) {
		super();
		Object.assign(this, partial);
	}
}
