import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import PrimaryButton from './ui/PrimaryButton';

const Container = styled.form`
  color: ${(props) => props.theme.colors.contentText};
  padding-inline: calc((100% - 450px) / 2);
  padding-block: calc((100% - 1000px) / 2);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  color: ${(props) => props.theme.colors.titleText};
  border-bottom: 1px solid #A79FFF;
  padding-bottom: .5em;
`;

const Element = styled.div`
  padding: 1em;
  strong {
    font-weight: bold;
  }
`;

const Label = styled.label`
  display: block;
  font-size: .9em;
  color: #a0a0a0;
  font-weight: bold;
  margin-bottom: .5em;
`;

const Field = styled.input`
  padding-block: .8em;
  padding-inline: .5em;
  color: #A0A0A0;
  border: 1px solid #d2d2d2;
  width: 100%;
`;

const DefaultMessage = styled.p`
  font-size: .9em;
  color: #A0A0A0;
  margin-top: .5em;
  margin-bottom: .5em;
`;

const Error = styled.p`
  font-size: .9em;
  color: #ff0000;
  margin-top: .5em;
  margin-bottom: .5em;
`;

export default function SignUpForm() {
  const bankStore = useBankStore();

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [accountNumberErrorMessage, setAccountNumberErrorMessage] = useState('로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)');

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const {
      name, accountNumber, password, checkPassword,
    } = data;

    const result = await bankStore.requestSignUp({
      name, accountNumber, password, checkPassword,
    });

    if (result.startsWith('비')) {
      setPasswordErrorMessage(result);
      setTimeout(() => setPasswordErrorMessage(''), 2000);
      return;
    }

    if (result.startsWith('이')) {
      setAccountNumberErrorMessage(result);
      setTimeout(() => setAccountNumberErrorMessage('로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)'), 2000);
      return;
    }

    navigate('/welcome');
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>SIGN UP</Title>
      <Element>
        <Label htmlFor="input-name">이름 &#58;</Label>
        <Field
          id="input-name"
          // {...register('name', { required: true, pattern: /^[ㄱ-ㅎ|가-힣]{3,7}$/})}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(
            'name',
            {
              required: { value: true, message: '이름을 입력해주세요' },
              pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '3~7자까지 한글만 사용 가능' },
            },
          )}
        />
        {errors.name ? (
          <Error>{errors.name.message}</Error>
        ) : (
          <DefaultMessage>3~7자까지 한글만 사용 가능</DefaultMessage>
        )}
      </Element>
      <Element>
        <Label htmlFor="input-account-number">계좌번호 입력 &#58;</Label>
        <Field
          id="input-account-number"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(
            'accountNumber',
            {
              required: { value: true, message: '계좌번호로 사용될 숫자를 입력해주세요(8글자)' },
              pattern: { value: /^[0-9]{8}$/, message: '로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)' },
            },
          )}
        />
        {errors.accountNumber ? (
          <Error>{errors.accountNumber.message}</Error>
        ) : (
          <DefaultMessage>{accountNumberErrorMessage}</DefaultMessage>
        )}
      </Element>
      <Element>
        <Label htmlFor="input-password">비밀번호 &#58;</Label>
        <Field
          id="input-password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(
            'password',
            {
              required: { value: true, message: '비밀번호를 입력해주세요' },
              pattern: {
                value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                message: '8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함',
              },
            },
          )}
        />
        {errors.password ? (
          <Error>{errors.password.message}</Error>
        ) : (
          <DefaultMessage>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</DefaultMessage>
        )}
      </Element>
      <Element>
        <Label htmlFor="input-check-password">비밀번호 확인 &#58;</Label>
        <Field
          id="input-check-password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('checkPassword', {
            required: {
              value: true,
              message: '비밀번호를 입력해주세요',
            },
          })}
        />
        {errors.checkPassword ? (
          <Error>{errors.checkPassword.message}</Error>
        ) : (
          <DefaultMessage>{passwordErrorMessage}</DefaultMessage>
        )}
      </Element>
      <PrimaryButton type="submit" style={{ padding: '1.2em' }}>회원가입</PrimaryButton>
    </Container>
  );
}
