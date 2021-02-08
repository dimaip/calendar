const isGospel = (zachalo) =>
    zachalo.includes('Мк.') || zachalo.includes('Мф.') || zachalo.includes('Лк.') || zachalo.includes('Ин.');

export default isGospel;
