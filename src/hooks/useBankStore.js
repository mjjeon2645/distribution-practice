import { useEffect } from 'react';
import { bankStore } from '../stores/BankStore';
import useForceUpdate from './useForceUpdate';

// useBankStore를 갖다 쓰는 모든 컴포넌트가 변경사항이 발생했을 때 업데이트를 할 수 있도록.
export default function useBankStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    bankStore.subscribe(forceUpdate);

    return () => bankStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return bankStore;
}
