import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import useLogin from "./hooks/useLogin"
import { SubmitHandler } from 'react-hook-form'
import { LoginType } from "./hooks/type"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

const Login = () => {

  const {
    register,
    handleSubmit,
    errors,
    mutate,
    isPending,
    navigate,
    t
  } = useLogin()

  // if(localStorage.getItem('token')){
  //   navigate('/')
  // }

  const submitHandler: SubmitHandler<LoginType> = (data) => {
    mutate(data, {
      onError: () => console.log('error'),
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.userId);
        navigate('/')
      }
    })
  }


  return (
    <>
      <Grid sx={{ width: '100vw', height: '100vh' }}>
        <Grid container flexDirection={'column'} justifyContent={'center'} alignContent={'space-between'} sx={{ background: '#dde5f4', width: '100%', height: '100%' }}>


          <Grid container justifyContent={'center'} alignContent={'center'}>
            <Typography variant="h1">
              Salon
            </Typography>
          </Grid>

          <Grid container alignContent={'center'} justifyContent={'center'}>
            <Typography sx={{ mb: '20px', mt: '40px' }} variant="h5"  >
              {t('form.login')}
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit(submitHandler)}>

            <Grid container flexDirection={'column'} justifyContent={'space-around'} alignContent={'center'}>

              <TextField
                prefix="dsa"
                label={t('form.userName')}
                placeholder={t('form.userName')}
                variant="outlined"
                sx={{ mt: '10px' }}
                {...register('username', {
                  required: t('form.required'),
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  startAdornment: <AccountCircleIcon sx={{ mx: '10px' }} />
                }}
              />

              <TextField
                label={t('form.password')}
                placeholder={t('form.password')}
                variant="outlined"
                sx={{ mt: '10px' }}
                type="password"
                {...register('password', {
                  required: t('form.required')
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: <KeyIcon sx={{ mx: '10px' }} />
                }}
              />
              <Button disabled={isPending} sx={{ mt: '10px' }} variant="outlined" type="submit">
                {t('form.submit')}
              </Button>
            </Grid>

          </form>


        </Grid>
      </Grid >
    </>
  )
}

export default Login
