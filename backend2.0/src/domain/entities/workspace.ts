import { Replace } from '@src/helpers/Replace';
import { randomUUID } from 'crypto';

export interface WorkspaceProps {
  title: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Workspace {
  private _id: string;
  private props: WorkspaceProps;

  constructor(
    props: Replace<WorkspaceProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get ownerId(): string {
    return this.props.ownerId;
  }

  set ownerId(ownerId: string) {
    this.props.ownerId = ownerId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
