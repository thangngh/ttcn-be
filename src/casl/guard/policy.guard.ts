import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "../casl-ability.factory/casl-ability.factory";
import { CHECK_POLICIES_KEY, PolicyHandler } from "../casl.decorator";

@Injectable()
export class PoliciesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private caslAbilityFactory: CaslAbilityFactory,
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const policyHandlers =
			this.reflector.get<PolicyHandler[]>(
				CHECK_POLICIES_KEY,
				context.getHandler(),
			) || [];

		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const ability = await this.caslAbilityFactory.createForUser(user);

		return policyHandlers.every((handler) =>
			this.execPolicyHandler(handler, ability as AppAbility),
		);
	}

	private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
		if (typeof handler === 'function') {
			return handler(ability);
		}
		return handler.handle(ability);
	}
}