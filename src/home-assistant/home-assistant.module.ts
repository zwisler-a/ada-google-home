import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleHomeDeviceController } from './controllers/device.controller';
import { GoogleHomeFulfillmentController } from './controllers/fulfillment.controller';
import { GoogleHomeDeviceService } from './device.service';
import { GoogleHomeFulfillmentService } from './fulfillment.service';
import { GoogleDeviceEntity } from './persistance/device.entitiy';
import { SmartModule } from '../smart/smart.module';
import { NodeRegisterService } from '../smart/service/node-register.service';
import { GoogleHomeDevice } from './data-types/google-home.device';

@Module({
  imports: [
    SmartModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([GoogleDeviceEntity]),
  ],
  controllers: [GoogleHomeFulfillmentController, GoogleHomeDeviceController],
  providers: [GoogleHomeFulfillmentService, GoogleHomeDeviceService],
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
      (googleDevice) => new GoogleHomeDevice(googleDevice),
    );
    this.nodeRegisterService.register(
      nodes,
      'google-home-connector-id',
      'Home-Assistant',
      'Home Assistant remote connector',
    );
  }
}
