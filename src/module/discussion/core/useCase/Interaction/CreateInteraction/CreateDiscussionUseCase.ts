import InteractionRepository from '@src/module/discussion/shared/persistence/repository/Interaction/interaction.repository';
import Interaction from '../../../entity/Interaction';
import { CreateInteractionBody } from './CreateInteraction.dto';

export default class CreateInteraction {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(input: CreateInteractionBody): Promise<Interaction> {
    const interaction = Interaction.create(input.discussionId, input.message);
    await this.interactionRepository.createInteraction(interaction);
    return interaction;
  }
}
