# CORAL-HAIL MONOREPO

## Development

### Requirements

- nvm
- docker
- docker-compose

## Components

### Redis

Redis is used as a message queue. Every time a screenshot of a website is requested, the URL is added to the queue.

### Worker

Listens to the URL queue in redis and takes a screenshot of every URL received via the queue.

## Scaling

The system can be scaled by adding more workers. If the URL queue is growing, adding more workers that can process the queue in paralell will reduce the queue length. If even more pressure is added, it might become necessary to analyze each part of the worker code and iron out potential bottle necks.

### Limitations

I am using third-party components that I currently have little insight into. These components include the nodejs redis adapter and the url-to-screenshot library. They may or may not prove to become bottlenecks when scaling _coral-hail_.
