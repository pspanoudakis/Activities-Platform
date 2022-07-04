export function roundRating(rawScore) {
    const rounded = Math.round(rawScore * 10) / 10

    return Number.isNaN(rounded) ? 0 : rounded
}
