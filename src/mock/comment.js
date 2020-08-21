import {COMMENT_AUTHORS, COMMENT_TEXTS} from "../mock/const";
import {EMOJI_SMILES} from "../const.js";
import {getRandomDate, getRandomItem} from "../utils/common.js";

const START_YEAR = 2020;

const generateComment = () => {
  const author = getRandomItem(COMMENT_AUTHORS);
  const commentDate = getRandomDate(new Date(START_YEAR, 0), new Date());
  const emoji = getRandomItem(EMOJI_SMILES);
  const id = String(new Date() + Math.random());
  const text = getRandomItem(COMMENT_TEXTS);

  return ({
    author,
    commentDate,
    emoji,
    id,
    text,
  });
};

const generateComments = (commentsCount) => {
  return new Array(commentsCount).fill(``).map(generateComment);
};

export {generateComments};
