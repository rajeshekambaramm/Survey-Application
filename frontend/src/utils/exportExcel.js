import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportResponsesToExcel(
    responses,
    surveyTitle = "Survey"
) {

    if (!responses || responses.length === 0) {
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
        responses
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Responses"
    );

    const excelBuffer = XLSX.write(
        workbook,
        {
            bookType: "xlsx",
            type: "array"
        }
    );

    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        }
    );

    saveAs(
        file,
        `${surveyTitle}_Responses.xlsx`
    );
}