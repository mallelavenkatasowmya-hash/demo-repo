let buses = [
  {name: "Orange Travels", fare: 900, img:"https://s1.rdbuz.com/bo-images/IND/WM/18112/49/FR/ML/webp/0NS1Tt.webp"},
  {name: "VRL Travels", fare: 1000, img:"https://www.comparabus.com/bundles/static/uploads/Bus/vrl%20travels/vrl-travels-cheap-bus-tickets.jpg" },
  {name:"SRM Travels",fare:900, img:"https://content.jdmagicbox.com/comp/srivilliputtur/e8/9999p4563.4563.221010112022.f7e8/catalogue/-x7ny0a0yjf.jpg"},
  {name:"Praveen Travels",fare:1100, img:"https://s3-ap-southeast-1.amazonaws.com/rbplus/BusImage/Domestic/19173_67_2.png"},
  {name:"KPN Travels", fare:1000, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlmBYEC7WjepkY4XKtLyhCkRmTPtsgnjRqzw&s"},
  {name:"Morning start Travels",fare:700, img:"https://miro.medium.com/1*ePUTEEmUpMBJW9UqIAalYA.jpeg"},
  {name:"Kaveri Travels",fare:900, img:"https://gst-contracts.s3.ap-southeast-1.amazonaws.com/uploads/bcc/cms/asset/avatar/321483/4.png"},
  {name:"RedBus",fare:1300, img:"https://thumbs.dreamstime.com/b/modern-red-bus-isolated-white-background-public-transport-vehicle-commute-travel-urban-scene-contemporary-design-futuristic-353415729.jpg"},
  {name:"Lemon Travels",fare:500, img:"https://s1.rdbuz.com/bo-images/IND/WM/9901/851/FR/ML/webp/Y2qRuo.webp"},
  {name:"Sindhu Travels",fare:700, img:"https://content3.jdmagicbox.com/v2/comp/hyderabad/l6/040p1232638977q8u3l6/catalogue/sindhu-travels-anand-nagar-colony-khairatabad-hyderabad-bus-ticketing-agents-p4jv2oyxhs.jpg"},
  {name:"Deccan way Travels",fare:1000, img:"https://5.imimg.com/data5/SELLER/Default/2025/2/487658263/OY/YS/IX/18243349/40-seater-bus-travel-services-500x500.jpeg"}
];
let selectedSeats=[];
let seatPrice=0;
let lastPaidAmount=0;
let passengers=[];
let discountAmount=0;
let appliedCoupon="";

function searchBus(){
  let busList = document.getElementById("busList");
  busList.innerHTML="<h2>Available Buses</h2>";
  buses.forEach((b,i)=>{
    busList.innerHTML+=`
      <div class="admin-bus">
        <img src="${b.img}" class="bus-img">
        <b>${b.name}</b><br>
        Time: ${b.time}<br>
        Fare: ₹${b.fare}<br>
        <button onclick="selectBus(${i})">Select</button>
      </div>`;
  });
}
function selectBus(i){
  seatPrice=buses[i].fare;
  document.getElementById("seatBox").style.display="block";
  generateSeats();
}
function generateSeats() {
  const layout = document.getElementById("seatLayout");
  layout.innerHTML = "";
  selectedSeats = [];

  const seatRows = [
    ["A1","A2","AISLE","A3"],
    ["A4","B1","AISLE","B2"],
    ["B3","B4","AISLE","C1"],
    ["C2","C3","AISLE","C4"]
  ];

  seatRows.forEach(row => {
    row.forEach(seatNo => {
      if (seatNo === "AISLE") {
        const space = document.createElement("div");
        space.className = "aisle";
        layout.appendChild(space);
      } else {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = seatNo;

        seat.onclick = () => {
          seat.classList.toggle("selected");
          selectedSeats.includes(seatNo)
            ? selectedSeats = selectedSeats.filter(s => s !== seatNo)
            : selectedSeats.push(seatNo);
        };

        layout.appendChild(seat);
      }
    });
  });
}
function goPassenger(){
  if(selectedSeats.length === 0){
    alert("Select seats");
    return;
  }
  document.getElementById("seatBox").style.display = "none";
  let passengerBox = document.getElementById("passengerBox");
  passengerBox.innerHTML = "<h2>Passenger Details</h2>";
  selectedSeats.forEach(seat => {
    passengerBox.innerHTML += `
      <h3>Seat ${seat}</h3>
      <input class="pName" placeholder="Name">
      <input class="pAge" type="number" placeholder="Age">
      <select class="pGender">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input class="pMobile" type="tel" placeholder="Mobile Number">
      <hr>`;
  });

  passengerBox.innerHTML += `<button onclick="goPayment()">Proceed to Payment</button>`;
  passengerBox.style.display = "block";
}
function goPayment(){
  passengers = [];
  let names = document.querySelectorAll(".pName");
  let ages = document.querySelectorAll(".pAge");
  let genders = document.querySelectorAll(".pGender");
  let mobiles = document.querySelectorAll(".pMobile");

  for(let i=0; i<selectedSeats.length; i++){
    if(!names[i].value || !ages[i].value || !genders[i].value || !mobiles[i].value){
      alert("Fill all passenger details for every seat");
      return;
    }
    passengers.push({
      seat: selectedSeats[i],
      name: names[i].value,
      age: ages[i].value,
      gender: genders[i].value,
      mobile: mobiles[i].value
    });
  }
  document.getElementById("passengerBox").style.display = "none";
  document.getElementById("paymentBox").style.display = "block";
}
function applyCoupon() {
  let code = document.getElementById("couponCode").value.trim().toUpperCase();
  let baseAmount = seatPrice * selectedSeats.length;
  discountAmount = 0;
  if (code === "SAVE10") discountAmount = baseAmount * 0.10;
  else if (code === "SAVE20") discountAmount = baseAmount * 0.20;
  else if (code === "FLAT100") discountAmount = 100;
  else if (code === "FIRST50") discountAmount = 50;
  else {
    document.getElementById("couponMsg").innerHTML =
      "<span style='color:red'>Invalid Coupon</span>";
    return;
  }
  appliedCoupon = code;
  document.getElementById("couponMsg").innerHTML =
    `<span style="color:green">
      Coupon ${code} applied! You saved ₹${discountAmount}
     </span>`;
}
function showPayment(){
  let amt = seatPrice*selectedSeats.length;
  let t = document.getElementById("paymentMethod").value;
  let paymentDetails = document.getElementById("paymentDetails");
  if(t==="upi")
    paymentDetails.innerHTML=`<input placeholder="UPI ID"><p>Amount ₹${amt}</p>`;
  else if(t==="card")
    paymentDetails.innerHTML=`<input placeholder="Card Holder"><input placeholder="Card Number">
    <input placeholder="MM/YY"><input placeholder="CVV"><p>Amount ₹${amt}</p>`;
  else if(t==="net")
    paymentDetails.innerHTML=`<input placeholder="Bank Name"><input placeholder="User ID">
    <input placeholder="Password"><p>Amount ₹${amt}</p>`;
}
function confirmBooking(){
  lastPaidAmount = seatPrice * selectedSeats.length;
  let paymentMethodVal = document.getElementById("paymentMethod").value;
  let paymentInfo = "";

  if(paymentMethodVal === "upi"){
    let upiId = document.querySelector("#paymentDetails input").value;
    paymentInfo = `Payment Method: UPI<br>UPI ID: ${upiId}<br>`;
  } else if(paymentMethodVal === "card"){
    let inputs = document.querySelectorAll("#paymentDetails input");
    paymentInfo = `Payment Method: Card<br>
                   Card Holder: ${inputs[0].value}<br>
                   Card Number: ${inputs[1].value}<br>
                   MM/YY: ${inputs[2].value}<br>
                   CVV: ${inputs[3].value}<br>`;
  } else if(paymentMethodVal === "net"){
    let inputs = document.querySelectorAll("#paymentDetails input");
    paymentInfo = `Payment Method: Net Banking<br>
                   Bank Name: ${inputs[0].value}<br>
                   User ID: ${inputs[1].value}<br>
                   Password: ${inputs[2].value}<br>`;
  }

  document.getElementById("paymentBox").style.display = "none";
  let confirmBox = document.getElementById("confirmBox");
  confirmBox.style.display = "block";

  let detailsHTML = `<h2>Booking Confirmed </h2>`;
  passengers.forEach(p => {
    detailsHTML += `
      Seat: ${p.seat}<br>
      Name: ${p.name}<br>
      Age: ${p.age}<br>
      Gender: ${p.gender}<br>
      Mobile: ${p.mobile}<br><hr>`;
  });

  detailsHTML += `Total Paid: ₹${lastPaidAmount}<br>${paymentInfo}
                  <span style="color:green">SMS Sent</span>
                  <br><button onclick="cancelTicket()">Cancel Ticket</button>`;

  confirmBox.innerHTML = detailsHTML;
}
function cancelTicket(){
  let refund=Math.floor(lastPaidAmount*0.8);
  document.getElementById("confirmBox").innerHTML=`
    <h2>Ticket Cancelled </h2>
    Paid: ₹${lastPaidAmount}<br>
    Refund (80%): ₹${refund}<br>
    <span style="color:green">Refund Initiated</span>`;
}
function adminLogin(){
  if(document.getElementById("adminUser").value==="admin" && document.getElementById("adminPass").value==="admin123"){
    document.getElementById("adminLoginBox").style.display="none";
    document.getElementById("adminPanel").style.display="block";
    showAdminBuses();
  } else alert("Invalid Login");
}

function addBus(){
  let name=document.getElementById("busName").value;
  let fare=document.getElementById("busFare").value;
  let time=document.getElementById("busTime").value;
  if(name && fare && time){
    buses.push({name:name,fare:fare,time:time});
    showAdminBuses();
  } else alert("Fill all fields");
}

function showAdminBuses(){
  let adminBusList=document.getElementById("adminBusList");
  adminBusList.innerHTML="<h3>Bus List</h3>";
  buses.forEach(b=>adminBusList.innerHTML+=`<div class="admin-bus">${b.name} - ₹${b.fare} (${b.time})</div>`);
}

function logoutAdmin(){
  document.getElementById("adminPanel").style.display="none";
  document.getElementById("adminLoginBox").style.display="block";
}  