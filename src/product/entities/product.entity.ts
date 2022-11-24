import { CommonEntity } from "src/common/entites/common.entity";
import { ProductCategory } from "src/product-category/entities/product-category.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Product extends CommonEntity {

	@Column()
	name!: string;

	@Column()
	description!: string;

	@Column()
	price!: number;

	@Column({
		type: "jsonb"
	})
	images!: string[];

	@Column()
	quantity!: number;

	@OneToMany((type) => ProductCategory, (productCategory) => productCategory.product)
	productCategories!: ProductCategory[];

	constructor(partial: Partial<Product>) {
		super();
		Object.assign(this, partial);
	}

}
