import {AuthState} from "../auth/auth.type";
import {EventStreamState} from "../eventStream/eventStream.type";
import {ApisState} from "../apis/apis.type";

export interface AppState {
    auth: AuthState
    eventStream: EventStreamState
    apis: ApisState
}
