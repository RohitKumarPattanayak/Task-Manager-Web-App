let globaltaskdata = []
taskContents = document.getElementById('taskContents')
const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imgurl").value,
        title: document.getElementById("tasktitle").value,
        type: document.getElementById("tasktype").value,
        description: document.getElementById("taskdescription").value
    };
    
   taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails));
   globaltaskdata.push(newTaskDetails)
   saveToLocalStorage();
}

const generateTaskCard = ({id,url,title,type,description})=>{
    return (`<div class="col-md-6 col-lg-4 mt-3 id=${id} key=${id}">
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-end ">
                    <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                        <i class="fas fa-trash-alt"></i>    
                    </button>
                </div>
            </div>
            <img src=${url} class="card-ing-top" alt="image">
            <div class="card-body">
                <h3 class="card-title">${title}</h3>
                <p class="card-text">${description}</p>        
                <span class="badge bg-primary">${type}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary float-end">OPEN TASK</button>
            </div>
        </div>
    </div>`)
}

const saveToLocalStorage = ()=>{
    localStorage.setItem("Tasky",JSON.stringify({tasks: globaltaskdata}))
}

const reloadTaskCard = ()=>{
    const localcopy = JSON.parse(localStorage.getItem("Tasky"))
    if(localcopy){
        globaltaskdata = localcopy["tasks"]
    }
        globaltaskdata.forEach((cardData)=>{
        taskContents.insertAdjacentHTML('beforeend',generateTaskCard(cardData));
    })
}

const deleteTask = (e)=> {
const targetID = e.getAttribute("name")
const removeTask = globaltaskdata.filter((card)=>card.id!==targetID)
globaltaskdata = removeTask
saveToLocalStorage()
window.location.reload()
}


const editTask = (e) => {
    const targetID = e.getAttribute("name");
    console.log(e)
    console.log(e.parentNode)
    console.log(e.parentNode.parentNode.parentNode.childNodes)
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5])
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CAHNGES"
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","savedEditTask(this)")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("background","red")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("border","3px solid black")
    saveToLocalStorage();
    // window.location.reload();
}
const savedEditTask = (e) =>{

}
