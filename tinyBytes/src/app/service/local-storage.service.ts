import { Injectable } from "@angular/core";
import { LocalStorageRefService } from "./local-storage-ref.service";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
   private localStorage: Storage;

   constructor(private localStorageRefService: LocalStorageRefService) {
      this.localStorage = localStorageRefService.localStorage
   }
}