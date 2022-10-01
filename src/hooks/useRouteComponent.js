import AccountPage from '../pages/AccountPage';
import HomePage from '../pages/HomePage';
import TransactionsPage from '../pages/TransactionsPage';
import TransferPage from '../pages/TransferPage';

export default function useRouteComponent() {
  const { pathname } = window.location;

  const components = {
    '/': HomePage,
    '/account': AccountPage,
    '/transfer': TransferPage,
    '/transactions': TransactionsPage,
  };

  return components[pathname] || HomePage;
}
