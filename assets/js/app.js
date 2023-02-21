const root = document.querySelector(".root");

root.classList.add("py-5");

const divContainer = document.createElement("div");
divContainer.classList.add("container");
root.append(divContainer);

const divRow = document.createElement("div");
divRow.classList.add("row", "justify-content-center");
divContainer.append(divRow);

const divCol1 = document.createElement("div");
divCol1.classList.add("col-lg-6");
divRow.append(divCol1);

const header = document.createElement("div");
const heading01 = document.createElement("h1");
const reload = document.createElement("div");
const output = document.createElement("div");

// Create Input Form
const input1 = document.createElement("input");
const input2 = document.createElement("input");
const addListBtn = document.createElement("button");
const formBox = document.createElement("div");

header.append(heading01, reload);
header.classList.add("d-flex", "justify-content-between");

divCol1.append(header, output, formBox);
heading01.textContent = "javaScript";
output.classList.add("output", "mt-4");
reload.classList.add("reload");
formBox.classList.add("mt-4");

input1.classList.add("form-control", "mt-3");
input2.classList.add("form-control", "mt-3");

input1.setAttribute("placeholder", "Name");
input2.setAttribute("placeholder", "Age");

input1.setAttribute("type", "text");
input2.setAttribute("type", "number");

addListBtn.textContent = "Add to List";
addListBtn.classList.add("btn", "btn-primary", "mt-3");

formBox.append(input1, input2, addListBtn);

const url = "./assets/js/list.json";
let myLists = [];
let localData = localStorage.getItem("myList");

window.addEventListener("DOMContentLoaded", () => {
    output.textContent = "Loading....";

    if (localData) {
        myLists = JSON.parse(localStorage.getItem("myList"));
        maker();
    } else {
        reloader();
    }
});

const reloader = () => {
    fetch(url)
        .then((rep) => rep.json())
        .then((data) => {
            myLists = data;
            maker();
            savetoStorage();
        });
};

const addToList = () => {
    console.log(input1.value);
    console.log(input2.value);

    if (input1.value.length > 3) {
        const myObj = {
            name: input1.value,
            age: input2.value,
            status: false,
        };

        const val = myLists.length;
        myLists.push(myObj);
        savetoStorage();
        myList(myObj, val);
    }
    input1.value = "";
    input2.value = "";
};

addListBtn.addEventListener("click", addToList);

// Create Reload Button
const reloadButton = document.createElement("button");
reloadButton.textContent = "Reload JSON";
reload.append(reloadButton);
reloadButton.classList.add("btn", "btn-secondary", "mt-3");
reloadButton.addEventListener("click", reloader);

const maker = () => {
    output.textContent = "";
    myLists.forEach((element, index) => {
        myList(element, index);
    });
};

const myList = (item, index) => {
    const list = document.createElement("div");
    list.classList.add("box");
    list.innerHTML = `Name: ${item.name}, Age(${item.age})`;
    output.append(list);

    if (item.status) {
        list.classList.add("active");
    } else {
        list.classList.add("inActive");
    }

    list.addEventListener("click", () => {
        list.classList.toggle("active");
        list.classList.toggle("inActive");

        if (list.classList.contains("active")) {
            myLists[index].status = true;
        } else {
            myLists[index].status = false;
        }
        savetoStorage();
    });

    const span = document.createElement("span");
    span.textContent = "X";
    list.append(span);

    span.addEventListener("click", (e) => {
        console.log(index);
        e.stopPropagation();
        list.remove();
        myLists.splice(index, 1);
        savetoStorage();
    });
};

const savetoStorage = () => {
    console.log(myLists);
    localStorage.setItem("myList", JSON.stringify(myLists));
};
