import UserRatingTopic from '@project/core/entity/UserRatingTopic';

class UserRatingTopicBuilder {
  private id: number;
  private value: number;
  private userId: number;
  private projectId: number;
  private ratingTopicId: number;

  constructor() {
    this.id = 1;
    this.value = 1;
    this.userId = 1;
    this.ratingTopicId = 1;
  }

  withValue(value: number): UserRatingTopicBuilder {
    this.value = value;
    return this;
  }

  withUserId(userId: number): UserRatingTopicBuilder {
    this.userId = userId;
    return this;
  }

  withProjectId(projectId: number): UserRatingTopicBuilder {
    this.projectId = projectId;
    return this;
  }

  withRatingTopicId(ratingTopicId: number): UserRatingTopicBuilder {
    this.ratingTopicId = ratingTopicId;
    return this;
  }

  build(): UserRatingTopic {
    return UserRatingTopic.restore(
      this.id,
      this.userId,
      this.projectId,
      this.ratingTopicId,
      this.value,
    );
  }
}

export default UserRatingTopicBuilder;
