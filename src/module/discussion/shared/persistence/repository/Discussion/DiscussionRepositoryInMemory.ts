import Discussion from '@src/module/discussion/core/entity/Discussion';
import { CreateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';
import DiscussionRepository from './discussion.repository';

class DiscussionRepositoryInMemory implements DiscussionRepository {
  private discussions: Discussion[];
  private nextId: number;

  constructor() {
    this.discussions = [];
    this.nextId = 1;
  }

  async getAllDiscussions(): Promise<Discussion[]> {
    return this.discussions;
  }

  async findDiscussionById(discussionId: number): Promise<Discussion | null> {
    return this.discussions.find((discussion) => discussion.id === discussionId) || null;
  }

  async createDiscussion(input: CreateDiscussionBody): Promise<Discussion> {
    const discussion = Discussion.create(
      input.title,
      input.context,
    );
    discussion.id = this.nextId++;
    this.discussions.push(discussion);
    return discussion;
  }

  async updateDiscussion(
    discussionId: number,
    input: UpdateDiscussionBody,
  ): Promise<Discussion | null> {
    const discussionIndex = this.discussions.findIndex(
      (discussion) => discussion.id === discussionId,
    );
    if (discussionIndex !== -1) {
      const updatedDiscussion = Discussion.restore(
        discussionId,
        input.title,
        input.context,
      );
      updatedDiscussion.id = discussionId;
      this.discussions[discussionIndex] = updatedDiscussion;
      return updatedDiscussion;
    }
    return null;
  }
}

export default DiscussionRepositoryInMemory;