import { Comment } from "./Comment";

describe("comment", () => {
  it("should create a new comment instance", () => {
    const comment = new Comment({
      content: "content comment",
      taskId: "taskId",
      userId: "userId",
    });

    expect(comment).toBeTruthy();
    expect(comment).toBeDefined();
  });
});
