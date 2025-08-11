trait Shape {
    fn area(&self) -> u32;
}

struct Rect {
    width: u32,
    height: u32,
}

impl Shape for Rect {
  fn area(&self) -> u32 {
      return self.width * self.height;
  }
}

fn main() {
    let r: Rect = Rect {
        width: 10,
        height: 10
    };

    let ans = get_area(r);
    print!("{}!",ans);
}

fn get_area<T: Shape>(s: T) -> u32 {
    return s.area()
}