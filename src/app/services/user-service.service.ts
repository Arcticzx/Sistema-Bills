import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private Id: string | null = null;

  setId(id: string) {
    this.Id = id;
  }

  getId(): string | null {
    return this.Id;
  }
}
