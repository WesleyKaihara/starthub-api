import { InteractionRepository } from '@src/module/discussion/shared/persistence';
import Interaction from '../../../entity/Interaction';

export class GetAllInteractions {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(): Promise<Interaction[]> {
    const interactions = await this.interactionRepository.getAllInteractions();
    return interactions;
  }
}
