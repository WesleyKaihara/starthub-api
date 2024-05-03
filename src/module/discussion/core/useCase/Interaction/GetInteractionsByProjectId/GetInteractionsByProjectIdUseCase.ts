import { InteractionRepository } from '@src/module/discussion/shared/persistence';
import Interaction from '../../../entity/Interaction';

export class GetInteractionsByProjectId {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(projectId: number): Promise<Interaction[]> {
    const interactions =
      await this.interactionRepository.getInteractionsByProjectId(projectId);
    return interactions;
  }
}
