import { Injectable } from '@nestjs/common';
import Interaction from '../../core/entity/Interaction';
import { InteractionRepositorySequelize } from '../persistence';
import { CreateInteractionBody } from '../../core/useCase/Interaction/CreateInteraction/CreateInteraction.dto';
import { UpdateInteractionBody } from '../../core/useCase/Interaction/UpdateInteraction/UpdateInteraction.dto';

@Injectable()
export default class InteractionService {
  constructor(
    private readonly interactionRepository: InteractionRepositorySequelize,
  ) { }

  getInteractions(): Promise<Interaction[]> {
    return this.interactionRepository.getAllInteractions();
  }

  async createInteraction(input: CreateInteractionBody): Promise<Interaction> {
    return this.interactionRepository.createInteraction(input);
  }

  updateInteraction(
    interactionId: number,
    input: UpdateInteractionBody,
  ): Promise<Interaction> {
    return this.interactionRepository.updateInteraction(interactionId, input);
  }
}
