import styled from 'styled-components';
import Button from './Button';

const SecondaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.secondaryButton};
  color: ${(props) => props.theme.colors.secondaryButtonText};
`;

export default SecondaryButton;
