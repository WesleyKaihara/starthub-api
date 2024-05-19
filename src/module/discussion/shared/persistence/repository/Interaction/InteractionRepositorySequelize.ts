import { Injectable } from '@nestjs/common';
import { InteractionRepository } from './interaction.repository';
import Interaction from '@src/module/discussion/core/entity/Interaction';
import InteractionModel from '../../model/InteractionModel';
import { UpdateInteractionBody } from '@src/module/discussion/core/useCase/Interaction/UpdateInteraction/UpdateInteraction.dto';
import { CreateInteractionBody } from '@src/module/discussion/core/useCase/Interaction/CreateInteraction/CreateInteraction.dto';
import User from '@identity/core/entity/User';
import UserModel from '@identity/shared/persistence/model/user.model';

@Injectable()
export class InteractionRepositorySequelize implements InteractionRepository {
  async getAllInteractions(): Promise<Interaction[]> {
    const interactions = await InteractionModel.findAll();

    return interactions.map((interaction) =>
      Interaction.restore(
        interaction.id,
        interaction.discussionId,
        interaction.message,
        User.restore(
          interaction.user.id,
          interaction.user.name,
          interaction.user.email,
        ),
      ),
    );
  }

  async getInteractionsByProjectId(projectId: number): Promise<Interaction[]> {
    const interactions = await InteractionModel.findAll({
      where: {
        discussionId: projectId,
      },
    });

    console.log(interactions);

    return interactions.map((interaction) =>
      Interaction.restore(
        interaction.getDataValue('id'),
        interaction.getDataValue('discussionId'),
        interaction.getDataValue('message'),
        User.restore(
          interaction.getDataValue('user'),
          interaction.getDataValue('user'),
          interaction.getDataValue('user'),
        ),
      ),
    );
  }

  async createInteraction(input: CreateInteractionBody): Promise<Interaction> {
    const interaction: InteractionModel = await InteractionModel.create(
      {
        discussionId: input.discussionId,
        message: input.message,
        userId: input.userId,
      },
      {
        include: [
          {
            model: UserModel,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          },
        ],
      },
    );

    await interaction.reload();

    return Interaction.restore(
      interaction.id,
      interaction.discussionId,
      interaction.message,
      User.restore(
        interaction.user.get('id'),
        interaction.user.get('name'),
        interaction.user.get('email'),
      ),
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
        User.restore(
          interaction.user.id,
          interaction.user.name,
          interaction.user.email,
        ),
      );
    } else {
      throw new Error(`Unable to update interaction with id ${id}`);
    }
  }
}
