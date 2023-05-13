import { Replace } from "../../../helpers/Replace";
import ObjectID from "bson-objectid";

interface WorkspaceProps {
  title: string;
  description: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Workspace {
  private _id: string;
  private props: WorkspaceProps;

  constructor(
    props: Replace<WorkspaceProps, { createdAt?: Date; updatedAt?: Date }>,
    _id?: string,
  ) {
    this._id = _id ?? new ObjectID().toHexString();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
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

  get creatorId(): string {
    return this.props.creatorId;
  }
  set creatorId(creatorId: string) {
    this.props.creatorId = creatorId;
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
