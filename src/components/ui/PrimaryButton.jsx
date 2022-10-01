import styled from 'styled-components';
import Button from './Button';

const PrimaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.primaryButton};
  color: ${(props) => props.theme.colors.primaryButtonText};

  &[disabled] {
    background: ${(props) => props.theme.colors.disabled};
    color: ${(props) => props.theme.colors.disabledText};
  }
`;

export default PrimaryButton;
