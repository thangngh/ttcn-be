export enum UserRole {
	USER = "USER",
	SHOPPER = "SHOPPER",
	ROOT = "ROOT",
}

export enum ISex {
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
	fullName: IFullName;
	email: string;
	username: string;
	password?: string;
	providerType?: ProviderType;
}

export interface IAddUser {
	role?: UserRole;
	userId: string
}