import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartModule } from './smart/smart.module';
import { HomeAssistantModule } from './home-assistant/home-assistant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'password',
      database: 'db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    HomeAssistantModule,
    SmartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
