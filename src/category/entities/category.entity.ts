import { CommonEntity } from "src/common/entites/common.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { ShopEntity } from "src/shop/entities/shop.entity";
import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";

@Entity("category")
export class CategoryEntity extends CommonEntity {

	@Index({ fulltext: true })
	@Column()
	name: string;

	@Column()
	shopid: string

	@OneToOne(() => ShopEntity, shop => shop.category)
	shop!: ShopEntity;

	@OneToMany(() => ProductEntity, product => product.category)
	product!: ProductEntity[];

	constructor(partial: Partial<CategoryEntity>) {
		super();
		Object.assign(this, partial);
	}
}
