import { Injectable } from '@nestjs/common';

import DiscussionRepository from './discussion.repository';
import DiscussionModel from '../model/DiscussionModel';
import Discussion from '@src/module/discussion/core/entity/Discussion';
import { CreateDiscussionDto } from '@src/module/discussion/core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionDto } from '@src/module/discussion/core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';

@Injectable()
export default class DiscussionRepositorySequelize implements DiscussionRepository {
  public getAllDiscussions(): Promise<Discussion[]> {
    return DiscussionModel.findAll()
      .then((Discussions) => {
        return Discussions as Discussion[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async findDiscussionById(id: number): Promise<Discussion> {
    return await DiscussionModel.findOne({
      where: { id },
    });
  }

  public createDiscussion(createDiscussionDto: CreateDiscussionDto): Promise<Discussion> {
    return DiscussionModel.create(createDiscussionDto as any);
  }

  public async updateDiscussion(
    id: number,
    updateDiscussionDto: UpdateDiscussionDto,
  ): Promise<Discussion> {
    const [rowAffected] = await DiscussionModel.update(
      { ...updateDiscussionDto },
      { where: { id } },
    );

    if (rowAffected > 0) {
      return await DiscussionModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a Discussion with id ${id}`);
    }
  }
}
