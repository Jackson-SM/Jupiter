import { ProjectParticipanting } from "./ProjectParticipanting";

describe("Project Participanting", () => {
  it("should create a new project participant instance", () => {
    const projectParticipanting = new ProjectParticipanting({
      projectId: "aaaaaaaaaa",
      userId: "aaaaaaaaaaaaaa",
    });

    expect(projectParticipanting).toBeTruthy();
    expect(projectParticipanting).toBeDefined();
  });
});
