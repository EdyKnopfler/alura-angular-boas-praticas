
import { AbstractControl } from "@angular/forms";

// Validação customizada

export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string;

  if (valor !== valor.toLowerCase()) {
    return { minusculo: true };  // Indicando erro
  }

  return null;
}
