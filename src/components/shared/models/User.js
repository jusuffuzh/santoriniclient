/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.forename = null;
    this.name = null;
    this.email = null;
    this.username = null;
    this.password = null;
    this.birthday = null;
    this.token = null;
    this.creationday = null;
    this.status = null;
    this.games = null;
    this.moves = null;
    Object.assign(this, data);
  }
}
export default User;
