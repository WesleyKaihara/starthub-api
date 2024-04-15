import InteractionRepository from '@src/module/discussion/shared/persistence/repository/Interaction/interaction.repository';
import Interaction from '../../../entity/Interaction';

export default class GetAllInteractions {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(): Promise<Interaction[]> {
    const interactions = await this.interactionRepository.getAllInteractions();
    return interactions;
  }
}
