import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './DynamicForm.module.css';

const DynamicForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const jsonData = JSON.stringify(data, null, 2);  
        console.log(data); 
        alert('Welcome Back'); 
    };

    const firstFieldValue = watch('firstField', '');
    const passwordValue = watch('password', '');

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label>Name:</label>
                    <input
                        {...register('firstField', { required: true, minLength: 3 })}
                    />
                    {errors.firstField && <p className={styles.error}>This field is required and must be at least 3 characters long</p>}
                </div>

                {firstFieldValue.length >= 3 && (
                    <>
                        <div className={styles.inputGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Entered value does not match email format"
                                    }
                                })}
                            />
                            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Password:</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long"
                                    }
                                })}
                            />
                            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: "Please confirm your password",
                                    validate: value =>
                                        value === passwordValue || "The passwords do not match"
                                })}
                            />
                            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                        </div>
                    </>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default DynamicForm;
