export enum UserRole {
	USER = "USER",
	EMPLOYEE = "EMPLOYEE",
	ADMIN = "ADMIN",
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
	userName: string;
	passWord: string;
}

export interface IRegister {
	fullName: IFullName;
	email: string;
	userName: string;
	passWord: string;
	providerType?: ProviderType;
}