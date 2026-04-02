const ordersData = [
  {
    id: "1",
    scholarshipName: "Excelentce in Computer Sciendce",
    sponsor: "NorthByte Group",
    value: "$1200",
    email: "awards@northbyte.com",
    deadline: "2026-04-30",
   
  },
  {
    id: "2",
    scholarshipName: "Data Science Merit Award",
    sponsor: "MindForward Foundation",
    value: "$900",
    email: "grants@mindfoward.com",
    deadline: "2026-05-15",
   
  },
  {
    id: "3",
    scholarshipName: "Student Startup Grant",
    sponsor: "Union Saving Bank",
    value: "$1500",
    email: "comunity@unionbank.com",
    deadline: "2026-04-30",
    
  },
  {
    id: "1",
    scholarshipName: "Excelentce in Computer Sciendce",
    sponsor: "NorthByte Group",
    value: "$1200",
    email: "awards@northbyte.com",
    deadline: "2026-04-30",
    
  },
  {
    id: "1",
    scholarshipName: "Excelentce in Computer Sciendce",
    sponsor: "NorthByte Group",
    value: "$1200",
    email: "awards@northbyte.com",
    deadline: "2026-04-30",
  }
];

// Lưu dữ liệu vào localStorage khi tải file này lên nếu chưa có
if (!localStorage.getItem("ecommerce_orders")) {
  localStorage.setItem("ecommerce_orders", JSON.stringify(ordersData));
}
