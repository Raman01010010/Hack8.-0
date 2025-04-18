const generateVerificationKey = () => {
    // Generate a random string of alphanumeric characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10; // Length of the verification key
    let verificationKey = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        verificationKey += characters.charAt(randomIndex);
    }
    return verificationKey;
};

module.exports = generateVerificationKey;
