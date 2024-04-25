import {
  CreateInteraction,
  CreateInteractionBody,
} from '@discussion/core/useCase';
import {
  InteractionRepository,
  InteractionRepositoryInMemory,
} from '@discussion/shared/persistence';

describe('CreateInteraction', () => {
  let createInteraction: CreateInteraction;
  let interactionRepository: InteractionRepository;

  beforeEach(() => {
    interactionRepository = new InteractionRepositoryInMemory();
    createInteraction = new CreateInteraction(interactionRepository);
  });

  it('should create a interaction', async () => {
    const input: CreateInteractionBody = {
      discussionId: 1,
      message: 'Test message',
    };

    const interaction = await createInteraction.execute(input);

    expect(interaction).toBeDefined();
    expect(interaction.discussionId).toBe(1);
    expect(interaction.message).toBe('Test message');
  });

  it('should throw error if interaction description is too short', async () => {
    const input: CreateInteractionBody = {
      discussionId: 1,
      message: 'Test',
    };

    await expect(createInteraction.execute(input)).rejects.toThrow(
      /Interaction message must have at least 10 characters/,
    );
  });
});
