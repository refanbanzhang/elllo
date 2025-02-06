interface FormRule {
  required?: boolean
  message?: string
  validator?: (value: any) => boolean | Promise<boolean>
  trigger?: "blur" | "change"
}

export interface FormItemRule {
  [key: string]: FormRule[]
}

export interface FormInstance {
  validate: () => Promise<boolean>
  resetFields: () => void
  clearValidate: () => void
}

export interface FormItemInstance {
  validate: () => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
}