import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import numberFormat from '../utils/numberFormat';
import PrimaryButton from './ui/PrimaryButton';

const Container = styled.div`
  color: ${(props) => props.theme.colors.contentText};
  padding-inline: calc((100% - 300px) / 2);
  padding-block: calc((100% - 1000px) / 2);
 
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  color: ${(props) => props.theme.colors.titleText};
  margin-bottom: 1em;
  padding-bottom: .5em;
  border-bottom: 1px solid #A79FFF;
`;

const Element = styled.div`
  margin: 1.8em 0;
`;

const Label = styled.label`
  display: block;
  font-size: .9em;
  font-weight: bold;
  margin-bottom: .5em;
`;

const Field = styled.input`
  padding-block: .8em;
  padding-inline: .5em;
  border: 1px solid #d2d2d2;
  width: 100%;
`;

const DefaultMeesage = styled.p`
  font-size: .9em;
  margin-top: .5em;
`;

const Error = styled.div`
  font-size: .9em;
  color: #F00;
  margin-top: .5em;
`;

export default function TransferForm() {
  const bankStore = useBankStore();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const { accountNumber, amount, name } = data;

    await bankStore.requestTransfer({ to: accountNumber, amount, name });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>송금</Title>
        <Element>
          <Label htmlFor="input-account">받는 분 계좌번호 &#58;</Label>
          <Field
            id="input-account"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'accountNumber',
              {
                required:
            { value: true, message: '계좌번호를 입력해주세요' },
              },
            )}
          />
          {errors.accountNumber ? (
            <Error>{errors.accountNumber.message}</Error>
          )
            : (
              <DefaultMeesage>하이픈(-) 제외 숫자 8글자를 입력하세요</DefaultMeesage>
            )}
          {bankStore.isTransferFail && `${bankStore.errorCode}`.startsWith(1) ? (
            <Error>
              <p>{bankStore.errorMessage}</p>
            </Error>
          ) : (null)}
        </Element>
        <Element>
          <Label htmlFor="input-amount">보낼금액&#40;원&#41; &#58;</Label>
          <Field
            id="input-amount"
            type="number"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('amount', {
              required:
            { value: true, message: '금액을 입력해주세요' },
            })}
          />
          {errors.amount ? (
            <Error>{errors.amount.message}</Error>
          ) : (
            <DefaultMeesage>
              내 계좌 잔액:
              {' '}
              {numberFormat(bankStore.amount)}
              원
            </DefaultMeesage>
          )}
          {bankStore.isTransferFail && `${bankStore.errorCode}`.startsWith(2) ? (
            <Error>
              <p>{bankStore.errorMessage}</p>
            </Error>
          ) : (null)}
        </Element>
        <Element>
          <Label htmlFor="input-name">받는 분 통장 표시 &#58;</Label>
          <Field
            id="input-name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('name', {
              required:
            { value: true, message: '입금 받는 분의 통장에 표시될 이름을 입력하세요' },
            })}
          />
          {errors.name ? (
            <Error>{errors.name.message}</Error>
          ) : <DefaultMeesage>입금 받는 분의 통장에 표시될 이름을 입력하세요</DefaultMeesage>}
          <PrimaryButton type="submit" disabled={bankStore.isTransferProcessing}>보내기</PrimaryButton>
          {bankStore.isTransferProcessing ? (
            <p>송금 진행중...</p>
          ) : null}
          {bankStore.isTransferSuccess ? (
            <p>✅ 송금 완료!</p>
          ) : null}
        </Element>
      </form>
    </Container>
  );
}
