import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: EmailService
    })
  ],
  providers: [EmailService]
})
export class EmailModule {
  constructor() {
    console.log(__dirname + '/templates')
  }
}
