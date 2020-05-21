Math.clamp = (value, min, max) => Math.min(Math.max(value, min), max);

Math.lerp = (number, prime, ratio) => number + (number - prime) * ratio;