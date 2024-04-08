export default class UserRatingTopic {
  userId: number;
  projectId: number;
  ratingTopicId: number;
  value: number;

  static create(userId: number, projectId: number, ratingTopicId: number, value: number): UserRatingTopic {
    const userRatingTopic = new UserRatingTopic();
    userRatingTopic.userId = userId;
    userRatingTopic.projectId = projectId;
    userRatingTopic.ratingTopicId = ratingTopicId;
    return userRatingTopic;
  }

  static update(userId: number, projectId: number, ratingTopicId: number): UserRatingTopic {
    const userRatingTopic = new UserRatingTopic();
    userRatingTopic.userId = userId;
    userRatingTopic.projectId = projectId;
    userRatingTopic.ratingTopicId = ratingTopicId;
    return userRatingTopic;
  }
}
