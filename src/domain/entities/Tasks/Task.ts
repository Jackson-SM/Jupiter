import ObjectID from "bson-objectid";
import { Replace } from "~/helpers/Replace";

interface TaskProps {
  title: string;
  description: string;
  projectId: string;
  responsibleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Project {
  private _id: string;
  private props: TaskProps;

  constructor(
    props: Replace<TaskProps, { createdAt?: Date; updatedAt?: Date }>,
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

  get projectId(): string {
    return this.props.projectId;
  }
  set projectId(projectId: string) {
    this.props.projectId = projectId;
  }

  get responsibleId(): string {
    return this.props.responsibleId;
  }
  set responsibleId(responsibleId: string) {
    this.props.responsibleId = responsibleId;
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
