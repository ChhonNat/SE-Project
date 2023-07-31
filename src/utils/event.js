import { Subject } from "rxjs";

const subject = new Subject();

export const eventService = {
      setEventName: (eName, data) => subject.next({eName: eName, data: data}),
      getEventName: () => subject.asObservable()
};
