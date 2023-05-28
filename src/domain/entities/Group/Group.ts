import ObjectID from "bson-objectid";
import { Replace } from "~/helpers/Replace";

interface GroupProps {
  name: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Group {
  private _id: string;
  private props: GroupProps;

  constructor(
    props: Replace<GroupProps, { createdAt?: Date; updatedAt?: Date }>,
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

  get name(): string {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
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
