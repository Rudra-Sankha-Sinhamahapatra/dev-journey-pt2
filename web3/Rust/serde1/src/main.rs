use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct User {
    username: String,
    password: String,
}

fn main() {
    let json_str = String::from("{\"username\":\"rudra\",\"password\":\"sankha\"}");
    
    let user_result: Result<User, serde_json::Error> = serde_json::from_str(&json_str);
    
    match user_result {
        Ok(user) => {
            println!("Deserialized user: {:?}", user);
            
            let serialized = serde_json::to_string(&user).unwrap();
            println!("Serialized back to JSON: {}", serialized);
            
            let serialized_pretty = serde_json::to_string_pretty(&user).unwrap();
            println!("Pretty JSON:\n{}", serialized_pretty);
        },
        Err(e) => println!("Error deserializing: {}", e),
    }
    
    let new_user = User {
        username: String::from("john_doe"),
        password: String::from("secure123"),
    };
    
    let new_json = serde_json::to_string(&new_user).unwrap();
    println!("New user serialized: {}", new_json);
}

