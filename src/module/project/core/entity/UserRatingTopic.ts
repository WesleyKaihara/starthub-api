export default class UserRatingTopic {
  id: number;
  userId: number;
  projectId: number;
  ratingTopicId: number;
  value: number;

  static create(
    userId: number,
    projectId: number,
    ratingTopicId: number,
    value: number,
  ): UserRatingTopic {
    const userRatingTopic = new UserRatingTopic();
    userRatingTopic.userId = userId;
    userRatingTopic.projectId = projectId;
    userRatingTopic.value = value;
    userRatingTopic.ratingTopicId = ratingTopicId;
    userRatingTopic.isValid();
    return userRatingTopic;
  }

  static update(
    id: number,
    userId: number,
    projectId: number,
    ratingTopicId: number,
    value: number,
  ): UserRatingTopic {
    const userRatingTopic = new UserRatingTopic();
    userRatingTopic.id = id;
    userRatingTopic.userId = userId;
    userRatingTopic.projectId = projectId;
    userRatingTopic.ratingTopicId = ratingTopicId;
    userRatingTopic.value = value;
    userRatingTopic.isValid();
    return userRatingTopic;
  }

  static restore(
    id: number,
    userId: number,
    projectId: number,
    ratingTopicId: number,
    value: number,
  ): UserRatingTopic {
    const userRatingTopic = new UserRatingTopic();
    userRatingTopic.id = id;
    userRatingTopic.userId = userId;
    userRatingTopic.projectId = projectId;
    userRatingTopic.ratingTopicId = ratingTopicId;
    userRatingTopic.value = value;
    return userRatingTopic;
  }

  isValid() {
    if (this.value < 0) {
      throw new Error('Value of rating needs greater than 0');
    }

    if (this.userId < 0) {
      throw new Error('User ID needs greater than 0');
    }

    if (this.projectId < 0) {
      throw new Error('Project ID needs greater than 0');
    }

    if (this.ratingTopicId < 0) {
      throw new Error('Rating Topic ID needs greater than 0');
    }
  }
}
