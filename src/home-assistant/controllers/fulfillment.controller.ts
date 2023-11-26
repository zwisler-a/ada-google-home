import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleHomeFulfillmentService } from '../fulfillment.service';
import { JwtAuthGuard } from '../../auth/jwt.strategy';

@UseGuards(JwtAuthGuard)
@ApiTags('Google Home')
@Controller('/assistant')
export class GoogleHomeFulfillmentController {
  constructor(private homeAssistantService: GoogleHomeFulfillmentService) {}

  @Post('fulfillment')
  authorize(@Req() req, @Res() res): void {
    this.homeAssistantService.app(req, res);
  }
}
