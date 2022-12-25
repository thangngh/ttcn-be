import { CommonEntity } from "src/common/entites/common.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity("role")
export class RoleEntity extends CommonEntity {

	@Column()
	name: string

	@OneToOne(type => UserEntity, user => user.id)
	user: UserEntity;
}