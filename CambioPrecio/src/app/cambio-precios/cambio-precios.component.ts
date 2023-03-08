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
      let valorRedondeado = valor;

      // Redondear cualquier número que termine en 6, 7 u 8 a 9
      if (valor % 10 >= 6 && valor % 10 <= 8) {
        valorRedondeado = Math.floor(valor/10)*10 + 9;
      }

      // Redondear cualquier número que termine en 1, 2, 3 o 4 a 5, pero solo si es mayor a 60
      else if (valor % 10 >= 1 && valor % 10 <= 4 && valor > 60) {
        valorRedondeado = Math.floor(valor/10)*10 + 5;
      }

      // No redondear números que terminen en 9, pero solo si es mayor a 60
      else if (valor % 10 === 9 && valor > 60) {
        valorRedondeado = valor;
      }

      // Redondear cualquier número menor a 60 que tenga un decimal hacia arriba
      else if (valor < 60 && valor % 1 !== 0) {
        valorRedondeado = Math.ceil(valor);
      }

      // Redondear cualquier número mayor a 60 que termine en 4 o 8 hacia arriba
      else if (valor > 60 && valor % 10 === 4 || valor % 10 === 8) {
        valorRedondeado = Math.ceil(valor);
      }

      // Redondear cualquier otro número según las condiciones previas
      else if (valor % 1 !== 0) {
        valorRedondeado = Math.floor(valor);
      } else if (valor > 60) {
        const ultimoDigito = valor % 10;
        let ajuste = 0;
        if (ultimoDigito === 6) {
          ajuste = -1;
        } else if (ultimoDigito >= 7) {
          ajuste = 5;
        }
        valorRedondeado = Math.ceil(valor/5)*5 - (valor % 5 === 1 ? 1 : 0) + ajuste;
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

