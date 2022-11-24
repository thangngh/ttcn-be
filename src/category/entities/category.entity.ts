import { CommonEntity } from "src/common/entites/common.entity";
import { ProductCategory } from "src/product-category/entities/product-category.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Category extends CommonEntity {

	@Column()
	name: string;

	@OneToMany((type) => ProductCategory, (productCategory) => productCategory.category)
	productCategories!: ProductCategory[];
}
