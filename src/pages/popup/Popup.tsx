import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import MainLayout from '@root/src/pages/popup/layouts/MainLayout';
import Link from '@root/src/pages/popup/components/Link';
import { useRouter } from '@src/stores/useRouter';
import LoginSection from '@root/src/pages/popup/components/LoginSection';
import SignupSection from '@root/src/pages/popup/components/signup/SignupSection';

function Popup() {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <ul className="flex gap-x-8 w-full justify-center">
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
