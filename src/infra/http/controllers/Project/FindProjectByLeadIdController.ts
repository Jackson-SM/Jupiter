import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindProjectByLeadIdCase } from "~/application/use-cases/projects/find-project-by-lead-id-case";

export class FindProjectByLeadIdController {
  constructor(private findProjectByLeadIdCase: FindProjectByLeadIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    try {
      const { projects } = await this.findProjectByLeadIdCase.execute({
        id: id,
      });

      return h.response(projects);
    } catch (err: any) {
      console.log(err);
    }
  };
}
