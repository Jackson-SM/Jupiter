import ObjectID from "bson-objectid";
import { Replace } from "~/helpers/Replace";

interface CommentProps {
  title: string;
  description: string;
  userId: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Comment {
  private _id: string;
  private props: CommentProps;

  constructor(
    props: Replace<CommentProps, { createdAt?: Date; updatedAt?: Date }>,
    _id?: string,
  ) {
    this._id = _id ?? new ObjectID().toHexString();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  }

  get id() {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;
  }

  get description(): string {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }

  get userId(): string {
    return this.props.userId;
  }
  set userId(userId: string) {
    this.props.userId = userId;
  }

  get taskId(): string {
    return this.props.taskId;
  }
  set taskId(taskId: string) {
    this.props.taskId = taskId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
