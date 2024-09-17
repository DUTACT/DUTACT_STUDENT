import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { path } from 'src/routes/path'
import { authenSchema, AuthenSchemaType } from 'src/utils/rules'

type FormData = Pick<AuthenSchemaType, 'email' | 'password' | 'confirm_password' | 'name'>
const registerSchema = authenSchema.pick(['email', 'password', 'confirm_password', 'name'])

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='flex w-full min-w-[400px] flex-col'>
      <h1 className='text-4xl font-semibold uppercase tracking-wide text-primary'>Đăng ký</h1>
      <p className='mt-1 text-sm tracking-wide text-neutral-5'>để trở thành thành viên mới của cộng đồng chúng tôi</p>
      <form action='' className='mt-4' onSubmit={onSubmit}>
        <Input
          name='name'
          register={register}
          type='text'
          placeholder='Nhập tên của bạn'
          labelName='Tên của bạn'
          errorMessage={errors.name?.message}
        />
        <Input
          name='email'
          register={register}
          type='text'
          placeholder='Nhập email của bạn'
          labelName='Email của bạn'
          errorMessage={errors.email?.message}
        />
        <Input
          name='password'
          register={register}
          type='password'
          placeholder='Nhập mật khẩu của bạn'
          labelName='Mật khẩu của bạn'
          errorMessage={errors.password?.message}
        />
        <Input
          name='confirm_password'
          register={register}
          type='password'
          placeholder='Nhập lại mật khẩu'
          labelName='Nhập lại mật khẩu'
          errorMessage={errors.confirm_password?.message}
        />
        <Button
          title='Đăng ký'
          type='button'
          classButton='bg-primary/90 hover:bg-primary mt-4'
          classTitle='uppercase font-semibold text-neutral-0 text-md tracking-wide'
          classLoadingIndicator='block'
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
