import {generateComments} from "../mock/comment.js";

export default class Comments {
  constructor(commentsCount) {
    this._commentsCount = commentsCount;
  }
  init() {
    this._commentsList = null;
    this._getCommentsList();
  }

  _getCommentsList() {
    this._commentsList = generateComments(this._commentsCount);
  }
}
