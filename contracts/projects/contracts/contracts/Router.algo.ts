import { Contract } from '@algorandfoundation/tealscript';

export class EventManager extends Contract {
  state: {
    events: string[];
  };

  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  addEvent(event: string) {
    const newAsset = sendAssetCreation({
      configAssetTotal: 1,
      configAssetUnitName: 'Event',
      configAssetName: event,
      configAssetURL: 'https://www.event.com',
    });

    console.log('Asset created: ', newAsset);

    this.state.events.push(event);
  }

  getEvents(): string[] {
    return this.state.events;
  }
}
