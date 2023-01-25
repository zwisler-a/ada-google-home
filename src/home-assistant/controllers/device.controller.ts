import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleDeviceDto } from '../data-types/google-device.dto';
import { GoogleHomeDeviceService } from '../device.service';

@ApiTags('Google Home')
@Controller('/assistant/device')
export class GoogleHomeDeviceController {
  constructor(private deviceService: GoogleHomeDeviceService) {}

  @Post()
  createGoogleDevice(@Body() device: GoogleDeviceDto) {
    return this.deviceService.createDevice(device);
  }

  @Get()
  async getGoogleDevices(): Promise<GoogleDeviceDto[]> {
    return this.deviceService.getDevices();
  }
}
