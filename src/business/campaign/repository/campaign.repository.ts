import { Campaign } from '../entities/campaign.entity';

export abstract class CampaignRepository {
  abstract save(campaign: Campaign);
  abstract getById(id: string);
}
