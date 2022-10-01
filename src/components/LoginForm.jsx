/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useBankStore from '../hooks/useBankStore';
import PrimaryButton from './ui/PrimaryButton';

const Container = styled.div`
  color: ${(props) => props.theme.colors.contentText};
  padding-inline: calc((100% - 300px) / 2);
  padding-block: calc((100% - 1000px) / 2);
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  margin-top: 3em;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  color: ${(props) => props.theme.colors.titleText};
  border-bottom: 1px solid #A79FFF;
  padding-bottom: .5em;
`;

const Field = styled.input`
  padding-block: 1em;
  padding-inline: .7em;
  margin: .5em 0;
  border: 1px solid #d2d2d2;
  width: 100%;
`;

const Error = styled.p`
  font-size: .9em;
  color: #ff0000;
  margin: 1em 0;
  height: 1em;
`;

const GoSignUpButton = styled.button`
  font-size: 1em;
  color: ${(props) => props.theme.colors.contentText};
  margin-top: 3em;
  align-self: center;
  border: none;
  background: none;
  cursor: pointer;
`;

export default function LoginForm() {
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const [errorMessage, setErrorMessage] = useState('');

  const bankStore = useBankStore();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const { accountNumber, password } = data;
    const result = await bankStore.login({ accountNumber, password });

    if (result.indexOf('.') !== -1) {
      setAccessToken(result);
      setErrorMessage('');
      navigate('/');
    }

    if (result.indexOf('.') === -1) {
      setErrorMessage(result);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleGoingSignUpPage = () => {
    setErrorMessage('');
    navigate('/signup');
  };

  return (
    <Container>
      <Title>USER LOGIN</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            id="input-account-number"
            name="account"
            placeholder="아이디(계좌번호)"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('accountNumber', {
              required: {
                value: true,
                message: '아이디를 입력해주세요',
              },
            })}
          />
        </div>
        <div>
          <Field
            id="input-password"
            placeholder="비밀번호"
            type="password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password', {
              required: {
                value: true,
                message: '비밀번호를 입력해주세요',
              },
            })}
          />
          {errors.accountNumber && errors.password ? (
            <Error>아이디와 비밀번호를 입력해주세요</Error>
          ) : errors.accountNumber ? (
            <Error>{errors.accountNumber.message}</Error>
          ) : errors.password
            ? <Error>{errors.password.message}</Error>
            : (<Error>{errorMessage}</Error>)}
        </div>
        <PrimaryButton type="submit" onClick={() => {}}>
          로그인하기
        </PrimaryButton>
      </Form>
      <GoSignUpButton type="button" onClick={handleGoingSignUpPage}>
        회원가입
      </GoSignUpButton>
    </Container>
  );
}
