const work = []
education = []

const WORK_KEY = "WORK",
    EDU_KEY = "EDUKATION";

const showForm = () => {
    document.querySelector(".formWrapper").classList.remove("none");
};

const handleClickOnTheBlur = (event) => {
    if (event.target.className === "formWrapper" || event.target.className === "cancel large") {
        document.querySelector(".formWrapper").classList.add("none");
    }
};

const handleSelectChanged = (event) => {
    const value = event.target.value;
    if (value === "work") {
        document.querySelector("#expDescriptione").classList.remove("none");
    } else if (value === "education") {
        document.querySelector("#expDescription").classList.add("none");
    } else {
        console.error("Unknown Exp Type");
    }
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
        title: event.target.title.value,
        Subtitle: event.target.Subtitle.value,
        expType: event.target.expType.value,
        expDescription: event.target.expDescription.value,
    };

    renderExpOnThePag(data);

    if (data.expType === "work") {
        work.push(data);
        saveToLocalStorage(WORK_KEY, work)
    } else if (data.expType === "education") {
        education.push(data);
        saveToLocalStorage(EDU_KEY, education)
    } else {
        console.error(".Unknown type");
    }

    event.target.title.value = ""
    event.target.Subtitle.value = ""
    event.target.expType.value = "work"
    event.target.expDescription.value = ""

    document.querySelector(".formWrapper").classList.add("none");
};

const saveToLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data))
}

const loadFromLocalStorage = () => {
    const workStr = window.localStorage.getItem(WORK_KEY);
    if(workStr){
        const workobj = JSON.parse(workStr)
        work.push(...workobj)
    }    

    const eduStr = window.localStorage.getItem(EDU_KEY);
    if(eduStr){
        const eduobj = JSON.parse(eduStr)
        education.push(...eduobj)
    }
    
    console.log(work)
    console.log(education)
}

const renderExpOnThePage = (data) => {
    if (data.expType === "work") {
        const parent = document.querySelector(".work_exp")
        const child = document.querySelector(".exp")
        const newChild = child.cloneNode(true)
        newChild.querySelector(".medium").textContent = data.title
        newChild.querySelector(".altText small").textContent = data.Subtitle
        newChild.querySelector(".x-small").textContent = data.expDescription

        parent.appendChild(newChild);
    } else if (data.expType === "education") {
        const parent = document.querySelector(".education")
        const child = document.querySelector(".edu")
        const newChild = child.cloneNode(true)
        newChild.querySelector(".medium").textContent = data.title
        newChild.querySelector(".altText small").textContent = data.Subtitle
        parent.appendChild(newChild);
    } else {
        console.error(".Unknown type");
    }
}

loadFromLocalStorage();

for(let job of work){
    renderExpOnThePage(job)
}

for(let edu of education){
    renderExpOnThePage(edu)
}