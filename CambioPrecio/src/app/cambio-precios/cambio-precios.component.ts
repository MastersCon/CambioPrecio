import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";

@Component({
  templateUrl: './cambio-precios.component.html',
  styleUrls: ['./cambio-precios.component.scss']
})
export class CambioPreciosComponent implements OnInit {


  ExcelData: any
  fileName = 'CambioPrecios.xlsx';
  redondeado: any

  constructor() {


  }

  ReadExcel(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])

    }
  }
  ngOnInit(): void {
  }

  exportexcel(): void {
    let element = document.getElementById('Calld');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);

  }
  actualizacion(){
    const element = document.getElementById('Calld');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const data = XLSX.utils.sheet_to_json(ws, {header:1});

    const newData = data.slice(1).map((row: any) => {
      const valor = row[1];
      let valorRedondeado = Math.ceil(valor/5)*5 - (valor % 5 === 1 ? 1 : 0);
      if (valor % 10 === 9) {
        valorRedondeado = valor;
      }
      return {
        Code: row[0],
        Precio: valor,
        NuevoPrecio: valorRedondeado
      }
    });

    this.ExcelData = newData;

    console.log(newData);
  }
  onButtonClick(event: MouseEvent) {
    (event.target as HTMLButtonElement).disabled = true;
  }
}

