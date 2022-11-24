import { Category } from "src/category/entities/category.entity";
import { CommonEntity } from "src/common/entites/common.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class ProductCategory extends CommonEntity {

	@Column()
	type: string;

	@Column()
	name: string;

	@Column()
	productId: string;

	@Column()
	categoryId: string;

	@ManyToOne((type) => Product, (product) => product.productCategories)
	@JoinColumn({ name: "productId" })
	product: Product;

	@ManyToOne((type) => Category, (category) => category.productCategories)
	@JoinColumn({ name: "categoryId" })
	category: Category;

	constructor(partial: Partial<ProductCategory>) {
		super();
		Object.assign(this, partial);
	}
}
