import { Injectable } from "@angular/core";
import { Validator, AbstractControl } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class MatchPassword implements Validator {
  validate(control: AbstractControl) {
    const { password, passwordConfirmation } = control.value;

    if (password === passwordConfirmation) {
      return null;
    }

    return { passwordsDontMatch: true };
  }
}
