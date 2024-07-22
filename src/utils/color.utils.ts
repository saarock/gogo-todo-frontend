class Color {
    generateRandomColor() {
        const colorHex = "0123456789abcdef"; // valid characters for hexadecimal color

        let randomColor = '#'; // hexadecimal color starts with '#'

        // Generate six random characters from colorHex
        for (let i = 0; i < 6; i++) {
            randomColor += colorHex[Math.floor(Math.random() * colorHex.length)];
        }

        return randomColor;
    }
}

export default new Color();
