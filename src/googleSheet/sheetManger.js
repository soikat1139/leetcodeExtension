///Introduction To the Google Sheet :
        //If the range is like A1:B2 
             //Google sheet is like you know  matrixx
             //  A B C D E
             //1 # # # # #
             //2 # # # # #
             //3 # # # # #
              //so the one will be called  A1 B1 C1 D1 E1
              //The others will be called  A2 B2 C2 D2 E2
              //There goes the third row   A2 B3 C3 D3 E3 

              //If I say range A1:E1 that simply means I am referring to A1->B1->C1->D1->E1

              //If I say range is A1:C1 That simply means  I am referring to A1->B1

              //The comes If I say A1:B2 That means A1 B1 A2 B2 
            //   ['New Value 1', 'New Value 2'], //For updating the value like this
            // ['Another New Value 1', 'Another New Value 2'],







            class GoogleSheetManager{
                constructor(sheetId='1lPK3HlKE-4AFkfSd3pm9_DTLmOZQ6Nly_Z-ew5t_dtk'){
              
                  this.authenticator=new GoogleAuthentication()
              
                  this.authKey=null
              
                  this.sheetId=sheetId
              
                }
              
              
                async authenticate(){
                  this.authKey=await this.authenticator.authorize()
                  return this.authKey
                }
              
              
              
                async  getRow(range='A3:B3') {
                  const auth=await this.authenticate()
                  const sheets = google.sheets({version: 'v4', auth});
                  const res = await sheets.spreadsheets.values.get({
                    spreadsheetId:`${this.sheetId}` ,
                    range: `${range}`,
                  });
                  const rows = res.data.values;
                  if (!rows || rows.length === 0) {
                    console.log('No data found.');
                    return;
                  }
                  console.log(rows)
                  return rows
                
                }
              
                //Updating rows 
              
                async  updateRow(range='Sheet1!A3:B3',valueArr=["exValue1","exValue2"]) {
                  const auth=await this.authenticate()
                  const sheets = google.sheets({ version: 'v4', auth });
                
                  try {
                    const updateRequest = {
                      spreadsheetId:`${this.sheetId}`,
                      range: `${range}`, // Modify the range as needed
                      valueInputOption: 'RAW',
                      resource: {
                        values: [
                          [...valueArr], // make an array of all the values and put it here
                        ],
                      },
                    };
                
                    const response = await sheets.spreadsheets.values.update(updateRequest);
                    console.log('Data updated successfully:', response.data);
                    return {
                      status:"SuccessFull",
                      response:response.data
                    }
                  } catch (err) {
                    console.error('Error updating data:', err);
                  }
                }
              
              
              //Creating cells
              
                async  createCells(range='Sheet1!A1:B1',arrValue) {
                  const auth=await this.authenticate()
                  const sheets = google.sheets({ version: 'v4', auth });
                
                  try {
                    const updateRequest = {
                      spreadsheetId: `${this.sheetId}`,
                      range: `${range}`, // Specify the range where you want to create cells
                      valueInputOption: 'RAW',
                      resource: {
                        values: [
              
              
                           //If the range is like A1:B2 
                           //Google sheet is like you know  matrixx
                           //  A B C D E
                           //1 # # # # #
                           //2 # # # # #
                           //3 # # # # #
                            //so the one will be called  A1 B1 C1 D1 E1
                            //The others will be called  A2 B2 C2 D2 E2
                            //There goes the third row   A2 B3 C3 D3 E3 
              
                            //If I say range A1:E1 that simply means I am referring to A1->B1->C1->D1->E1
              
                            //If I say range is A1:C1 That simply means  I am referring to A1->B1
              
                            //The comes If I say A1:B2 That means A1 B1 A2 B2 
                          //   ['New Value 1', 'New Value 2'], //For updating the value like this
                          // ['Another New Value 1', 'Another New Value 2'],
              
                          [...arrValue]
              
                        ],
                      },
                    };
                
                    const response = await sheets.spreadsheets.values.update(updateRequest);
                    console.log('Cells created successfully:', response.data);
                  } catch (err) {
                    console.error('Error creating cells:', err);
                  }
                }
              
              
                async  copyCells(sheetId,range='Sheet1!A1:B1',arrValue) {
                  const auth=await this.authenticate()
                  const sheets = google.sheets({ version: 'v4', auth });
                
                  try {
                    const updateRequest = {
                      spreadsheetId: sheetId,
                      range: range, // Specify the range where you want to create cells
                      valueInputOption: 'RAW',
                      resource: {
                        values: [
                      ...arrValue
                        ],
                      },
                    };
                
                    const response = await sheets.spreadsheets.values.update(updateRequest);
                    console.log('Cells created successfully:', response.data);
                  } catch (err) {
                    console.error('Error creating cells:', err);
                  }
                }
              
              
                async getPublicSheet(sourceSheetId,range="Sheet1"){
                  
              
                  const auth=await this.authenticate()
              
                  const sheets = google.sheets({ version: 'v4', auth });
                
                  try {
                    // Get the information about the source sheet
                    // const sourceSheet = await sheets.spreadsheets.get({
                    //   spreadsheetId: sourceSheetId,
                    // });
              
                    // console.log(sourceSheet)
                    const res = await sheets.spreadsheets.values.get({
                      spreadsheetId:sourceSheetId,
                      range: range,
                    });
                    const rows = res.data.values;
                    console.log(rows)
              
                    
                    
                    return rows
              
                  }
                  catch(e){
                    console.log(e)
              
                  }
                }
              
              
              
                async  createNewSheet(sheetName='newOne',sheetTitle="Sheet1") {
              
                  const auth=await this.authenticate()
                  const sheets = google.sheets('v4');
              
                  try {
                    // Initialize the Sheets API client
                    const sheetsAPI = await sheets.spreadsheets.create({
                      auth,
                      resource: {
                        properties: {
                          title: sheetName,
                        },
                        sheets: [
                          {
                            properties: {
                              title:sheetTitle
                            },
                          },
                        ],
                      },
                    });
                
                    const spreadsheetId = sheetsAPI.data.spreadsheetId;
                    const sheetId = sheetsAPI.data.sheets[0].properties.sheetId;
                   
                
                   
              
                    return spreadsheetId
              
                  } catch (err) {
                    console.error('Error creating a new document with sheet:', err);
                  }
                }
                async copyProblem(sourceSheetId,destSheetName,dstSheetTitle){
              
                  const destSourceId=this.createNewSheet(destSheetName,dstSheetTitle)
                  const sheet=await getPublicSheet(sourceSheetId,"Problem")
              
                  await this.copyCells(destSourceId,"Sheet1",sheet)
              
                }
              }
              
              // new GoogleSheetManager().getPublicSheet('1ilv8yYAIcggzTkehjuB_dsRI4LUxjkTPZz4hsBKJvwo')
              
              // new GoogleSheetManager().copyCells("Sheet1",[["gannna","Bajajajo"],["hurray","bajap","ganna"]])
              
              // new GoogleSheetManager().createNewSheet()
              new GoogleSheetManager('1e8JqDmSZfnYnPsrnnK4PhdLmjihjBN6FwPpOFmAZXWs').createCells("Sheet1",["Hablu","Programming"])
              