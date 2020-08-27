export enum Environment {
	PRODUCTION = 'production',
	DEVELOPMENT = 'development'
}

export const CurrentEnvironment = process.env.NODE_ENV || Environment.PRODUCTION;
export const IsDevServer = process.env.WEBPACK_DEV_SERVER || false;
export const IsDevelopment = CurrentEnvironment === Environment.DEVELOPMENT;
export const IsProduction = CurrentEnvironment === Environment.PRODUCTION;

export const IfEnvironment = <T>(environment: Environment, value: T, other: T): T => CurrentEnvironment === environment ? value : other;
export const IfDevServer = <T>(value: T, other: T): T => IsDevServer ? value : other;
export const IfDevelopment = <T>(value: T, other: T): T => IfEnvironment(Environment.DEVELOPMENT, value, other);
export const IfProduction = <T>(value: T, other: T): T => IfEnvironment(Environment.PRODUCTION, value, other);
