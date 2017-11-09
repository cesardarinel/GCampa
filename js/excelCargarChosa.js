$(function () {
    $("#input").on("change", function () {
        var excelFile,
            fileReader = new FileReader();
        $("#result").hide();
        fileReader.onload = function (e) {
            document.getElementById("loader").style.display = "initial";
            var buffer = new Uint8Array(fileReader.result);
            $.ig.excel.Workbook.load(buffer, function (workbook) {
                var column, row, newRow, cellValue, columnIndex, i,
                    worksheet = workbook.worksheets(0),
                    columnsNumber = 0,
                    gridColumns = [],
                    data = [],
                    worksheetRowsCount;
                while (worksheet.rows(0).getCellValue(columnsNumber)) {
                    columnsNumber++;
                }
                    column = worksheet.rows(0).getCellText(0);
                    gridColumns.push({ headerText: "descripcion", key: "descripcion" });
                    column = worksheet.rows(0).getCellText(0);
                    gridColumns.push({ headerText: "cantidad", key: "cantidad" });
                    column = worksheet.rows(0).getCellText(0);
                    gridColumns.push({ headerText: "sexo", key: "sexo" });
                    
                for (i = 0, worksheetRowsCount = worksheet.rows().count() ; i < worksheetRowsCount; i++) {
                    newRow = {};
                    row = worksheet.rows(i);
                  
                    for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                        cellValue = row.getCellText(columnIndex);
                        newRow[gridColumns[columnIndex].key] = cellValue;
                    }
                    //insertarmos las personas
                    insertarChozas(newRow.sexo,newRow.descripcion,newRow.cantidad);
                }
                document.getElementById("loader").style.display = "none";
            }, function (error) {
                document.getElementById("loader").style.display = "none";
                $("#result").text("El archivo tiene mas de una hoja o esta dañado");
                $("#result").show(1000);
            });
        }
        if (this.files.length > 0) {
            excelFile = this.files[0];
            if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
                fileReader.readAsArrayBuffer(excelFile);
            } else {
                document.getElementById("loader").style.display = "none";
                $("#result").text("El formaro del archivo no es valido ('.xls, *.xlsx').");
                $("#result").show(1000);
            }
        }

    })
});

