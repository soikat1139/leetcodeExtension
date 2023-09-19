
//Storage Reference Not for actual Usage

const storage = chrome.storage.local;

const problemId="10"

storage.set({ [problemId]: "valueasdfasds" }).then(() => {
    console.log("Value is set");
  });
  
  storage.get([problemId]).then((result) => {
    console.log("Value currently is " + result[problemId]);
  }).catch((e)=>{
    console.log(e)

  })



  async function init(problemId){
    // const problemId=editElement.getproblemId()

    const test=new EditorialData()
    const showContent=new EditorialContent()

    
    const data=await test.getEditorial(problemId)
    await showContent.buildProblemContent(data)

 }






  class localStorage{
    constructor(){
        this.editorialData=new EditorialData()

        this.storage=chrome.storage.local

    }

    async saveEditorial(problemId){
        try{
            const data=await this.editorialData.getEditorial(problemId)

            const solution=data['values'][0][11]
    
            await this.storage.set({ [problemId]: solution })

        }
        catch(e){
            
            return "Error"

        }

    }

    async retriveEditorial(problemId){

        try{

        }
        catch(e){
            return "SomeThing is Wrong"
        }

    }





  }










class EditorialElement{

    constructor(){
        this.elementArray=[]

        this.checkCount=0

        this.problemId=2
    }

    injectEditorialButton(){

        

        let button=document.createElement("div")

        button.classList.add("highLight")
        button.innerText="Editorial"
      

        document.body.appendChild(button)

        
    }

    getEditorialButton(){

        const editBtn1=document.getElementsByClassName("highLight")
        const editBtn=[...editBtn1]
        if(editBtn.length==0 && this.checkCount<5 ){
            window.setTimeout(()=>{
            this.getEditorialButton()
            this.checkCount+=1
            },150)
       
        }
        else{
        
            // console.log(editBtn[0])
            editBtn[0].addEventListener('click',(e)=>{

                const element=document.getElementsByClassName("probCnt")

                if([...element].length>0){
                    console.log("Found The Element")
                    if([...element][0].classList.contains("hide")){
                        [...element][0].classList.remove("hide")

                    }
                    else{
                        [...element][0].classList.add("hide")

                    }


                }
                else{
                    console.log("Did not find the elmement")
                    this.getproblemId()
                }



             
                
               

            })
           
        }
    }

   async getproblemId(){
        const textElement1=document.getElementsByClassName("text-title-large")
        // const textElement1=document.getElementsByClassName("text-lg")
        console.log(textElement1)
        const textElement=[...textElement1]
        if(textElement.length==0){
            
            window.setTimeout(()=>{
            this.getproblemId()
            },150)
       
        }
        else{
        
            // console.log(textElement[0].firstChild.textContent.split(".")[0])

            await init(textElement[0].firstChild.textContent.split(".")[0])

            // this.problemId=textElement[0].firstChild.textContent.split(".")[0]

            return textElement[0].firstChild.textContent.split(".")[0]
           
        }
    }
}










class GoogleSheetAPIHandler{
    constructor(){


    }
    static API_KEY =  "AIzaSyA0y-pcsUGMqoHP49hznVSnDQ2K77JqcoM"
    static SHEETS_ID =  "1v0ofcKPVSvjs50htyI59BLt1J9e1i8dPk8ULd492uiU"

    getUrl(range){
        return `https://sheets.googleapis.com/v4/spreadsheets/${GoogleSheetAPIHandler.SHEETS_ID}/values/${range}?key=${GoogleSheetAPIHandler.API_KEY}`
    }

}

class EditorialData{
    constructor(){
        this.problemMap={}
        this.googleSheetAPI=new GoogleSheetAPIHandler()
    }

   async mappingProblemID(){

    const data=await this.getProblemIds()

    for (let i = 1; i < data.length; i++) {
      const id =data[i]
      this.problemMap[id] = i+1;
    }
    }

    async getProblemIds(){


        const url=this.googleSheetAPI.getUrl("A:A")
        console.log(url)
        let response = await fetch(url)
        const data=await response.json()
        // console.log(data["values"][1][11]);
        // console.log( data)

    
         return data["values"]
    
    }

    async getEditorial(problemId){
        await this.mappingProblemID()
        const problemIds=problemId in this.problemMap ? this.problemMap[problemId]:2;

        const range=`A${problemIds}:L${problemIds}`
      
        const url=this.googleSheetAPI.getUrl(range)
        let response = await fetch(url)
        const data=await response.json()
      
        console.log(data)
        return data
      
      
      }



}










class EditorialContent{
    constructor(){
        this.parent=document.body

    }

   async buildProblemContent(data){
        // console.log("HellofromConttent Builder")
        // const data=await getDataFunc()
        
        const problem=data['values'][0][11]
        

        const problemContent=document.createElement("div")

        // problemContent.innerHTML=problem

        problemContent.innerHTML=problem

        problemContent.classList.add("probCnt")

        document.body.appendChild(problemContent)

        console.log(problemContent)

    }
    buildSolutionContent(){


    }
    

}









// const editElement=new EditorialElement()

// editElement.getproblemId()
// const showContent=new EditorialContent()
// editElement.injectEditorialButton()

// editElement.getEditorialButton()

// const test=new EditorialData()


// test.getEditorial("2527")




//  await showContent.buildProblemContent()



 

 function main(){
    // console.log(window.location.href)
    // console.log(window.location.href.includes("https://leetcode.com/problems"))
    // console.log(window.location.href==="https://leetcode.com/problemset/all/")
    // console.log(window.location.href.includes("https://leetcode.com/problemset/all/"))
    // console.log(window.location.href.includes("https://leetcode.com/problems") && window.location.href!="https://leetcode.com/problemset/all/")




    const editElement=new EditorialElement()

    if(window.location.href.includes("https://leetcode.com/problems") && !window.location.href.includes("https://leetcode.com/problemset/all/")){

    window.setTimeout(()=>{
        editElement.injectEditorialButton()

        editElement.getEditorialButton()

    },800)


        

    }






 }

 main()



