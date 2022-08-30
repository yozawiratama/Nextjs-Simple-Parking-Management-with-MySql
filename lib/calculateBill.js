export function calculateBill(minutes) {
    if (minutes < 60) {
        return 5000;
    }

    const after1hour = minutes - 60;
    const additionalBill = Math.ceil(after1hour / 60) * 3000;

    return 5000 + additionalBill;
}