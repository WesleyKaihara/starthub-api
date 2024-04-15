import Interaction from '@src/module/discussion/core/entity/Interaction';
import { CreateInteractionBody } from '@src/module/discussion/core/useCase/Interaction/CreateInteraction/CreateInteraction.dto';
import { UpdateInteractionBody } from '@src/module/discussion/core/useCase/Interaction/UpdateInteraction/UpdateInteraction.dto';

export default interface InteractionRepository {
  getAllInteractions(): Promise<Interaction[]>;
  createInteraction(
    createInteractionDto: CreateInteractionBody,
  ): Promise<Interaction>;
  updateInteraction(
    id: number,
    input: UpdateInteractionBody,
  ): Promise<Interaction>;
}
