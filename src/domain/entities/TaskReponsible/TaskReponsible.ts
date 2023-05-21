import { Replace } from "../../../helpers/Replace";
import ObjectID from "bson-objectid";

interface TaskResponsibleProps {
  userId: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class TaskResponsable {
  private _id: string;
  private props: TaskResponsibleProps;

  constructor(
    props: Replace<
      TaskResponsibleProps,
      { createdAt?: Date; updatedAt?: Date }
    >,
    _id?: string,
  ) {
    this._id = _id ?? new ObjectID().toHexString();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  }

  get id(): string {
    return this._id;
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
