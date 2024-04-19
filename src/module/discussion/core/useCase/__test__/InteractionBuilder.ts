import Interaction from '@discussion/core/entity/Interaction';

class InteractionBuilder {
  private id: number;
  private discussionId: number;
  private message: string;

  constructor() {
    this.id = 1;
    this.discussionId = 1;
    this.message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  }

  withDiscussionId(discussionId: number): InteractionBuilder {
    this.discussionId = discussionId;
    return this;
  }

  withMessage(message: string): InteractionBuilder {
    this.message = message;
    return this;
  }

  build(): Interaction {
    return Interaction.restore(this.id, this.discussionId, this.message);
  }
}

export default InteractionBuilder;
