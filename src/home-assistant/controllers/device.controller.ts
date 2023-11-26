import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GoogleDeviceDto } from '../data-types/google-device.dto';
import { GoogleHomeDeviceService } from '../device.service';
import { JwtAuthGuard } from '../../auth/jwt.strategy';

@UseGuards(JwtAuthGuard)
@ApiTags('Google Home')
@Controller('/assistant/device')
@ApiBearerAuth('jwt')
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
