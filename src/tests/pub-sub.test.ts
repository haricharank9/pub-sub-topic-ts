import { PubSub, Subscriber } from '../';

describe('PubSub', () => {
  let pubSub: PubSub;
  const topicName = 'Test_Subscription';
  beforeAll(() => {
    pubSub = new PubSub();
  });
  afterEach(() => {
    pubSub.deleteTopic(topicName);
  });
  test('Subscribing to topic returns an instance of subscriber', () => {
    const sub = pubSub.subscribe(topicName, data => {
      console.log(data);
    });
    expect(sub).toBeDefined();
    expect(sub).toBeInstanceOf(Subscriber);
    expect(sub).toHaveProperty('id');
    expect(sub).toHaveProperty('topicName', topicName);
  });
  test('Subscribing to topic adds new topic to PubSub', () => {
    const _ = pubSub.subscribe(topicName, data => {
      console.log(data);
    });
    const existingTopics = pubSub.getTopics();
    expect(existingTopics).toHaveLength(1);
    expect(existingTopics).toContain(topicName);
  });

  test('Publishing to topic passes data to callback', done => {
    const publishData = { value: 'test' };
    const callback = (data: any[]) => {
      try {
        expect(data.pop()).toHaveProperty('value', publishData.value);
        done();
      } catch (error) {
        done(error);
      }
    };
    const _sub = pubSub.subscribe(topicName, callback);
    pubSub.publish(topicName, publishData);
  });
});
