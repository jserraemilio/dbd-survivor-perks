// Genera un string random de 16 caracteres a partir de un string base. 
// Además, es compatible con URLs, ya que no añade caracteres especiales que puedan romper la URL.
export function generateRandomString(baseString: string, length: number = 16): string {
    if (!baseString || typeof baseString !== 'string') {
        throw new Error('Se requiere un string válido como base.');
    }

    const urlSafeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~';
    let result = '';
    const baseArray = baseString.split('');

    for (let i = 0; i < length; i++) {
        const randomChoice = Math.floor(Math.random() * 2);
        if (randomChoice === 0 && baseArray.length > 0) {
            // Tomar un carácter aleatorio del string base y cambiar su caso si es una letra
            const char = baseArray[Math.floor(Math.random() * baseArray.length)];
            result += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        } else {
            // Agregar un carácter completamente aleatorio compatible con URLs
            result += urlSafeChars[Math.floor(Math.random() * urlSafeChars.length)];
        }
    }

    return result;
}
