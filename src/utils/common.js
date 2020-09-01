import {PROFILE_RATING, ProfileIntervals} from "../const.js";

const getRandomBooleanValue = () => Math.random() > 0.5;

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getRandomFractionalNumbers = (min, max, count) => (min + (Math.random() * (max - min))).toFixed(count);

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length - 1);

  return items[randomIndex];
};

// todo
const removeElement = (selector) => {
  const removerElement = document.querySelector(selector);
  if (removerElement) {
    removerElement.remove();
  }
};

const reshuffle = (data, maxNumber) => {
  const shuffle = data.slice().sort(() => Math.random() - 0.5);
  shuffle.length = getRandomIntegerNumber(1, maxNumber);
  return shuffle;
};


const setProfileRating = (count) => {
  const indexProfile = ProfileIntervals.findIndex((interval) =>
    (count > interval.MIN && count <= interval.MAX));

  return PROFILE_RATING[indexProfile];
};

export {
  getRandomBooleanValue,
  getRandomDate,
  getRandomFractionalNumbers,
  getRandomIntegerNumber,
  getRandomItem,
  removeElement,
  reshuffle,
  setProfileRating,
};
