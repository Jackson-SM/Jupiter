import { Replace } from '@src/helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
      { createdAt?: Date; updatedAt?: Date; disabled?: boolean }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      disabled: props.disabled ?? false,
    };
  }

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this.props.firstName;
  }
  set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }
  set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  get email(): string {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
  }

  get disabled(): boolean {
    return this.props.disabled;
  }
  set disabled(disabled: boolean) {
    this.props.disabled = disabled;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
