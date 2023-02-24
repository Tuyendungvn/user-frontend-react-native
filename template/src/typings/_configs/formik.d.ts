export interface IFormikHandleChange {
  (e: React.ChangeEvent<any>): void;
  <T = string | React.ChangeEvent<any>>(
    field: T
  ): T extends React.ChangeEvent<any>
    ? void
    : (e: string | React.ChangeEvent<any>) => void;
}

export type ISetFieldTouched = (
  field: string,
  isTouched?: boolean | undefined,
  shouldValidate?: boolean | undefined
) => void;


export type  ISetFieldValues =(field: string, value: any, shouldValidate?: boolean | undefined) => void