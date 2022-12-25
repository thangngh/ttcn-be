import { Ability, MongoAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Action, enumRole } from "src/common/common.interface";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

type Subjects = InferSubjects<typeof UserEntity | 'all'>
	| 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {

	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) { }

	async createForUser(user: UserEntity) {
		const userRep = await this.userRepository.findOne({
			where: {
				id: user.id
			},
		});
		const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>)

		if (userRep.roleid === enumRole.ADMIN) {
			can(Action.MANAGE, 'all');
		} else {
			can(Action.READ, 'all');
		}


		return build({
			detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
		});
	}
}