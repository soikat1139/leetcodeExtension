

let myInput=document.querySelector("input")




const storage = browser.storage.local;






myInput.addEventListener("change",(e)=>{
    
    setValue(e.target.value)
})


async function setValue(value){
    storage.set({ key: value }).then(() => {
        
      }).catch(error => {
        console.error("Error storing data: " + error);
      });

   
  
    
}

async function init(){
    const result=await storage.get("key")
    const value = result.key;

    if(!value){
        value=0

    }
    myInput.value=value


}

init().catch((e)=>{
    console.log(e)
})


