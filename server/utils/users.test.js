const expect = require("expect");

const {
    Users
} = require("./users.js");

var users;

beforeEach(() => {

    var users = new User();
    users.users = [{
            id: "1",
            name: "Amit",
            room: "A"
        },

        {
            id: "2",
            name: "Bhanu",
            room: "B"
        },

        {
            id: "3",
            name: "Vasu",
            room: "C"
        }

    ]
})


it("should add new user ", () => {
    var users = new Users();
    var user = {
        id: "123",
        name: "Andrew",
        room: "A"
    }
})

var reUser = users.addUser(user.id, user.name, user.room);
expect(users.user).toEqual([user])