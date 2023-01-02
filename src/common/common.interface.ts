
export enum IGender {
	FEMALE = "FEMALE",
	MALE = "MALE",
}

export enum ProviderType {
	USERNAME = "USERNAME",
	GOOGLE = "GOOGLE",
	FACEBOOK = "FACEBOOK",
}

export interface IFullName {
	firstName: string;
	lastName: string;
}

export interface IAddress {
	city: string;
	district: string;
	street: string;
	country: string;
}

export interface ILogin {
	username: string;
	password: string;
}

export interface IRegister {
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	password?: string;
	providertype?: ProviderType;
	role?: enumRole;
	isactive?: boolean;
	avatar?: string;
}

export enum enumRole {
	CUSTOMER = "12d9afba-a416-4798-8809-4c619b8e22a4",
	ADMIN = "f0ac1b1d-cc69-4663-9271-75c57dce0b05",
	SHOPPER = "62e5a621-7eb0-4b8b-9743-841a6f617120",
}

export enum Action {
	MANAGE = 'MANAGE',
	CREATE = 'CREATE',
	READ = 'READ',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE'
}