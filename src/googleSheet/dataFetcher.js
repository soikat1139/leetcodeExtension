

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
      
        console.log(data['values'][0][10])
        return data
      
      
      }



}





const test=new EditorialData()

test.getEditorial("1337")