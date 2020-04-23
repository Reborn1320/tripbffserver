import { TripEvent } from "./events";
import { TripReducers } from "./reducers/_tripReducer";
import { TripHandlerMediator } from "./handlers/TripHandlerMediator";
import { ITripRepository } from "../models/ITripRepository";
import { TripsMinimizedReducer } from "./mirroredReducers/TripsMinimizedReducer";
import { ITrip } from "../models/ITrip";
import { ITripsRepository } from "../models/ITripsRepository";
import { ITripRepository2 } from "../models/ITripRepository2";

/**
 * todo use kafka to stream events or gRPC
 * todo can rerun events
 * This is a mediator, on retrieve command/event, update trip/trips via corresponding repositories
 *
 * @export
 * @class ServiceBus
 */
export class ServiceBus {
  // eventHandlers: (() => void)[] = [];
  // public addEventHandler(handler: () => void) {
  //   this.eventHandlers.push(handler);
  // }
  private reducer: TripReducers;
  private reducer2: TripHandlerMediator;
  private _tripMinimizedReducer: TripsMinimizedReducer;
  constructor(
    private TripRepository: ITripRepository,
    private TripRepository2: ITripRepository2,
    private TripsRepository: ITripsRepository
  ) {
    this.reducer = new TripReducers();
    this.reducer2 = new TripHandlerMediator(
      this.TripRepository2,
      this.TripsRepository
    );

    this._tripMinimizedReducer = new TripsMinimizedReducer();
  }

  public async emit(event: TripEvent) {
    console.log("emitting a event: ", event.type);

    if ((await this.secondSubscriber(event)) === true) return;

    this.firstSubscriber(event);
  }

  private async firstSubscriber(event: TripEvent) {
    //todo merge these reducers + trip repository into one, do not return state

    const tripId = event.tripId;
    const ownerId = event.ownerId;

    //the first subscriber consume our event
    let state = await this.TripRepository.get(ownerId, tripId, ownerId);
    state = await this.reducer.updateState(state as ITrip, event);

    await this.TripRepository.update(ownerId, state);

    //TODO: should we do it every update ? Or we will do it when user load profile page ?
    //todo the second subscriber consume our event
    const minimizedState = await this._tripMinimizedReducer.transform(state);

    await this.TripsRepository.update(ownerId, minimizedState);
  }

  private async secondSubscriber(event: TripEvent) {
    return this.reducer2.handle(event);
  }
}
