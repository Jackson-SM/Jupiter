import ObjectID from "bson-objectid";
import { Replace } from "~/helpers/Replace";

interface ProjectParticipantingProps {
  userId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProjectParticipanting {
  private _id: string;
  private props: ProjectParticipantingProps;

  constructor(
    props: Replace<
      ProjectParticipantingProps,
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

  get id() {
    return this._id;
  }

  get userId(): string {
    return this.props.userId;
  }
  set userId(userId: string) {
    this.props.userId = userId;
  }

  get projectId(): string {
    return this.props.projectId;
  }
  set projectId(projectId: string) {
    this.props.projectId = projectId;
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
