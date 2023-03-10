let form = document.getElementById("form"),
    textInput = document.getElementById("textInput"),
    msg = document.getElementById("msg"),
    dateInput = document.getElementById("dateInput"),
    textarea = document.getElementById("textarea"),
    tasks=document.getElementById("tasks"),
    addBtn=document.getElementById("addBtn");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();

})

let formValidation = () => {
    if (textInput.value === '') {
        console.log("Falid to submit");
        msg.innerHTML = "Input Cannot be blank";
    }
    else {
        console.log("Form Suubmission Success");
        msg.innerHTML = "";
        acceptData();
        addBtn.click();

        (()=>{
            addBtn.setAttribute("data-bs-dismiss","");
        })();

    }
}

let data = [];

let acceptData = () => {
    data.push({
        text:textInput.value,
        date:dateInput.value,
        description:textarea.value,
    });
    localStorage.setItem("data",JSON.stringify(data));
    
    console.log(data);
    createTask();
}

let createTask=()=>{
    tasks.innerHTML="";
    data.map((x,y)=>{
       return( tasks.innerHTML +=` 
       <div id=${y}>
    <span>${x.text}</span>
    <span>${x.date}</span>
    <p>${x.description}</p>

    <span class="options">
        <i data-bs-toggle="modal" data-bs-target="#form" onclick="editTask(this)" class="fas fa-edit"></i>
        <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
    </span>
</div>`);
    })
    
resetForm();

}

let resetForm=()=>{
    textInput.value="";
    dateInput.value="";
    textarea.value="";
}

let deleteTask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data));

}

let editTask=(e)=>{
    let selectedTask=e.parentElement.parentElement;
    textInput.value=selectedTask.children[0].innerHTML;
    dateInput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;

    selectedTask.remove();
    deleteTask(e);
};

(()=>{
    data=JSON.parse(localStorage.getItem("data"));
    createTask();
    console.log(data);
})()
