import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleHomeDeviceController } from './controllers/device.controller';
import { GoogleHomeFulfillmentController } from './controllers/fulfillment.controller';
import { GoogleHomeDeviceService } from './device.service';
import { GoogleHomeFulfillmentService } from './fulfillment.service';
import { GoogleDeviceEntity } from './persistance/device.entitiy';
import { GoogleHomeDeviceDefinition } from './data-types/google-home.device-definition';
import { NodeRegisterService } from '@zwisler/ada-lib/dist/src/service/node-register.service';
import { setup } from '@zwisler/ada-lib';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([GoogleDeviceEntity]),
  ],
  controllers: [GoogleHomeFulfillmentController, GoogleHomeDeviceController],
  providers: [
    GoogleHomeFulfillmentService,
    GoogleHomeDeviceService,
    {
      useFactory: () =>
        setup({
          amqpUrl: process.env.AMQP_URL,
        }),
      provide: NodeRegisterService,
    },
  ],
})
export class HomeAssistantModule {
  constructor(
    private homeAssistantService: GoogleHomeFulfillmentService,
    private deviceService: GoogleHomeDeviceService,
    private nodeRegisterService: NodeRegisterService,
  ) {
    this.initalize();
  }

  private async initalize() {
    await this.homeAssistantService.init();
    const devices = await this.deviceService.getDevices();
    const nodes = devices.map(
      (googleDevice) => new GoogleHomeDeviceDefinition(googleDevice),
    );
    this.nodeRegisterService.register(
      nodes,
      'google-home-connector-id',
      'Home-Assistant',
      'Home Assistant remote connector',
    );
  }
}
