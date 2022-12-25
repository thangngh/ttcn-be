import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity])
	],
	providers: [CaslAbilityFactory],
	exports: [CaslAbilityFactory]
})
export class CaslModule {

	constructor(private readonly caslAbilityFactory: CaslAbilityFactory) { }
}
