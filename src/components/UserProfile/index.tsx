import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import * as yup from 'yup';

import styles from './UserProfile.module.scss';

import { Button } from 'features/Button';
import { Subtitle } from 'features/Subtitle';
import { dateMask, maskReg } from 'helpers';
import { useAppSelector } from 'hooks/useAppSelector';
import { actions } from 'redux/actions/users';
import { UserType } from 'redux/types';
import { Nullable, ReturnComponentType } from 'types';

const minLength = 2;

// type FormInputs = {
//   name: string;
//   isArchive: boolean;
//   role: string;
//   phone: string;
//   birthday: string;
// };

const schema = yup
  .object({
    name: yup.string().min(minLength, 'Слишком короткое имя').required(),
    phone: yup.string().required(),
    birthday: yup.string().required(),
    role: yup.string().required(),
    isArchive: yup.boolean().required(),
  })
  .required();

export const UserProfile = (): ReturnComponentType => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePrevPageButtonClick = (): Nullable<void> => {
    navigate('/');
  };
  const user = useAppSelector<UserType>(
    state => state.users.find(({ id }) => id === Number(userId)) as UserType,
  );

  const [editMode, setEditMode] = useState(false);

  const onSetEditMode = (): Nullable<void> => {
    setEditMode(!editMode);
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UserType>({
    shouldUseNativeValidation: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('id', user.id);
    setValue('name', user.name);
    setValue('isArchive', user.isArchive);
    setValue('role', user.role);
    setValue('phone', user.phone);
    setValue('birthday', user.birthday);
  }, []);

  const onSubmit = (data: UserType): Nullable<void> => {
    setEditMode(!editMode);
    dispatch(actions.updateUser(data));
    console.log(JSON.stringify(data));
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile_header}>
        <Subtitle value={`Профиль пользователя ${user.name}`} />
        <Button type="button" onClick={onSetEditMode}>
          {!editMode ? 'Редактировать' : 'Отменить изменения'}
        </Button>
        <Button onClick={handlePrevPageButtonClick} type="button">
          Вернуться на главную
        </Button>
      </div>
      <form className={styles.profile_main} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className={styles.profile_label}>
          ФИО
          <input
            {...register('name')}
            disabled={!editMode}
            defaultValue={user.name}
            className={styles.profile_input}
          />
          <p className={styles.error}>{errors.name?.message}</p>
        </label>
        <label htmlFor="isArchive" className={styles.profile_label}>
          В архиве
          <input
            {...register('isArchive')}
            disabled={!editMode}
            className={styles.profile_input}
            type="checkbox"
            defaultChecked={user.isArchive}
          />
          <p className={styles.error}>{errors.isArchive?.message}</p>
        </label>
        <label htmlFor="role" className={styles.profile_label}>
          Должность
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange } }) => (
              <select
                defaultValue={user.role}
                onChange={onChange}
                className={styles.profile_input}
                disabled={!editMode}
              >
                <option value="driver">Водитель</option>
                <option value="waiter">Официант</option>
                <option value="cook">Повар</option>
              </select>
            )}
          />
          <p className={styles.error}>{errors.role?.message}</p>
        </label>
        <label htmlFor="phone" className={styles.profile_label}>
          Телефон
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value, name } }) => (
              <MaskedInput
                className={styles.profile_input}
                mask={maskReg}
                id="phone"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                defaultValue={user.phone}
                name={name}
                placeholder="+7 (555) 123-456"
                disabled={!editMode}
              />
            )}
          />
          <p className={styles.error}>{errors.phone?.message}</p>
        </label>
        <label htmlFor="zipcode" className={styles.profile_label}>
          День рождения
          <Controller
            control={control}
            name="birthday"
            render={({ field: { onChange, onBlur, name } }) => (
              <MaskedInput
                className={styles.profile_input}
                mask={dateMask}
                id="phone"
                onChange={onChange}
                onBlur={onBlur}
                defaultValue={user.birthday}
                name={name}
                disabled={!editMode}
              />
            )}
          />
          <p className={styles.error}>{errors.birthday?.message}</p>
        </label>

        <input
          disabled={!editMode}
          type="submit"
          className={styles.profile_input_submit}
        />
      </form>
    </div>
  );
};
