import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import MainLayout from './components/layout/MainLayout';
import { useRef } from 'react';
import { sendMessageToBackgroundAsync } from '@root/src/chrome/message';
import { accountExists, createNearAccount } from '../background/lib/utils/near/account';

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
  await accountExists('test.kimcookieya.testnet');
  await createNearAccount('kimcookieya.testnet', 'test.kimcookieya.testnet', '10000000000000000000000');
  return res;
};

function Popup() {
  const idRef = useRef<HTMLInputElement>();
  const pwRef = useRef<HTMLInputElement>();

  const handleSubmit = async () => {
    if (idRef.current && pwRef.current) {
      console.log('login');
      const res = await loginNear(idRef.current.value, pwRef.current.value);
      alert(res);
    } else {
      alert('id or pw is empty');
    }
  };

  return (
    <MainLayout>
      <section className="flex flex-col w-full min-h-screen items-center justify-center noscroll gap-y-2">
        <p>hello, popup!!</p>
        <input ref={idRef} placeholder="id" className="w-40 h-8 border rounded-xl px-2" />
        <input ref={pwRef} placeholder="pw" className="w-40 h-8 border rounded-xl px-2" />
        <button onClick={handleSubmit} className="w-40 h-8 bg-gray-900 text-white rounded-xl">
          Submit
        </button>
      </section>
    </MainLayout>
  );
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
