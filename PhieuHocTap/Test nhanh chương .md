```md
# PHIẾU ÔN TẬP – KIỂM TRA KIẾN THỨC CẦN ĐẠT  
## Chương 5: Những kiến thức nền tảng về JavaScript (5.1 → 5.4)

**Họ và tên:** Nịnh Tiến Dũng  
**Mã sinh viên:** 2451271097  
**Lớp:** 66ANM2  
**Thời gian làm:** 60 phút  
**Hình thức:** Cá nhân  
**Yêu cầu:** Trả lời ngắn gọn, đúng ý; với câu code hãy viết đúng cú pháp.

---

## A. Mục tiêu kiến thức cần đạt

Sau khi hoàn thành Chương 5, sinh viên cần:

- Mô tả được JavaScript là gì, chạy ở đâu, vai trò trong web (HTML/CSS/JS). [web:37]  
- Hiểu cú pháp cơ bản, khai báo biến `var/let/const`, kiểu dữ liệu thường gặp, toán tử, ép kiểu cơ bản. [web:57][web:58][web:42]  
- Viết được câu lệnh điều kiện, vòng lặp; định nghĩa và gọi hàm, nắm được tham số/giá trị trả về. [web:47][web:63]  
- Nhận biết khái niệm OOP trong JS: object, property, method; hiểu class ở mức cơ bản và cơ chế prototype ở mức nhận biết. [web:48][web:61]

---

## B. PHẦN 5.1 – GIỚI THIỆU VỀ JAVASCRIPT

### B1. Câu hỏi ngắn
1) JavaScript là gì? (Viết 1–2 câu) [web:37]  
JavaScript là ngôn ngữ lập trình dùng để tạo chức năng và tương tác cho trang web, giúp trang web phản hồi hành động của người dùng

2) JavaScript có thể chạy ở đâu? Nêu ít nhất 2 môi trường. [web:37]  
- Trong trình duyệt web  
- Trên máy chủ với Node.js

3) Phân biệt vai trò của HTML – CSS – JavaScript trong trang web (mỗi cái 1 ý). [web:37]  
- HTML: Tạo cấu trúc nội dung của trang web  
- CSS: Dùng để thiết kế và trang trí giao diện  
- JavaScript: Dùng để tạo chức năng và xử lý tương tác trên trang web

### B2. Đúng/Sai (ghi Đ hoặc S)
4) JavaScript chỉ chạy được trong trình duyệt. S [web:37]  
5) JavaScript dùng để xử lý tương tác và hành vi của trang web. Đ [web:37]

---

## C. PHẦN 5.2 – CÚ PHÁP JAVASCRIPT & CÁC KIỂU DỮ LIỆU

### C1. Khai báo biến: var/let/const
6) Điền vào chỗ trống:  
- `let` có phạm vi (scope) theo block (function/block). [web:57]  
- `var` có phạm vi (scope) theo function (function/block). [web:57]  
- `const` không (có/không) cho phép gán lại (reassign) biến. [web:57]

7) Cho đoạn code, hãy dự đoán và giải thích ngắn:

```js
const arr =;
arr.push(4);
arr =;[^1]
```

- Dòng nào chạy được? Dòng nào lỗi? Vì sao? [web:57]

Dòng chạy được: arr.push(4);

Dòng lỗi: arr = [5,6];

vì const không cho phép gán lại biến, nhưng vẫn có thể thay đổi nội dung bên trong object/array

### C2. Kiểu dữ liệu (Data Types)

8) JavaScript có các kiểu dữ liệu cơ bản (primitive) và kiểu Object. Hãy liệt kê ít nhất 5 kiểu dữ liệu. [web:58][web:42]

- Number
- String
- Boolean
- Null
- Object

9) Cho các biểu thức sau, hãy ghi kết quả của `typeof`:
```js
typeof 10
typeof "10"
typeof true
typeof null
typeof { a: 1 }
```

- Kết quả: 
typeof 10 → "number"

typeof "10" → "string"

typeof true → "boolean"

typeof null → "object"

typeof { a: 1 } → "object"

Ghi chú: typeof null trả về "object" dù null không phải object

> Gợi ý: Có một “điểm đặc biệt” với `null`. Em ghi chú lại nếu thấy khác thường. [web:42]

### C3. Toán tử \& ép kiểu cơ bản

10) Dự đoán kết quả:
```js
"5" + 1
"5" - 1
```

- Kết quả: "5" + 1 → "51" ; "5" - 1 → 4 [web:42]

11) Giải thích ngắn sự khác nhau giữa `==` và `===` (1–2 câu).

== so sánh giá trị và có ép kiểu dữ liệu.

=== so sánh cả giá trị và kiểu dữ liệu, không ép kiểu.

---

## D. PHẦN 5.3 – CẤU TRÚC ĐIỀU KHIỂN \& HÀM

### D1. Điều kiện if/else

12) Viết đoạn code: nếu `score >= 5` in `"Pass"`, ngược lại in `"Fail"`. [web:47][web:63]
```js
let score = 6;

