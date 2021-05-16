import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerJob {
  private readonly logger = new Logger(SchedulerJob.name);

  @Cron('45 * * * * *')
  async handleCampaigns() {
    this.logger.debug('Called when the current second is 45');
  }
}
