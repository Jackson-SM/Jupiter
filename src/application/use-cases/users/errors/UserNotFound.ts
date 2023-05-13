export class UserNotFound extends Error {
  private readonly statusCode = 404;
  constructor() {
    super("User Not Found");
  }
}
