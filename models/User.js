import validator from "validator";
import bookshelf from "../config/bookshelf";
import Image from "./Image";
import Comment from "./Comment";
/**
 * Example User Model.
 */

const User = bookshelf.Model.extend({
  tableName: "users",
  timestamps: false,

  images() {
    return this.hasMany(Image);
  },

  comments() {
    return this.hasMany(Comment);
  }
});

export default User;
