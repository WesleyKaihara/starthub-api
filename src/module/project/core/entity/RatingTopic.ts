export default class RatingTopic {
  name: string;
  description: string;

  static create(name: string, description: string): RatingTopic {
    const ratingTopic = new RatingTopic();
    ratingTopic.name = name;
    ratingTopic.description = description;
    return ratingTopic;
  }

  static update(name: string, description: string): RatingTopic {
    const ratingTopic = new RatingTopic();
    ratingTopic.name = name;
    ratingTopic.description = description;
    return ratingTopic;
  }
}
