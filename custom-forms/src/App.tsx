import './App.css'

import { useForm, IValues } from './hooks/useForm'

const formInputs = {
  firstName: {
    required: true,
    validators: [
      (s: string) => !s.length && 'Поле обязательно для заполнения',
      (s: string) => s.length < 2 && 'Минимальная длина строки 2',
      (s: string) => s.length <= 2 && 'А теперь 3',
      (s: string) => parseInt(s) < 2 && 'Должна быть цифра больше 1'
    ],
    label: 'Имя'
  },
  datetime: {
    type: 'date',
    label: 'Дата рождения',
    validators: [
      (s: string) =>
        new Date(s).getUTCFullYear() > new Date().getUTCFullYear() &&
        'Год рождения не может быть больше текущего'
    ]
  },
  lastName: {
    label: 'Фамилия'
  }
}

function App() {
  const { fields, isValid, handleSubmit } = useForm(formInputs)

  const { firstName, datetime, lastName } = fields

  const onSubmit = ({ values }: { values: IValues }) => {
    console.log(values, 'submit')
  }

  const formFields = [firstName, lastName, datetime]

  return (
    <div className='App'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((f, i) => (
          <div key={i}>
            <input
              type={f.type}
              placeholder={f.label}
              value={f.value}
              onChange={f.setState}
            />
            <span>{f.touched && f.error}</span>
          </div>
        ))}
        <div>
          <button disabled={!isValid}>Отправить форму</button>
        </div>
      </form>
    </div>
  )
}

export default App
