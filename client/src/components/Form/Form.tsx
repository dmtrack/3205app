import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import styles from './Form.module.scss';
import { IUser } from '../../types/types';

interface IFormProps {
    onSubmit: (data: IUser) => void;
}

const Form = ({ onSubmit }: IFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>();

    const handleFormSubmit: SubmitHandler<IUser> = (data) => {
        onSubmit(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <input
                className={styles.input}
                {...register('email', {
                    required: 'Email is required',
                    validate: {
                        matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                v
                            ) || 'Email address must be a valid address',
                    },
                })}
            />
            {errors.email && errors.email.message && (
                <span className={styles.error}>{errors.email.message}</span>
            )}

            <InputMask
                className={styles.input}
                mask='99-99-99'
                maskChar=' '
                type='text'
                {...register('number')}
                placeholder='Number (e.g., 22-11-22)'
            />
            <button className={styles.btn} type='submit'>
                Submit
            </button>
        </form>
    );
};

export default Form;
