enum Gender {
  Male = 1,
  Female = 2
}
let user: {name: string, gender: Gender}
user = {name: 'xiaoyu', gender: Gender.Male}
console.log(user);
