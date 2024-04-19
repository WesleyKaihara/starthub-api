import { Injectable } from '@nestjs/common';
import { InteractionRepository } from './interaction.repository';
import Interaction from '@src/module/discussion/core/entity/Interaction';
import InteractionModel from '../../model/InteractionModel';
import { UpdateInteractionBody } from '@src/module/discussion/core/useCase/Interaction/UpdateInteraction/UpdateInteraction.dto';
import { CreateInteractionBody } from '@src/module/discussion/core/useCase/Interaction/CreateInteraction/CreateInteraction.dto';

@Injectable()
export class InteractionRepositorySequelize
  implements InteractionRepository {
  async getAllInteractions(): Promise<Interaction[]> {
    const interactions = await InteractionModel.findAll();

    return interactions.map((interaction) =>
      Interaction.restore(
        interaction.id,
        interaction.discussionId,
        interaction.message,
      ),
    );
  }

  async createInteraction(input: CreateInteractionBody): Promise<Interaction> {
    const interaction: InteractionModel = await InteractionModel.create({
      discussionId: input.discussionId,
      message: input.message,
    });

    return Interaction.restore(
      interaction.id,
      interaction.discussionId,
      interaction.message,
    );
  }

  async updateInteraction(
    id: number,
    updateInteractionDto: UpdateInteractionBody,
  ): Promise<Interaction> {
    const [rowsAffected] = await InteractionModel.update(
      { ...updateInteractionDto },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      const interaction = await InteractionModel.findByPk(id);
      if (!interaction) {
        throw new Error(`Interaction with id ${id} not found after update`);
      }
      return Interaction.restore(
        interaction.id,
        interaction.discussionId,
        interaction.message,
      );
    } else {
      throw new Error(`Unable to update interaction with id ${id}`);
    }
  }
}
