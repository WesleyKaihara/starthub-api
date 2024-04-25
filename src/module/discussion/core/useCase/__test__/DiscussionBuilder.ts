import Discussion from '@discussion/core/entity/Discussion';

class DiscussionBuilder {
  private id: number;
  private title: string;
  private context: string;

  constructor() {
    this.id = 1;
    this.title = 'Default Title';
    this.context = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  }

  withTitle(title: string): DiscussionBuilder {
    this.title = title;
    return this;
  }

  withContext(context: string): DiscussionBuilder {
    this.context = context;
    return this;
  }

  build(): Discussion {
    return Discussion.restore(this.id, this.title, this.context);
  }
}

export default DiscussionBuilder;
