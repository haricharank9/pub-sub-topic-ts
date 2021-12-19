import { Subscriber } from './subscriber';

export class Topic {
  private _subscribers: Array<Subscriber> = [];
  private _data: any[] = [];
  public name: string;
  constructor(protected _name: string) {
    this.name = _name;
  }

  private notifyAll(data: any[]): void {
    for (const subscriber of this._subscribers) {
      subscriber.notify(data);
    }
  }
  private addSubscriber(subscriber: Subscriber) {
    this._subscribers.push(subscriber);
  }
  private removeSubscriber(subscriber: Subscriber) {
    this._subscribers = this._subscribers.filter(s => {
      return s.id !== subscriber.id;
    });
  }

  public publish<T>(data: T) {
    this._data.push(data);
    this.notifyAll(this._data);
  }
  public subscribe<T>(subscriber: Subscriber<T>): void {
    this.addSubscriber(subscriber);
  }

  public unsubscribe<T>(subscriber: Subscriber<T>): void {
    this.removeSubscriber(subscriber);
  }
}
