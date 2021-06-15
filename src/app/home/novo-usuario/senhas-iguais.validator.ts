import { FormGroup } from '@angular/forms';

// Validação envolvendo mais de um campo:

export function senhasIguaisValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value ?? '';
  const confirmation = formGroup.get('confirmPassword')?.value ?? '';

  if (password.trim() + confirmation.trim()) {
    return password === confirmation ? null : { senhasIguais: true };
  }

  return null;
}
