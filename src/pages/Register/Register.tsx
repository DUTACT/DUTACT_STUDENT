import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { register } from 'src/apis/auth'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { cn } from 'src/lib/tailwind/utils'
import { path } from 'src/routes/path'
import { RegisterBody } from 'src/types/account.type'
import { authenSchema, AuthenSchemaType } from 'src/utils/rules'

type FormData = Pick<AuthenSchemaType, 'username' | 'password' | 'confirm_password' | 'name'>
const registerSchema = authenSchema.pick(['username', 'password', 'confirm_password', 'name'])

export default function Register() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const { mutate, error, isPending } = register({
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error.message)
    }
  })

  const handleRegister = (data: RegisterBody) => {
    mutate(data)
  }

  const onSubmit = handleSubmit((data: FormData) => {
    handleRegister({
      fullName: data.name,
      email: data.username,
      password: data.password
    })
  })

  return (
    <div className='flex w-full min-w-[400px] flex-col'>
      <h1 className='text-4xl font-semibold uppercase tracking-wide text-primary'>Đăng ký</h1>
      <p className='mt-1 text-sm tracking-wide text-neutral-5'>để trở thành thành viên mới của cộng đồng chúng tôi</p>
      <div className='mt-4 min-h-[15px] text-sm font-semibold leading-[15px] text-semantic-cancelled'>
        {error?.message}
      </div>
      <form action='' className='mt-4' onSubmit={onSubmit}>
        <Input
          name='username'
          control={control}
          type='text'
          placeholder='Nhập email sinh viên'
          labelName='Email sinh viên'
        />
        <Input name='name' control={control} type='text' placeholder='Nhập tên sinh viên' labelName='Tên sinh viên' />
        <Input
          name='password'
          control={control}
          type='password'
          placeholder='Nhập mật khẩu'
          labelName='Mật khẩu của bạn'
        />
        <Input
          name='confirm_password'
          control={control}
          type='password'
          placeholder='Nhập lại mật khẩu'
          labelName='Nhập lại mật khẩu'
        />
        <Button
          title='Đăng ký'
          type='submit'
          classButton='bg-primary/90 hover:bg-primary mt-4'
          classTitle='uppercase font-semibold text-neutral-0 test-base tracking-wide'
          classWrapperLoading={cn('', {
            block: isPending
          })}
          disabled={isPending}
        />
        <div className='mt-4 flex w-full items-center justify-center gap-2'>
          <span className='text-sm font-medium text-neutral-6'>Bạn đã có tài khoản?</span>
          <Link to={path.login} className='text-sm font-medium text-primary/90 hover:text-primary/100'>
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  )
}
