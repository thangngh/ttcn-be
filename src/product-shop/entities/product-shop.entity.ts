import { ProductEntity } from "src/product/entities/product.entity";
import { ShopEntity } from "src/shop/entities/shop.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_shop")
export class ProductShopEntity extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	productid: string;

	@Column()
	shopid: string;

	@ManyToOne(() => ProductEntity, products => products.productshops)
	@JoinColumn({ name: 'productid' })
	products: ProductEntity

	@ManyToOne(() => ShopEntity, shop => shop.productshops)
	@JoinColumn({ name: 'shopid' })
	shop!: ShopEntity;

	constructor(partial: Partial<ProductShopEntity>) {
		super();
		Object.assign(this, partial);
	}
}
