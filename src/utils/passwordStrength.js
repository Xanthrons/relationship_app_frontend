export const getPasswordStrength = (password) => {
    let score = 0;
    if (!password) return { score, label: "None", color: "gray" };
    
    if (password.length > 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    const colors = ["#ff4d4d", "#ffa64d", "#ffdb4d", "#99ff33", "#00cc00"];

    return { score, label: labels[score], color: colors[score] };
};