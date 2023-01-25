import { Module } from '@nestjs/common';
import { AmqpService } from './service/amqp.service';
import { RemoteApiService } from './service/remote-api.service';
import { NodeRegisterService } from './service/node-register.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AmqpService, RemoteApiService, NodeRegisterService],
  exports: [NodeRegisterService],
})
export class SmartModule {
  constructor(private amqp: AmqpService) {
    amqp.initialize();
  }
}
