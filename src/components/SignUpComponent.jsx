import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function SignupComponent() {
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        // Добавьте здесь вызов вашего сервиса для регистрации
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Enter your name</label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <input type="text" {...field} />}
                />
                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email">Enter your email</label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <input type="email" {...field} />}
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Enter your password</label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <input type="password" {...field} />}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
                <label htmlFor="confirmPassword">Enter your confirm password</label>
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => <input type="password" {...field} />}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit">Signup</button>
        </form>
    );
}

export default SignupComponent;
