export class UserNotFound extends Error {
  public status = 404;
  constructor() {
    super("User Not Found");
  }
}
