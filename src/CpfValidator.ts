export function validateCpf(rawCpf: string): boolean {
  const cpf = rawCpf.replace(/\D/g, "");
  if (isInvalidLength(cpf)) return false;
  if (allDigitsTheSame(cpf)) return false;
  const digit1 = calculateDigit(cpf, 10);
  const digit2 = calculateDigit(cpf, 11);
  const actualDigit = extractDigits(cpf);
  const validatedDigit = `${digit1}${digit2}`;
  return actualDigit === validatedDigit;
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit) * factor--;
  }
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function isInvalidLength(cpf: string) {
  return cpf.length !== 11;
}

function allDigitsTheSame(cpf: string) {
  const [firstDigit] = cpf;
  return [...cpf].every((digit) => digit === firstDigit);
}

function extractDigits(cpf: string) {
  return cpf.slice(9);
}
