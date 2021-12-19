# pub-sub-topic-ts
Topic based Publish-Subscribe pattern library TypeScript implementation.

### Installation
```sh
    npm install pub-sub-topic-ts
```

### API

```typescript
    // subscribe to a topic
    subscribe<T>(name: string, callback: (data: T[]) => void): Subscriber

    // publish to a topic 
    publish<T>(topicName: string, data: T): void

    //unsubscribe from topic
    unsubscribe(subscriber: Subscriber): void

    //delete a topic
    deleteTopic(name: string): void

    //get list of topics
    getTopics(): string[]
```


