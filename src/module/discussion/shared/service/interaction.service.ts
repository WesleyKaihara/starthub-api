import { Injectable } from '@nestjs/common';
import Interaction from '../../core/entity/Interaction';
import { InteractionRepositorySequelize } from '../persistence';
import {
  CreateInteraction,
  CreateInteractionBody,
  GetAllInteractions,
  UpdateInteraction,
  UpdateInteractionBody,
} from '@discussion/core/useCase';

@Injectable()
export default class InteractionService {
  constructor(
    private readonly interactionRepository: InteractionRepositorySequelize,
  ) {}

  getInteractions(): Promise<Interaction[]> {
    const getAllInteractions = new GetAllInteractions(
      this.interactionRepository,
    );
    return getAllInteractions.execute();
  }

  createInteraction(input: CreateInteractionBody): Promise<Interaction> {
    const createInteraction = new CreateInteraction(this.interactionRepository);
    return createInteraction.execute(input);
  }

  updateInteraction(
    interactionId: number,
    input: UpdateInteractionBody,
  ): Promise<Interaction> {
    const updateInteraction = new UpdateInteraction(this.interactionRepository);
    return updateInteraction.execute(interactionId, input);
  }
}
