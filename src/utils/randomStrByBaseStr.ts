export function generateRandomString(baseString: string, length:number = 16) {
    if (!baseString || typeof baseString !== 'string') {
        throw new Error('Se requiere un string válido como base.');
    }

    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    const baseArray = baseString.split('');

    for (let i = 0; i < length; i++) {
        const randomChoice = Math.floor(Math.random() * 3);
        if (randomChoice === 0 && baseArray.length > 0) {
            // Tomar un carácter aleatorio del string base y cambiar su caso
            const char = baseArray[Math.floor(Math.random() * baseArray.length)];
            result += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        } else if (randomChoice === 1) {
            // Agregar un carácter completamente aleatorio
            result += randomChars[Math.floor(Math.random() * randomChars.length)];
        } else {
            // Agregar un número aleatorio
            result += Math.floor(Math.random() * 10);
        }
    }

    // Borrar espacios en blanco
    return result.replace(/\s/g,'');
}