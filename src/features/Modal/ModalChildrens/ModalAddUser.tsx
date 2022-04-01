import { Dispatch, FC, SetStateAction } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import MaskedInput from 'react-text-mask';
import * as yup from 'yup';

import styles from './ModalAddUser.module.scss';

import { maskReg } from 'helpers';
import { UserDomainType } from 'redux/actions/users';
import { addUser } from 'redux/thunks/users';
import { Nullable } from 'types';

type ModalWithTwoInputs = {
  setModalActive: Dispatch<SetStateAction<boolean>>;
};

const minLength = 2;

const schema = yup
  .object({
    name: yup.string().min(minLength, 'Слишком короткое имя').required(),
    role: yup.string().required(),
    phone: yup.string().required(),
  })
  .required();

export const ModalAddUser: FC<ModalWithTwoInputs> = ({ setModalActive }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserDomainType>({
    shouldUseNativeValidation: true,
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data: UserDomainType): Nullable<void> => {
    setModalActive(false);
    dispatch(addUser(data));
    console.log(JSON.stringify(data));
  };

  return (
    <div className={styles.modal_authshape}>
      <form className={styles.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className={styles.modal_label}>
          Имя
          <input {...register('name')} className={styles.modal_input} />
          <p className={styles.error}>{errors.name?.message}</p>
        </label>
        <label htmlFor="role" className={styles.modal_label}>
          Должность
          <input {...register('role')} className={styles.modal_input} />
          <p className={styles.error}>{errors.role?.message}</p>
        </label>
        <label htmlFor="phone" className={styles.modal_label}>
          Телефон
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value, name } }) => (
              <MaskedInput
                className={styles.modal_input}
                mask={maskReg}
                id="phone"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                placeholder="+7 (555) 123-456"
              />
            )}
          />
          <p className={styles.error}>{errors.phone?.message}</p>
        </label>
        <div className={styles.modal_btn_wrap}>
          <button
            className={styles.modal_cancel}
            onClick={() => setModalActive(false)}
            type="button"
          >
            Cancel
          </button>
          <input className={styles.modal_submit} type="submit" />
        </div>
      </form>
    </div>
  );
};
