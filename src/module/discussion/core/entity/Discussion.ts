export default class Discussion {
  title: string;
  context: string;

  static set(title: string, context: string): Discussion {
    const discussion = new Discussion();
    discussion.title = title;
    discussion.context = context;
    return discussion;
  }
}
