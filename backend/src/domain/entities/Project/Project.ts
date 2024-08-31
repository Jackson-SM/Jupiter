import ObjectID from "bson-objectid";
import { Replace } from "~/helpers/Replace";

interface ProjectProps {
  title: string;
  description: string;
  workspaceId: string;
  leadId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Project {
  private _id: string;
  private props: ProjectProps;

  constructor(
    props: Replace<ProjectProps, { createdAt?: Date; updatedAt?: Date }>,
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

  get workspaceId(): string {
    return this.props.workspaceId;
  }
  set workspaceId(workspaceId: string) {
    this.props.workspaceId = workspaceId;
  }

  get leadId(): string {
    return this.props.leadId;
  }
  set leadId(leadId: string) {
    this.props.leadId = leadId;
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
