import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: EmailService
    })
  ],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {
  constructor() {
    console.log(__dirname + '/templates')
  }
}
