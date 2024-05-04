import Interaction from '@discussion/core/entity/Interaction';
import User from '@identity/core/entity/User';

class InteractionBuilder {
  private id: number;
  private discussionId: number;
  private message: string;
  private userId: number;
  private user: User;

  constructor() {
    this.id = 1;
    this.discussionId = 1;
    this.userId = 1;
    this.message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    this.user = User.restore(
      1,
      'Test User',
      'user.test@email.com',
      'passwordTest123%6',
    );
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
    return Interaction.restore(
      this.id,
      this.discussionId,
      this.message,
      this.user,
    );
  }
}

export default InteractionBuilder;
