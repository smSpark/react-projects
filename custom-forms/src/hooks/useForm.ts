import { ChangeEvent, FormEvent, useState, useCallback } from 'react'

type IvalidatorFn = (s: string) => {}

export interface IField {
  value?: string
  type?: string
  label?: string
  error?: string
  isValid?: boolean
  required?: boolean
  touched?: boolean
  setState?: (e: ChangeEvent<HTMLInputElement>) => {}
  validators?: IvalidatorFn[]
}

export type ICustomField<T = {}> = IField & T

export type ICustomObject<T = {}> = {
  [key: string]: ICustomField & T
}

export type IValues = {
  [key: string]: string | number
}

export type IForm = {
  fileds: ICustomObject
  isValied: boolean
  handleSubmit: (onSubmit: Function) => (e: FormEvent) => void
}

type IOptions = {
  [key: string]: any
}

export const useForm = (initialFields: any = {}) => {
  const form = Object.entries(initialFields).reduce(
    (fields, [name, value]: any[]) => {
      const isString = typeof value === 'string'

      const field = {
        [name]: {
          type: 'text',
          value: (isString && value) || (!isString && value.value) || '',
          error: (!isString && value.error) || null,
          validators: (!isString && value.validators) || null,
          isValid: (!isString && value.isValid) || true,
          required: (!isString && value.required) || false,
          touched: false,
          setState: (value: ChangeEvent<HTMLInputElement>) =>
            handleInput(value, name),
          ...(!isString && value)
        }
      }

      return { ...fields, ...field }
    },
    {}
  )

  const [fields, setState] = useState<ICustomObject>(form)
  const [isValid, setFormValid] = useState<boolean>(true)

  const getFormValidationState = (fields: ICustomObject): boolean =>
    Object.entries(fields).reduce(
      (isValid: boolean, [_, value]: any) =>
        Boolean(Number(isValid) * Number(value.isValid)),
      true
    )

  const fieldValidation = (field: ICustomField, options: IOptions = {}) => {
    const { value, required, validators } = field

    let isValid = true,
      error

    if (required) {
      isValid = !!value
      error = isValid ? '' : 'Поле обязательно для заполнения'
    }

    if (validators && Array.isArray(validators)) {
      const results = validators
        .map((v) => {
          if (typeof v === 'string') return v

          const validationResult = v(value || '')

          return typeof validationResult === 'string' ? validationResult : ''
        })
        .filter((msg) => msg !== '')

      if (results.length) {
        isValid = false
        error = results[0]
      }
    }

    return { ...field, isValid, error, ...options }
  }

  const handleInput = (el: ChangeEvent<HTMLInputElement>, name: string) => {
    const input = fields[name]
    const value = el.target.value

    const field = { ...input, value, touched: true, isValid: true }

    const validatedField = fieldValidation(field)

    setState((prevState: ICustomObject) => {
      const items = { ...prevState, [name]: validatedField }

      setFormValid(getFormValidationState(items))
      return items
    })
  }

  const handleSubmit = (onSubmit: Function) => (e: FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    const fieldsArray = Object.entries(fields)
    const values = fieldsArray.reduce(
      (prev: ICustomObject, [name, { value }]: any) => ({
        ...prev,
        [name]: value
      }),
      {}
    )
    const validatedInputs = fieldsArray.reduce(
      (prev: ICustomObject, [name, value]: any) => ({
        ...prev,
        [name]: fieldValidation(value, { touched: true })
      }),
      {}
    )

    setFormValid(getFormValidationState(validatedInputs))
    setState(validatedInputs)

    onSubmit({ values })
  }

  return {
    fields,
    isValid,
    handleSubmit
  }
}
