import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import MainLayout from './layouts/MainLayout';
import { sendMessageToBackgroundAsync } from '@src/chrome/message';
import Link from '@src/components/Link';
import { useRouter } from '@src/stores/useRouter';
import LoginSection from '@root/src/components/LoginSection';
import SignupSection from '@root/src/components/signup/SignupSection';

const loginNear = async (id: string, pw: string) => {
  console.log('loginNear');
  const res = await sendMessageToBackgroundAsync({
    type: 'LoginNear',
    input: {
      id,
      pw,
    },
    data: 'login',
  });
  return res;
};

function Popup() {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <ul>
        <li>
          <Link pathname="/">Home</Link>
        </li>
        <li>
          <Link pathname="/login">Login</Link>
        </li>
        <li>
          <Link pathname="/signup">Signup</Link>
        </li>
      </ul>
      {pathname === '/' && <div>Popup</div>}
      {pathname === '/login' && <LoginSection />}
      {pathname === '/signup' && <SignupSection />}
    </MainLayout>
  );
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
