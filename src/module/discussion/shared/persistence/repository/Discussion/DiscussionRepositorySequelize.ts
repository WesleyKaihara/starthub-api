import { Injectable } from '@nestjs/common';

import Discussion from '@src/module/discussion/core/entity/Discussion';
import { DiscussionRepository } from './discussion.repository';
import DiscussionModel from '../../model/DiscussionModel';

import { CreateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';

@Injectable()
export class DiscussionRepositorySequelize implements DiscussionRepository {
  async getAllDiscussions(): Promise<Discussion[]> {
    const discussions = await DiscussionModel.findAll();

    return discussions.map((discussion) =>
      Discussion.restore(
        discussion.id,
        discussion.title,
        discussion.context,
      ),
    );
  }

  async findDiscussionById(id: number): Promise<Discussion> {
    const discussion = await DiscussionModel.findOne({ where: { id } });
    if (!discussion) {
      throw new Error(`Discussion with id ${id} not found`);
    }
    return Discussion.restore(
      discussion.id,
      discussion.title,
      discussion.context,
    );
  }

  async createDiscussion(input: CreateDiscussionBody): Promise<Discussion> {
    const discussion: DiscussionModel = await DiscussionModel.create({
      title: input.title,
      context: input.context,
    });

    return Discussion.restore(
      discussion.id,
      discussion.title,
      discussion.context,
    );
  }

  async updateDiscussion(
    id: number,
    updateDiscussionDto: UpdateDiscussionBody,
  ): Promise<Discussion> {
    const [rowsAffected] = await DiscussionModel.update(
      { ...updateDiscussionDto },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      const discussion = await DiscussionModel.findByPk(id);
      if (!discussion) {
        throw new Error(`Discussion with id ${id} not found after update`);
      }
      return Discussion.restore(
        discussion.id,
        discussion.title,
        discussion.context,
      );
    } else {
      throw new Error(`Unable to update discussion with id ${id}`);
    }
  }
}
