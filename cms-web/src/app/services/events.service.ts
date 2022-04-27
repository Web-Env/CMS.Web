import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    refreshSidebarEvent: EventEmitter<void> = new EventEmitter();
}