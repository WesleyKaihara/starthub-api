import Interaction from '@src/module/discussion/core/entity/Interaction';
import { InteractionRepository } from './interaction.repository';
import { CreateInteractionBody } from '@src/module/discussion/core/useCase/Interaction/CreateInteraction/CreateInteraction.dto';
import { UpdateInteractionBody } from '@src/module/discussion/core/useCase/Interaction/UpdateInteraction/UpdateInteraction.dto';

export class InteractionRepositoryInMemory implements InteractionRepository {
  private interactions: Interaction[];
  private nextId: number;

  constructor() {
    this.interactions = [];
    this.nextId = 1;
  }

  async getAllInteractions(): Promise<Interaction[]> {
    return this.interactions;
  }

  async getInteractionsByProjectId(): Promise<Interaction[]> {
    return this.interactions;
  }

  async createInteraction(input: CreateInteractionBody): Promise<Interaction> {
    const interaction = Interaction.create(
      input.discussionId,
      input.message,
      input.userId,
    );
    interaction.id = this.nextId++;
    this.interactions.push(interaction);
    return interaction;
  }

  async updateInteraction(
    interactionId: number,
    input: UpdateInteractionBody,
  ): Promise<Interaction | null> {
    const interactionIndex = this.interactions.findIndex(
      (interaction) => interaction.id === interactionId,
    );
    if (interactionIndex !== -1) {
      const updatedInteraction = Interaction.update(
        interactionId,
        input.discussionId,
        input.message,
        input.userId,
      );
      updatedInteraction.id = interactionId;
      this.interactions[interactionIndex] = updatedInteraction;
      return updatedInteraction;
    }
    return null;
  }
}
