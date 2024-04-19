import { UpdateInteraction } from '@discussion/core/useCase/Interaction/UpdateInteraction/UpdateInteractionUseCase';
import InteractionBuilder from '../../InteractionBuilder';
import { InteractionRepository, InteractionRepositoryInMemory } from '@discussion/shared/persistence';


describe('UpdateInteraction', () => {
  let updateInteraction: UpdateInteraction;
  let interactionRepository: InteractionRepository;

  beforeEach(() => {
    interactionRepository = new InteractionRepositoryInMemory();
    updateInteraction = new UpdateInteraction(interactionRepository);
  });

  it('should update a interaction', async () => {
    const interactionId = 1;

    const interaction = new InteractionBuilder()
      .withDiscussionId(1)
      .withMessage("Test Message")
      .build();
    await interactionRepository.createInteraction(interaction);

    const updateInteractionDto = new InteractionBuilder()
      .withDiscussionId(1)
      .withMessage("Test Message")
      .build();

    const updatedInteraction = await updateInteraction.execute(
      interactionId,
      updateInteractionDto,
    );

    expect(updatedInteraction).toBeDefined();
    expect(updatedInteraction.discussionId).toBe(1);
    expect(updatedInteraction.message).toBe("Test Message");
  });

  it('should throw error if interaction description is too short', async () => {
    const interactionId = 1;
    const updateInteractionDto = new InteractionBuilder()
      .withDiscussionId(1)
      .withMessage("Test")
      .build();

    await expect(
      updateInteraction.execute(interactionId, updateInteractionDto),
    ).rejects.toThrow(/Interaction message must have at least 10 characters/);
  });

});
