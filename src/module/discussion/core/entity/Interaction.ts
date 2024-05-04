import User from '@identity/core/entity/User';

export default class Interaction {
  id?: number;
  discussionId: number;
  message: string;
  userId: number;
  user: User;

  static create(
    discussionId: number,
    message: string,
    userId: number,
  ): Interaction {
    const interaction = new Interaction();
    interaction.discussionId = discussionId;
    interaction.message = message;
    interaction.userId = userId;
    interaction.isValid();
    return interaction;
  }

  static update(
    id: number,
    discussionId: number,
    message: string,
    userId: number,
  ): Interaction {
    const interaction = new Interaction();
    interaction.id = id;
    interaction.discussionId = discussionId;
    interaction.message = message;
    interaction.userId = userId;
    interaction.isValid();
    return interaction;
  }

  static restore(
    id: number,
    discussionId: number,
    message: string,
    user: User,
  ): Interaction {
    const interaction = new Interaction();
    interaction.id = id;
    interaction.discussionId = discussionId;
    interaction.message = message;
    interaction.user = user;
    return interaction;
  }

  private isValid() {
    if (this.message.length < 5) {
      throw new Error('Interaction message must have at least 10 characters');
    }
  }
}
