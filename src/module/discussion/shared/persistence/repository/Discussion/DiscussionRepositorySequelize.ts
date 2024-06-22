import { Injectable } from '@nestjs/common';

import Discussion from '@src/module/discussion/core/entity/Discussion';
import { DiscussionRepository } from './discussion.repository';
import DiscussionModel from '../../model/DiscussionModel';

import { CreateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';
import { PaginationOptions } from '@src/shared/types/pagination';

@Injectable()
export class DiscussionRepositorySequelize implements DiscussionRepository {
  async getAllDiscussions(
    paginationOptions: PaginationOptions,
  ): Promise<Discussion[]> {
    const { page, limit } = paginationOptions;
    const offset = (page - 1) * limit;
    const discussions = await DiscussionModel.findAll({
      offset,
      limit,
    });

    return discussions.map((discussion) =>
      Discussion.restore(
        discussion.id,
        discussion.title,
        discussion.context,
        discussion.projectId,
      ),
    );
  }

  async getAllDiscussionsByProject(projectId: number): Promise<Discussion[]> {
    const discussions = await DiscussionModel.findAll({
      where: {
        projectId,
      },
    });

    return discussions.map((discussion) =>
      Discussion.restore(
        discussion.id,
        discussion.title,
        discussion.context,
        discussion.projectId,
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
      discussion.projectId,
    );
  }

  async createDiscussion(input: CreateDiscussionBody): Promise<Discussion> {
    const discussion: DiscussionModel = await DiscussionModel.create({
      title: input.title,
      context: input.context,
      projectId: input.projectId,
    });

    return Discussion.restore(
      discussion.id,
      discussion.title,
      discussion.context,
      discussion.projectId,
    );
  }

  async updateDiscussion(
    id: number,
    input: UpdateDiscussionBody,
  ): Promise<Discussion> {
    const [rowsAffected] = await DiscussionModel.update(
      { ...input },
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
        discussion.projectId,
      );
    } else {
      throw new Error(`Unable to update discussion with id ${id}`);
    }
  }
}
