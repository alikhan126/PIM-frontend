import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
// import * as logoFile from './carlogo.js';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})


export class ExcelService {

 dataStartingIndex:number = 13;


  constructor(private datePipe: DatePipe) {

  }

  generateExcel(exportExcel:boolean,header:any,data:any,) {
    //Excel Title, Header, Data

    header=Object.values(header)
    // data=data.map(dataObj => Object.values(dataObj)  )
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Export');


    
    

    // //Add Image

    // worksheet.autoFilter = {
    //   from: {
    //     row: 5,
    //     column: 4
    //   },
    //   to: {
    //     row: 9,
    //     column: 9
    //   }
    // }   
    //Blank Row 




    //Add Header Row
    let headerRow = worksheet.addRow(header);
    
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    // worksheet.addRows(data);



   
    // Add Data and Conditional Formatting
    data.forEach( (d, index) => {
      let dataRow=[];  
      header.map(h=>{
          dataRow.push(d[h])
         })
      let row = worksheet.addRow(dataRow);

    });
    // return true;


    // worksheet.mergeCells('A6','A9')
    // return true;
    // worksheet.  alignment = { wrapText: true }
    for( let i=1;i<=worksheet.actualColumnCount; i++){
      worksheet.getColumn(i).width = 30;
    }


    //Footer Row

    

    if(exportExcel){
      workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Export_'+this.datePipe.transform(new Date(), 'medium') +'.xlsx');
      // fs.saveAs(blob, 'Export_' +'.xlsx');

    })
    }

    else {
      workbook.csv.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'Export_' +"_"+this.datePipe.transform(new Date(), 'medium') +'.xlsx');
        // fs.saveAs(blob, '_'+ titleInput +'.csv');
  
      })
    }
    

  }
}
