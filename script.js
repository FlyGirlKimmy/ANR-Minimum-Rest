document.getElementById('anr-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const landingTime = document.getElementById('landing-time').value;
    const fdp = parseFloat(document.getElementById('fdp').value);
    const isULR = document.getElementById('ulr').checked;

    const restStart = new Date(`1970-01-01T${landingTime}`);
    restStart.setHours(restStart.getHours() + 1);
    restStart.setMinutes(restStart.getMinutes() + 30);

    const result = calculateRest(restStart, fdp, isULR);
    document.getElementById('result').textContent = `Minimum Rest Required: ${result}`;
});

function calculateRest(restStart, fdp, isULR) {
    const localNightStart = new Date(restStart);
    localNightStart.setHours(22, 0, 0, 0);

    const localNightEnd = new Date(localNightStart);
    localNightEnd.setHours(8, 0, 0, 0);
    localNightEnd.setDate(localNightEnd.getDate() + 1);

    if (isULR && fdp > 16 && fdp <= 21) {
        return "48 hours with 3 local nights";
    }

    if (fdp > 16) {
        return "24 hours with a local night";
    }

    if (fdp >= 10) {
        const roundedFdp = Math.ceil(fdp);
        return `${roundedFdp} hours`;
    }

    if (fdp < 10) {
        if (restStart < localNightStart || restStart >= localNightEnd) {
            return "12 hours without a local night";
        } else {
            return "10 hours with a local night";
        }
    }

    return "Invalid input";
}
