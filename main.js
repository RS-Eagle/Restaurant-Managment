var user_name = prompt("Enter Your Name");

let breakf = [
  "Sandwich  - Rs 30",
  "Fried eggs - Rs 30",
  "Omelette - Rs 30",
  "Paratha - Rs 30",
  "Poha - Rs 30",
  "Masala Dosa - Rs 30",
];
let lunch = [
  "Veg Palak Gravy  - Rs 30",
  "Dal Makhani - Rs 30",
  "Rice - Rs 30",
  "Lemon Rice - Rs 30",
  "Maggie - Rs 30",
  "Dum Aloo - Rs 30",
];

let dinner = [
  "Fried Chicken  - Rs 30",
  "Fried Fish - Rs 30",
  "Non-Veg Thali  - Rs 30",
  "Veg Thali - Rs 30",
  "Aloo Matar - Rs 30",
  "Palak Panner - Rs 30",
];

let snacks = [
  "Fried Chicken  - Rs 30",
  "Fried Fish - Rs 30",
  "Non-Veg Thali  - Rs 30",
  "Veg Thali - Rs 30",
  "Aloo Matar - Rs 30",
  "Palak Panner - Rs 30",
];

const lines = ["Thanks For Your Order", "Your Order Is"];

let ulid = ["break-ul", "lunch-ul", "dinner-ul"];
let boxid = [breakf, lunch, dinner];
let iul = 0;
let ibox = 0;
let checkin = 1;
let iwrite = -1;
let index = 1;
let line;
let again = true;
let writing_speed = 50;
let last_word_pause = 4000;
let word_wait = 1000;
let initial_start = 2000;
var typewriting_class = document.querySelector(".typewriter");
var orderi;

var button = document.querySelector(".btn");

function populate() {
  if (iul === 3) {
    // console.log("hi");
  } else {
    var list_break = document.getElementById(`${ulid[iul]}`);
    var box_decided = boxid[ibox];
    populator(list_break, box_decided);
  }
}

function populator(list_break, box_decided) {
  for (i = 0; i < box_decided.length; i++) {
    var checkbox = document.createElement("input");
    var randdiv = document.createElement("div");
    randdiv.classList.add("check-div");
    checkbox.type = "checkbox";
    checkbox.classList.add(`check${checkin}`);
    checkbox.id = `myCheckbox${checkin}`;
    checkbox.classList.add("check");
    var label = document.createElement("label");
    label.htmlFor = `myCheckbox${checkin}`;
    label.id = `myCheckbox${checkin}`;
    label.appendChild(document.createTextNode(box_decided[i]));
    randdiv.appendChild(checkbox);
    randdiv.appendChild(label);
    list_break.appendChild(randdiv);
    checkin++;
  }
  iul++;
  ibox++;

  populate();
}

populate();

var checkboxses = document.querySelectorAll(".check");

checkboxses.forEach((r) => {
  r.addEventListener("click", () => {
    button.disabled = false;
  });
});

button.addEventListener("click", () => {
  checkboxses.forEach((r) => {
    if (r.checked) {
      let checked_classlist = r.id;
      let user_clicked_list = document.querySelectorAll(
        `#${checked_classlist}`
      )[1];
      lines.push(user_clicked_list.innerHTML);
    }
  });
  orderi = 10 * (lines.length - 2);
  order_text();

  button.disabled = true;
  dec_start(start_text);
});

function line_decider() {
  iwrite++;
  line = lines[iwrite];
  writing(line);
}

const dec = (line) => {
  let updatedline = line.slice(0, index);
  typewriting_class.innerHTML = updatedline;
  setTimeout(() => {
    if (iwrite + 1 == lines.length && index == line.length && again) {
      setTimeout(() => {
        again = false;
        dec(line);
      }, last_word_pause);
    } else if (iwrite + 1 == lines.length && index == 1 && !again) {
      iwrite = -1;
      index = 1;
      line_decider();
    } else if (index == 1) {
      index = 1;
      line_decider();
    } else {
      index--;
      dec(line);
    }
  }, writing_speed);
};

function writing(line) {
  let updatedline = line.slice(0, index);
  typewriting_class.innerHTML = updatedline;
  var prize = (lines.length - 2) * 30;
  document.querySelector(".h").innerHTML = `Your Total Is: ${prize} Rs`;
  setTimeout(() => {
    if (index > line.length) {
      setTimeout(() => {
        dec(line);
      }, word_wait);
    } else {
      index++;
      writing(line);
    }
  }, writing_speed);
}

let start_text = typewriting_class.innerHTML;
console.log(start_text);
let initial_start_index = 14;
const dec_start = (line) => {
  let updatedline1 = line.slice(0, initial_start_index);
  typewriting_class.innerHTML = updatedline1;
  if (initial_start_index == 1) {
    line_decider();
  } else {
    setTimeout(() => {
      initial_start_index--;
      dec_start(start_text);
    }, writing_speed);
  }
};

let bli = false;

setInterval(() => {
  if (bli) {
    typewriting_class.classList.add("blink");
    bli = false;
  } else {
    typewriting_class.classList.remove("blink");
    bli = true;
  }
}, 500);

var order = document.querySelector(".order");
if (user_name == null) {
  order.innerHTML = `Welcome Sir`;
  user_name = "";
} else {
  order.innerHTML = `Welcome ${user_name} Sir`;
}

const order_text = () => {
  if (orderi >= 0) {
    setTimeout(() => {
      order.innerHTML = `Your Order Will Be Ready In: ${orderi}`;
      orderi--;
      order_text();
    }, 1000);
  } else {
    order.innerHTML = `Your Order Is Ready`;
    setTimeout(() => {
      order.innerHTML = `Have A Nice Day ${user_name}`;
    }, 3000);
  }
};
