import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";

@Injectable({
   providedIn: 'root',
})
export class ErrorHandlerService {
   constructor (private messageService: MessageService) {}

   handleError(message: string, error: any): void {
      const errorMessage = `${ message }: ${ error.message || error }`;
      this.messageService.errorMessage(message);
      console.error(errorMessage);
   }
}
