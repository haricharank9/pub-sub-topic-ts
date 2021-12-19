import { v4 as uuidv4 } from 'uuid';
import { Subscriber } from './subscriber';
import { Topic } from './topic';

export class PubSub {
  private _topics: Topic[] = [];

  public publish<T>(topicName: string, data: T): void {
    const topic = this._topics.find(t => {
      return t.name === topicName;
    });
    if (topic) {
      topic.publish(data);
    }
  }
  public getTopics(): string[] {
    return this._topics.map(t => t.name);
  }
  public deleteTopic(name: string): void {
    this._topics = this._topics.filter(topic => {
      return topic.name !== name;
    });
  }

  public subscribe<T>(name: string, callback: (data: T[]) => void): Subscriber {
    const topic = this._topics.find(t => {
      return t.name === name;
    });
    const subscriber = new Subscriber(name, uuidv4(), callback);
    if (topic) {
      topic.subscribe<T>(subscriber);
    } else {
      const topic = this.createTopic(name);
      topic.subscribe(subscriber);
    }
    return subscriber;
  }

  private createTopic(topic: string): Topic {
    const newTopic = new Topic(topic);
    this._topics.push(newTopic);
    return newTopic;
  }

  public unsubscribe(subscriber: Subscriber): void {
    const topic = this._topics.find(t => {
      return t.name === subscriber.topicName;
    });
    if (topic) {
      topic.unsubscribe(subscriber);
    }
  }
}
