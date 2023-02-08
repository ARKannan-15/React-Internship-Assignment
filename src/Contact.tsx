import {
    Box,
    TextField,
    Typography,
  } from '@mui/material';
  import { useForm, SubmitHandler } from 'react-hook-form';
  import { literal, object, string, TypeOf } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { useEffect, useState } from 'react';
  import { LoadingButton } from '@mui/lab';
  import Checkbox from '@mui/material/Checkbox';
  
  const registerSchema = object({
    name: string()
      .nonempty('Name is required')
      .max(32, 'Name must be less than 100 characters'),
    num: string()
        .nonempty('Phone number is requires')
        .length(10,'Not a valid mobile number'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    
    });
  
  type RegisterInput = TypeOf<typeof registerSchema>;
  
  const Contact = () => {
    const [loading, setLoading] = useState(false);
  
    const {
      register,
      formState: { errors, isSubmitSuccessful },
      reset,
      handleSubmit,
    } = useForm<RegisterInput>({
      resolver: zodResolver(registerSchema),
    });
  
    useEffect(() => {
      if (isSubmitSuccessful) {
        reset();
      }
      
    }, [isSubmitSuccessful]);
  
    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
      console.log(values);
    };
    console.log(errors);
  
    return (
      <Box sx={{ maxWidth: '30rem' }}>
        <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
          User details
        </Typography>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <TextField
            sx={{ mb: 2 }}
            label='Name'
            fullWidth
            required
            error={!!errors['name']}
            helperText={errors['name'] ? errors['name'].message : ''}
            {...register('name')}
          />
          <TextField
            sx={{ mb: 2 }}
            label='Phone-Number'
            fullWidth
            required
            type='text'
            error={!!errors['num']}
            helperText={errors['num'] ? errors['num'].message : ''}
            {...register('num')}
          />
          <TextField
            sx={{ mb: 2 }}
            label='Email'
            fullWidth
            required
            type='email'
            error={!!errors['email']}
            helperText={errors['email'] ? errors['email'].message : ''}
            {...register('email')}
          />
          
  
          
  
          <LoadingButton
            variant='contained'
            fullWidth
            type='submit'
            loading={loading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            Register
          </LoadingButton>
        </Box>
      </Box>
    );
  };
  
  export default Contact;
  
  