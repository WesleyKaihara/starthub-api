import RatingTopic from '@project/core/entity/RatingTopic';

class RatingTopicBuilder {
  private id: number;
  private name: string;
  private description: string;

  constructor() {
    this.id = 1;
    this.name = 'Default Rating Topic';
    this.description = 'Default Rating Topic Description';
  }

  withName(name: string): RatingTopicBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): RatingTopicBuilder {
    this.description = description;
    return this;
  }

  build(): RatingTopic {
    return RatingTopic.restore(this.id, this.name, this.description);
  }
}

export default RatingTopicBuilder;
