import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleDeviceDto } from './data-types/google-device.dto';
import {
  mapEntityToGoogleDevice,
  mapGoogleDeviceToEntity,
} from './mapper/device-to-google.mapper';
import { GoogleDeviceEntity } from './persistance/device.entitiy';

@Injectable()
export class GoogleHomeDeviceService {
  constructor(
    @InjectRepository(GoogleDeviceEntity)
    private deviceRepo: Repository<GoogleDeviceEntity>,
  ) {}

  async getDevicesForSync(): Promise<GoogleDeviceDto[]> {
    return this.getDevices();
  }

  async getDevices(): Promise<GoogleDeviceDto[]> {
    const entities = await this.deviceRepo.find();
    return entities.map(mapEntityToGoogleDevice);
  }

  async createDevice(device: GoogleDeviceDto) {
    const entity = await this.deviceRepo.save(mapGoogleDeviceToEntity(device));
    return mapEntityToGoogleDevice(entity);
  }
}
