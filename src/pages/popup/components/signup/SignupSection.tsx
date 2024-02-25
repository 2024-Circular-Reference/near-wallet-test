import { sendMessageToBackgroundAsync } from '@root/src/chrome/message';
import { useRef } from 'react';

const createAccount = async (id: string, pw: string) => {
  console.log('create account');
  const res = await sendMessageToBackgroundAsync({
    type: 'CreateAccount',
    input: {
      id,
      pw,
    },
  });
  console.log(res);
  return res;
};

export default function SignupSection() {
  const accountIdRef = useRef<HTMLInputElement>();
  const accountPwRef = useRef<HTMLInputElement>();

  const handleSubmit = async () => {
    if (accountIdRef.current?.value !== '' && accountPwRef.current?.value !== '') {
      console.log('login');
      // alert(
      //   'Near Account를 생성하는 중입니다!\nid:' + accountIdRef.current.value + '\npw:' + accountPwRef.current.value,
      // );
      const res = await createAccount(accountIdRef.current.value, accountPwRef.current.value);
      alert(res.seedPhrase, res.publicKey, res.secretKey);
    } else {
      alert('id or pw is empty');
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Sign up</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900">Create an account!!</p>
          <div className="flex flex-col gap-y-8 mt-24">
            <input
              ref={accountIdRef}
              placeholder="Account ID"
              className="w-full h-32 border rounded-xl focus:outline-none"
            />
            <input
              ref={accountPwRef}
              placeholder="Account Password"
              className="w-full h-32 border rounded-xl focus:outline-none"
            />
            <button onClick={handleSubmit} className="w-full h-32 bg-gray-900 text-white rounded-xl">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
