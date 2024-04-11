export default class RatingTopic {
  id?: number;
  name: string;
  description: string;

  static create(name: string, description: string): RatingTopic {
    const ratingTopic = new RatingTopic();
    ratingTopic.name = name;
    ratingTopic.description = description;
    ratingTopic.isValid();
    return ratingTopic;
  }

  static update(id: number, name: string, description: string): RatingTopic {
    const ratingTopic = new RatingTopic();
    ratingTopic.id = id;
    ratingTopic.name = name;
    ratingTopic.description = description;
    ratingTopic.isValid();
    return ratingTopic;
  }

  static restore(id: number, name: string, description: string): RatingTopic {
    const ratingTopic = new RatingTopic();
    ratingTopic.id = id;
    ratingTopic.name = name;
    ratingTopic.description = description;
    return ratingTopic;
  }

  private isValid() {
    if (this.name.length < 5) {
      throw new Error('Rating Topic Name must have at least 5 characters');
    }

    if (this.description.length < 10) {
      throw new Error(
        'Rating Topic Description must have at least 10 characters',
      );
    }
  }
}
