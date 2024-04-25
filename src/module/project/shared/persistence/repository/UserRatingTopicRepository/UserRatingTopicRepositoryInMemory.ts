import UserRatingTopic from '@project/core/entity/UserRatingTopic';
import { UserRatingTopicRepository } from './userRatingTopic.repository';
import { CreateUserRatingTopicBody } from '@project/core/useCase';

export class UserRatingTopicRepositoryInMemory implements UserRatingTopicRepository {
  private userRatingTopics: UserRatingTopic[];
  private nextId: number;

  constructor() {
    this.userRatingTopics = [];
    this.nextId = 1;
  }

  async getAllUserRatingTopics(): Promise<UserRatingTopic[]> {
    return this.userRatingTopics;
  }

  async createUserRatingTopic(input: CreateUserRatingTopicBody): Promise<UserRatingTopic> {
    const userRatingTopic = UserRatingTopic.create(
      input.userId,
      input.projectId,
      input.ratingTopicId,
      input.value,
    );
    userRatingTopic.id = this.nextId++;
    this.userRatingTopics.push(userRatingTopic);
    return userRatingTopic;
  }
}

