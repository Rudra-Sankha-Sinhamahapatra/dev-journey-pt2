#[derive(Debug)]
struct User {
    username: String,
    password: String,
    age: u32,
}

fn main() {
    let u: User = User {
        username: String::from("Hi"),
        password: String::from("ok"),
        age: 21,
    };

    println!("{:?}",u);
}
