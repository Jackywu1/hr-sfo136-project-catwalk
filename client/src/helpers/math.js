module.exports = {
  getAverageRating: (ratings) => {
    let ratingsSum = 0;
    let ratingsCount = 0;
    for (const entries of Object.entries(ratings)) {
      const [rating, count] = entries.map(Number);
      ratingsSum += rating * count;
      ratingsCount += count;
    }
    const averageRating = ratingsSum / ratingsCount;
    return averageRating;
  },
  normalizeRating: (rating) => {
    let normalizedRating = (Math.round(rating * 4) / 4);
    normalizedRating += (normalizedRating % 1 === 0.25) ? 0.08 : 0;
    normalizedRating -= (normalizedRating % 1 === 0.75) ? 0.08 : 0;
    return normalizedRating;
  },
};
