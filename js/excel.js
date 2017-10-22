$(function () {
            $("#input").on("change", function () {
                var excelFile,
                    fileReader = new FileReader();

                $("#result").hide();

                fileReader.onload = function (e) {
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
                            gridColumns.push({ headerText: "nombre", key: "nombre" });
                            column = worksheet.rows(0).getCellText(0);
                            gridColumns.push({ headerText: "sexo", key: "sexo" });
                            column = worksheet.rows(0).getCellText(0);
                            gridColumns.push({ headerText: "fecha", key: "fecha" });
                            column = worksheet.rows(0).getCellText(0);
                            gridColumns.push({ headerText: "zona", key: "zona" });
                            column = worksheet.rows(0).getCellText(0);
                            gridColumns.push({ headerText: "idzona", key: "idzona" });
                            column = worksheet.rows(0).getCellText(0);
                            gridColumns.push({ headerText: "barrio", key: "barrio" });
                            column = worksheet.rows(0).getCellText(0);
                            gridColumns.push({ headerText: "idbarrio", key: "idbarrio" });

                        // We start iterating from 1, because we already read the first row to build the gridColumns array above
                        // We use each cell value and add it to json array, which will be used as dataSource for the grid
                        for (i = 0, worksheetRowsCount = worksheet.rows().count() ; i < worksheetRowsCount; i++) {
                            newRow = {};
                            row = worksheet.rows(i);

                            for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                                cellValue = row.getCellText(columnIndex);
                                newRow[gridColumns[columnIndex].key] = cellValue;
                            }
                            //insertarmos las personas
                            insertarPersona(newRow.nombre,
                                            calcularEdad(newRow.fecha),
                                            calcularSexo(newRow.sexo),
                                            newRow.idbarrio);
                            //insertarmos las personas
                            insertarZona(newRow.idzona,newRow.zona);
                            //insertarmos las personas
                            insertarBarrio(newRow.idbarrio,newRow.idzona,newRow.barrio);
                        
                        }

                    }, function (error) {
                        $("#result").text("El archivo tiene mas de una hoja o esta dañado");
                        $("#result").show(1000);
                    });
                }

                if (this.files.length > 0) {
                    excelFile = this.files[0];
                    if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
                        fileReader.readAsArrayBuffer(excelFile);
                    } else {
                        $("#result").text("El formaro del archivo no es valido ('.xls, *.xlsx').");
                        $("#result").show(1000);
                    }
                }

            })
        });
function calcularSexo(sexo){
    if(sexo.toUpperCase().indexOf("M") !== -1){
        return "F"
    }else{
    return "M"
}
}
function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}
    /*
        function createGrid(data, gridColumns) {
            if ($("#grid1").data("igGrid") !== undefined) {
                $("#grid1").igGrid("destroy");
            }

            $("#grid1").igGrid({
                columns: gridColumns,
                autoGenerateColumns: true,
                dataSource: data,
                width: "100%"
            });
        }

        */