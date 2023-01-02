import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class EmailService implements MailerOptionsFactory {
	constructor(private configService: ConfigService) { }

	createMailerOptions(): MailerOptions {
		return {
			transport: {
				host: 'smtp.gmail.com',
				secure: true,
				auth: {
					user: this.configService.get('MAIL_USER'),
					pass: this.configService.get('MAIL_PASSWORD')
				},
			},
			defaults: {
				from: `"thang nguyen hong" <${this.configService.get('MAIL_USER')}>`,
			},
			template: {
				dir: __dirname + '/templates',
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}
	}
}
