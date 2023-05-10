import { randomUUID } from "crypto";
import { Replace } from "src/helpers/Replace";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date | null }>,
    _id?: string,
  ) {
    this._id = _id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  }

  get id() {
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

  get createdAt(): Date | null | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
  set updatedAt(updatedAt: Date | null | undefined) {
    this.props.updatedAt = updatedAt;
  }
}
