import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashbaordService: DashboardService) {}

  @Get()
  dashAllData() {
    return this.dashbaordService.allData();
  }
}
