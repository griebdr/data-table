export type EditableType = 'Text' | 'Number' | 'Date' | 'Object' | 'Table';

export type ColumnType = { name: string, type: EditableType, options?: TextOptions | ObjectOptions | TableOptions };
export type PropertyType = ColumnType;

export class TextOptions {
  options?: any[];
  map?: (value: any) => string;
  remap?: (originalValue: any, mappedValue: string) => any;
}

export class ObjectOptions {
  propertyTypes?: ColumnType[];
  map?: (value: any) => string;
}

export class TableOptions {
  columnTypes?: ColumnType[];
  editDisabled?: Array<string> | boolean;
  hiddenColumns?: Array<string>;
  filter?: boolean;
  select?: boolean;
  insert?: boolean;
  delete?: boolean;
  pagination?: boolean;
  save?: boolean;
  close?: boolean;

  constructor(options?: TableOptions) {
    Object.assign({}, this, options);
  }
}



