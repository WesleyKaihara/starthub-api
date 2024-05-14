import Interaction from '@discussion/core/entity/Interaction';
import { GetAllInteractions } from '@discussion/core/useCase';
import {
  InteractionRepository,
  InteractionRepositoryInMemory,
} from '@discussion/shared/persistence';

describe('GetAllInteractions', () => {
  let getAllInteractions: GetAllInteractions;
  let interactionRepository: InteractionRepository;

  beforeEach(() => {
    interactionRepository = new InteractionRepositoryInMemory();
    getAllInteractions = new GetAllInteractions(interactionRepository);
  });

  it('should get all interactions', async () => {
    const interaction1 = Interaction.create(
      1,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1',
      1,
    );
    const interaction2 = Interaction.create(
      2,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2',
      1,
    );
    await interactionRepository.createInteraction(interaction1);
    await interactionRepository.createInteraction(interaction2);

    const interactions = await getAllInteractions.execute();

    expect(interactions).toHaveLength(2);
    expect(interactions[0].discussionId).toBe(1);
    expect(interactions[0].message).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1',
    );

    expect(interactions[1].discussionId).toBe(2);
    expect(interactions[1].message).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2',
    );
  });
});
