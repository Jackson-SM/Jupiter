import ObjectID from "bson-objectid";
import { Replace } from "~/helpers/Replace";

interface TaskProps {
  title: string;
  description: string;
  groupId: string;
  doneDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(
    props: Replace<
      TaskProps,
      { createdAt?: Date; updatedAt?: Date; doneDate?: Date | null }
    >,
    _id?: string,
  ) {
    this._id = _id ?? new ObjectID().toHexString();
    this.props = {
      ...props,
      doneDate: props.doneDate ?? null,
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

  get groupId(): string {
    return this.props.groupId;
  }
  set groupId(groupId: string) {
    this.props.groupId = groupId;
  }

  get doneDate(): Date | null {
    return this.props.doneDate;
  }
  set doneDate(doneDate: Date | null) {
    this.props.doneDate = doneDate;
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
