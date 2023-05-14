import { Request, ResponseToolkit } from "@hapi/hapi";

export class CreateWorkspaceController {
  async handler(request: Request, h: ResponseToolkit) {
    return "Create Workspace";
  }
}
