class User {
  static count = 0;

  private _name: string;
  private readonly _login: string;
  private _password: string;
  private readonly _grade: number;

  constructor(name: string, login: string, password: string, grade: number) {
    if (!Number.isInteger(grade) || grade <= 0) {
      throw new Error("grade должен быть целым положительным числом");
    }

    this._name = name;
    this._login = login;
    this._password = password;
    this._grade = grade;

    // Суперпользователи учитываются в отдельном счётчике
    if (new.target === User) {
      User.count++;
    }
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get login(): string {
    return this._login;
  }

  set login(_value: string) {
    console.log("Невозможно изменить логин!");
  }

  get password(): string {
    return "********";
  }

  set password(value: string) {
    this._password = value;
  }

  get grade(): string {
    return "Неизвестное свойство grade";
  }

  set grade(_value: number) {
    console.log("Неизвестное свойство grade");
  }

  showInfo(): void {
    console.log(`Name: ${this._name}, Login: ${this._login}`);
  }

  eq(other: User): boolean {
    return this._grade === other._grade;
  }

  lt(other: User): boolean {
    return this._grade < other._grade;
  }

  gt(other: User): boolean {
    return this._grade > other._grade;
  }
}

class SuperUser extends User {
  static count = 0;

  private _role: string;

  // Порядок аргументов вроде соответствует примеру
  // name, login, password, role, grade
  constructor(
    name: string,
    login: string,
    password: string,
    role: string,
    grade: number
  ) {
    super(name, login, password, grade);
    this._role = role;
    SuperUser.count++;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  showInfo(): void {
    console.log(
      `Name: ${this.name}, Login: ${this.login}, Role: ${this.role}`
    );
  }
}





// некий пример  

const user1 = new User("Paul McCartney", "paul", "1234", 3);
const user2 = new User("George Harrison", "george", "5678", 2);
const user3 = new User("Richard Starkey", "ringo", "8523", 3);
const admin = new SuperUser("John Lennon", "john", "0000", "admin", 5);

user1.showInfo();
admin.showInfo();

console.log(`Всего обычных пользователей: ${User.count}`);
console.log(`Всего супер-пользователей: ${SuperUser.count}`);

console.log(user1.lt(user2));  // false (0_0) 
console.log(admin.gt(user3));  // true
console.log(user1.eq(user3)); // true

user3.name = "Ringo Starr"; 
user1.password = "Pa$$w0rd";

console.log(user3.name);     // Ringo Starr (-_-*)
console.log(user2.password); // ********
console.log(user2.login);    // george

user2.login = "geo";         // выведет сообщение об ошибке
console.log(user3.grade);    // Неизвестное свойство grade (-_-)
admin.grade = 10;            // выведет сообщение об ошибке // gg wp
