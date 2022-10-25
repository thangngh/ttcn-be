import { IsEmail, IsOptional } from 'class-validator';
import { IFullName, IRegister, ProviderType } from 'src/common/common.interface';

export class AuthCredentialsDto implements IRegister {
    @IsOptional()
    readonly fullName: IFullName;

    @IsOptional()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    readonly userName: string;

    @IsOptional()
    readonly passWord: string;

    @IsOptional()
    readonly providerType?: ProviderType;
}
