export async function sendVerificationCode(email) {
  console.log(`(Simulado) Enviando código a: ${email}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: '123456' }); // Código simulado
    }, 1000);
  });
}

export async function registerUser(data) {
  console.log('(Simulado) Registrando usuario:', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}
