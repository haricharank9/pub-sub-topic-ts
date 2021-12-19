export class Subscriber<T = any> {
  public topicName: string;
  public id: string;
  private _next: (value: T[]) => void;
  constructor(protected _topicName: string, protected _id: string, protected next: (value: T[]) => void) {
    this._next = next;
    this.topicName = _topicName;
    this.id = _id;
  }

  public notify(value: T[]): void {
    if (this._next) {
      this._next(value);
    }
  }
}
