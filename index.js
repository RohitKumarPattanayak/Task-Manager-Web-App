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
                <button class="btn btn-outline-primary float-end" name=${id}>OPEN TASK</button>
            </div>
        </div>
    </div>`)
}

const saveToLocalStorage = ()=>{
    localStorage.setItem("Tasky",JSON.stringify({tasks: globaltaskdata}))///in this form.
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
const removeTask = globaltaskdata.filter((card)=>{
    if (card.id != targetID){
        return card
    }    
})
globaltaskdata = removeTask
saveToLocalStorage()
window.location.reload()
}
//Cleared

const editTask = (e) => {
    const targetID = e.getAttribute("name");
    // console.log(e)
    // console.log(e.parentNode)
    // console.log(e.parentNode.parentNode)
    // console.log(e.parentNode.parentNode.parentNode)
    // console.log(e.parentNode.parentNode.parentNode.childNodes)
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].style = "display : none")
    e.style = "display: None"
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CAHNGES"
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","savedEditTask(this)")
    // e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("background","red")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style = "background : red"
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("border","3px solid black")
}
const savedEditTask = (e) =>{
    e.innerHTML="OPEN TASK"
    e.style.color="green"
    e.style.background = "transparent"
    e.style.border = "solid 2px green"
    e.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].style = "display : visible"
    const title = e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML
    const desc = e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML
    const type = e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML
    const targetiD = e.getAttribute("name")
    let Ftarget = globaltaskdata.filter((card)=>{
            if(card.id == targetiD){
               card.title = title
               card.description = desc
               card.type = type 
            }
            return card
    })
    console.log(Ftarget)
    globaltaskdata = Ftarget
    saveToLocalStorage()
}
