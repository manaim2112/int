declare namespace Jspreadsheet {
    type CellValue = string | number | boolean | null;
    
    interface Options {
      data: CellValue[][];
      columns?: ColumnOptions[];
      rows?: RowOptions[];
      minDimensions?: [number, number];
      allowInsertColumn?: boolean;
      allowInsertRow?: boolean;
      allowDeleteColumn?: boolean;
      allowDeleteRow?: boolean;
      [key: string]: any; // For extra options if necessary
    }
    
    interface ColumnOptions {
      type?: string;
      title?: string;
      width?: number;
      align?: 'left' | 'center' | 'right';
      readOnly?: boolean;
      wordWrap?: boolean;
      mask?: string;
      decimal?: string;
      render?: (cell: HTMLElement, value: CellValue) => void;
      [key: string]: any; // For extra column settings
    }
    
    interface RowOptions {
      height?: number;
      readOnly?: boolean;
      [key: string]: any; // For extra row settings
    }
  
    interface JspreadsheetInstance {
      el: HTMLElement;
      options: Options;
      data: CellValue[][];
      getCell: (x: number, y: number) => HTMLElement;
      getData: () => CellValue[][];
      setData: (data: CellValue[][]) => void;
      setValue: (cell: string, value: CellValue) => void;
      getValue: (cell: string) => CellValue;
      [key: string]: any; // For additional methods or properties
    }
  
    function create(element: HTMLElement, options: Options): JspreadsheetInstance;
  }
  
  declare var jspreadsheet: typeof Jspreadsheet.create;
  