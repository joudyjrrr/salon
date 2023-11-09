import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import useLogin from "./hooks/useLogin"
import { SubmitHandler } from 'react-hook-form'
import { LoginType } from "./hooks/type"

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
        <Grid container justifyContent={'center'} alignContent={'center'} sx={{ background: 'linear-gradient(to right ,DarkSeaGreen 0 50%, #fff  50% 100%)', width: '100%', height: '100%' }}>
          <Paper sx={{ width: '80%', height: '80%', filter: 'blur(0px)' }}>

            <Grid container sx={{ width: '100%', height: '100%' }}>
              <Grid item xs={4} sx={{ height: '100%', background: '#fff ' }} />
              <Grid justifyContent={'center'} flexDirection={'column'} alignContent={'center'} item xs={8} container sx={{ height: '100%', background: 'DarkSeaGreen' }}>

                <Typography sx={{ mb: '20px' }} variant="h5" gutterBottom color={'white'}>
                  {t('form.login')}
                </Typography>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <Grid container  justifyContent={'center'} flexDirection={'column'} alignContent={'center'}>

                    <TextField
                      label={t('form.userName')}
                      placeholder={t('form.userName')}
                      variant="outlined"
                      sx={{ mt: '10px' }}
                      {...register('username', {
                        required: t('form.required'),
                      })}
                      error={!!errors.username}
                      helperText={errors.username?.message}
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
                    />
                    <Button disabled={isPending} sx={{ mt: '10px', backgroundColor: 'white' }} variant="contained" type="submit">
                      {t('form.submit')}
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
