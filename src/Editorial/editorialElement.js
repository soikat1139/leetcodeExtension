
class EditorialElement{

    constructor(){
        this.elementArray=[]

        this.checkCount=0
    }

    injectEditorialButton(){

        

        let button=document.createElement("div")

        button.classList.add("highLight")
        button.innerText="Editorial"
        console.log(button)

        document.body.appendChild(button)

        
    }

    getEditorialButton(){

        const editBtn1=document.getElementsByClassName("highLight")
        const editBtn=[...editBtn1]
        if(editBtn.length==0){
            window.setTimeout(()=>{
            this.getEditorialButton()
            },150)
       
        }
        else{
        
            console.log(editBtn[0])
            editBtn[0].addEventListener('click',(e)=>{
                console.log("Button Clicked")

            })
           
        }
    }



    getproblemId(){
        const textElement1=document.getElementsByClassName("text-title-large")
        const textElement=[...textElement1]
        if(textElement.length==0){
            window.setTimeout(()=>{
            this.getproblemId()
            },150)
       
        }
        else{
        
            console.log(textElement[0].firstChild.textContent.split(".")[0])
           
        }
    }
}



const editElement=new EditorialElement()

editElement.getproblemId()
editElement.getEditorialButton()
editElement.injectEditorialButton()

