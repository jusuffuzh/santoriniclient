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
    this.registrationDate = null;
    this.status = null;

    Object.assign(this, data);
  }
}
export default User;
