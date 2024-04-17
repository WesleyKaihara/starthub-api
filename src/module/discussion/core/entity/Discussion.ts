export default class Discussion {
  id: number;
  title: string;
  context: string;

  static create(title: string, context: string): Discussion {
    const discussion = new Discussion();
    discussion.title = title;
    discussion.context = context;
    discussion.isValid();
    return discussion;
  }

  static update(id: number, title: string, context: string): Discussion {
    const discussion = new Discussion();
    discussion.id = id;
    discussion.title = title;
    discussion.context = context;
    discussion.isValid();
    return discussion;
  }

  static restore(id: number, title: string, context: string): Discussion {
    const discussion = new Discussion();
    discussion.id = id;
    discussion.title = title;
    discussion.context = context;
    return discussion;
  }

  private isValid() {
    if (this.title.length < 10) {
      throw new Error('Discussion title must have at least 10 characters');
    }

    if (this.context.length < 30) {
      throw new Error('Discussion context must have at least 30 characters');
    }
  }
}
