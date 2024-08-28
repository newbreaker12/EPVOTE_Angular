import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private message: string;

  setMessage(message: string) {
    this.message = message;
  }

  getMessage(): string {
    const msg = this.message;
    this.message = null; // Clear the message after retrieving it
    return msg;
  }
}
