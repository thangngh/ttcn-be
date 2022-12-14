import { IsEmail, IsOptional } from 'class-validator';
import { IFullName, IRegister, ProviderType } from 'src/common/common.interface';

export class AuthCredentialsDto implements IRegister {
    @IsOptional()
    readonly firstname: string;

    @IsOptional()
    readonly lastname: string;

    @IsOptional()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    readonly username: string;

    @IsOptional()
    readonly password: string;

    @IsOptional()
    readonly providerType?: ProviderType;
}
