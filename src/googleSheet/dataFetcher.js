



class GoogleSheetAPIHandler{
    constructor(){


    }
    static API_KEY =  "AIzaSyA0y-pcsUGMqoHP49hznVSnDQ2K77JqcoM"
    static SHEETS_ID =  "1v0ofcKPVSvjs50htyI59BLt1J9e1i8dPk8ULd492uiU"

    static getUrl(range){
        return `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${range}?key=${API_KEY}`
    }

}