if (score >= 5) {
  console.log("Pass");
} else {
  console.log("Fail");
}
```

13) Câu hỏi: Trong chuỗi `if ... else if ... else`, khi một điều kiện đúng thì các nhánh còn lại có được kiểm tra nữa không? Giải thích ngắn. [web:65]

Chương trình sẽ chạy từ trên xuống, gặp điều kiện đúng đầu tiên thì thực hiện khối đó và bỏ qua các nhánh còn lại

### D2. Vòng lặp

14) Viết vòng lặp `for` in ra các số từ 1 đến 5. [web:47]
```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

15) Viết vòng lặp `while` để cộng dồn tổng từ 1 đến n (n cho trước). [web:47]
```js
// Input:
let n = 5;

let i = 1;
let sum = 0;

while (i <= n) {
  sum += i;
  i++;
}

console.log(sum);
```


### D3. Hàm (function)

16) Hoàn thiện hàm `sum(a, b)` trả về tổng 2 số: [web:47]
```js
function sum(a, b) {
  return a + b;
}
```

17) Phân biệt:

- **Parameter (tham số)** là gì?
- **Argument (đối số)** là gì?
(Trả lời ngắn + ví dụ 1 dòng)

Parameter (tham số): biến được khai báo trong định nghĩa hàm.

Argument (đối số): giá trị truyền vào khi gọi hàm.

Ví dụ: 

sum(3, 4);

a, b → parameter

3, 4 → argument

18) Viết hàm `isEven(n)` trả về `true` nếu n chẵn, `false` nếu n lẻ.
```js
function isEven(n) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
```


---

## E. PHẦN 5.4 – LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG (OOP) VỚI JAVASCRIPT

### E1. Object cơ bản

19) Tạo một object `student` có các property: `name`, `id`, `gpa` và method `introduce()` in ra câu giới thiệu. [web:61]
```js
const student = {
  name: "An",
  id: "SV001",
  gpa: 3.2,
  introduce() {
    console.log("Hello, my name is " + this.name);
  }
};
```

20) Cho object:
```js
const student = {
  name: "An",
  gpa: 3.2
};
```

- Truy cập `name` theo 2 cách khác nhau (dot notation và bracket notation). [web:61]

```js
// Cách 1:
  student.name
// Cách 2:
  student["name"]
```


### E2. Class (mức cơ bản)

21) Hoàn thiện class `Person` có:

- constructor nhận `name`, `age`
- method `greet()` in `"Hello, I'm <name>"` [web:61]

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log("Hello, I'm " + this.name);
  }
}

const p1 = new Person("Linh", 20);
p1.greet();
```

22) (Câu hỏi) `constructor` trong class dùng để làm gì? (1 câu) [web:61]

constructor là hàm khởi tạo được gọi khi tạo object mới từ class, dùng để khởi tạo giá trị ban đầu cho các thuộc tính

### E3. Prototype (mức nhận biết)

23) Prototype trong JavaScript liên quan đến cơ chế “kế thừa/tra cứu thuộc tính” giữa các object. Em hãy mô tả prototype bằng lời của em (2–3 câu). [web:48]

Prototype là cơ chế kế thừa trong JavaScript. Mỗi object có thể truy cập thuộc tính hoặc method từ prototype của nó nếu bản thân object không có. JavaScript sẽ tìm dần trong chuỗi prototype.
24) Quan sát đoạn ví dụ (không cần thuộc lòng):
```js
const personPrototype = {
  greet() { console.log("hello!"); }
};

const carl = Object.create(personPrototype);
carl.greet();
```

- `Object.create(personPrototype)` làm gì? (1 câu) [web:48]

tạo một object mới và đặt personPrototype làm prototype của object đó

---

## F. TỰ ĐÁNH GIÁ (Self-Reflection)

1) Em tự chấm mức hiểu của mình (khoanh tròn):

- 5.1 Giới thiệu JS:  Khá rõ
- 5.2 Cú pháp \& kiểu DL: Tạm ổn
- 5.3 Điều khiển \& hàm: Tạm ổn
- 5.4 OOP JS: Tạm ổn

2) Ba điều em còn chưa chắc hoặc muốn hỏi thêm:
1. Cơ chế prototype và prototype chain trong JavaScript
2. .................................................................................
3. .................................................................................

---

