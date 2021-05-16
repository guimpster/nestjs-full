import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class ReportJob {
  private readonly logger = new Logger(ReportJob.name);

  @Interval('report-job', 30 * 1000)
  async reportMessages() {
    this.logger.debug('Report job is running every 30s');
  }
}
