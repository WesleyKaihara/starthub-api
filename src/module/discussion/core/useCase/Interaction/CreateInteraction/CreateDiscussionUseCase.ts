import { InteractionRepository } from '@src/module/discussion/shared/persistence';
import Interaction from '../../../entity/Interaction';
import { CreateInteractionBody } from './CreateInteraction.dto';

export class CreateInteraction {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(input: CreateInteractionBody): Promise<Interaction> {
    const interaction = Interaction.create(
      input.discussionId,
      input.message,
      input.userId,
    );
    const newInteraction =
      await this.interactionRepository.createInteraction(interaction);
    return newInteraction;
  }
}
