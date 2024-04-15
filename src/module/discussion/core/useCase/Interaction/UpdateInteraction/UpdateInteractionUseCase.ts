import { UpdateInteractionBody } from './UpdateInteraction.dto';
import Interaction from '../../../entity/Interaction';
import InteractionRepository from '@src/module/discussion/shared/persistence/repository/Interaction/interaction.repository';

export default class CreateInteraction {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(
    interactionId: number,
    input: UpdateInteractionBody,
  ): Promise<Interaction> {
    const interaction = Interaction.update(
      interactionId,
      input.discussionId,
      input.message,
    );

    await this.interactionRepository.updateInteraction(
      interactionId,
      interaction,
    );
    return interaction;
  }
}
