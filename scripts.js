document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const placeholderImg = document.getElementById('placeholder-img');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const copyBtn = document.getElementById('copy-btn');
    const yearSpan = document.getElementById('year');

    // Actualiza el año en el pie de página
    yearSpan.textContent = new Date().getFullYear();

    function validateText(text) {
        // Solo minúsculas y espacios, según la tabla Unicode
        return /^[a-z\s]*$/.test(text);
    }

    function encryptText(text) {
        // Incrementa el valor Unicode de cada carácter
        return text.split('').map(char => {
            return String.fromCharCode(char.charCodeAt(0) + 1);
        }).join('');
    }

    function decryptText(text) {
        // Decrementa el valor Unicode de cada carácter
        return text.split('').map(char => {
            const charCode = char.charCodeAt(0);
            // Valida que sea un carácter en el rango permitido antes de decrementar
            if ((charCode >= 98 && charCode <= 122) || charCode === 33) { 
                return String.fromCharCode(charCode - 1);
            } else {
                // Mantiene el carácter si no es encriptado o es inválido
                return char;
            }
        }).join('');
    }

    function updateOutput(text) {
        if (text) {
            placeholderImg.style.display = 'none';
            outputText.value = text;
        } else {
            placeholderImg.style.display = 'block';
            outputText.value = '';
        }
    }

    encryptBtn.addEventListener('click', () => {
        const text = inputText.value;
        if (validateText(text)) {
            updateOutput(encryptText(text));
        } else {
            alert('Solo se permiten letras minúsculas y espacios.');
        }
    });

    decryptBtn.addEventListener('click', () => {
        const text = inputText.value;
        if (validateText(text)) {
            updateOutput(decryptText(text));
        } else {
            alert('Solo se permiten letras minúsculas y espacios.');
        }
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.value)
            .then(() => alert('Texto copiado al portapapeles'))
            .catch(err => console.error('Error al copiar el texto: ', err));
    });
});
