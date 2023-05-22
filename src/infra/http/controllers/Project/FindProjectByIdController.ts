import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindProjectByIdCase } from "~/application/use-cases/projects/find-project-by-id-case";
import { ProjectViewModel } from "../../view-models/project-view-model";

export class FindProjectByIdController {
  constructor(private findProjectByIdCase: FindProjectByIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    try {
      const { project } = await this.findProjectByIdCase.execute({
        id: id,
      });

      const projectFormatToHttp = ProjectViewModel.toHttp(project);

      return h.response(projectFormatToHttp);
    } catch (err: any) {
      return h
        .response({ message: err.message, statusCode: err.output.statusCode })
        .code(err.output.statusCode);
    }
  };
}
