export class WorkspaceNotFound extends Error {
  private readonly statusCode: number;
  constructor() {
    super("Workspace Not Found");
    this.statusCode = 404;
  }
}
