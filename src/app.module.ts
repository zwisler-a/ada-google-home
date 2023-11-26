import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeAssistantModule } from './home-assistant/home-assistant.module';
import { setup } from '@zwisler/ada-lib';
import { NodeRegisterService } from '@zwisler/ada-lib/dist/src/service/node-register.service';
import process from 'process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    HomeAssistantModule,
  ],
  controllers: [],
  providers: [
    {
      useFactory: () =>
        setup({
          amqpUrl: process.env.AMQP_URL,
        }),
      provide: NodeRegisterService,
    },
  ],
})
export class AppModule {}
