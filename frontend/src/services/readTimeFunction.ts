export default function readTimeFunction(content) : number{
    // Eliminar espacios en blanco al principio y al final del texto
    content = content.trim();

    // Dividir el texto en palabras usando los espacios en blanco como separadores
    const palabras: string[] = content.split(/\s+/);

    // Retornar la cantidad de palabras encontradas
    return palabras.length;
    
}