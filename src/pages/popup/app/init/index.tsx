import NearProtocolImage from '@assets/img/near-protocol-logo.png';
import Link from '../../components/Link';
import { useRef, useState } from 'react';
import { sendMessageToBackgroundAsync } from '@root/src/chrome/message';
import { isAccountIdAvailable } from '@root/src/pages/lib/near/account';
import { useRouter } from '@root/src/stores/useRouter';
import { cls } from '@root/utils/util';

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

export default function InitSection() {
  const { setPathname } = useRouter();
  const accountIdRef = useRef<HTMLInputElement>();
  const accountPwRef = useRef<HTMLInputElement>();
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = async () => {
    if (accountIdRef.current?.value !== '') {
      console.log('login');
      const isAvailable = await isAccountIdAvailable(accountIdRef.current.value);
      setIsAvailable(isAvailable);
      if (!isAvailable) {
        alert('Account ID is already used');
        return;
      }
      const res = await createAccount(accountIdRef.current.value, accountPwRef.current.value);
      console.log(res.seedPhrase, res.publicKey, res.secretKey);

      setPathname('/create-wallet');
    } else {
      setIsAvailable(false);
    }
  };

  return (
    <section className="flex flex-col items-center gap-y-12 px-24">
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-2xl text-black font-bold">Welcome to Wallet!</h1>
        <img src={NearProtocolImage} alt="near protocol" width={200} />
      </div>
      <div className="flex flex-col gap-y-4 w-full">
        <h2 className="text-sm">Claim your identity!</h2>
        <div
          className={cls(
            'relative overflow-hidden text-base flex rounded-full border text-lg',
            isAvailable ? 'border-green-300' : 'border-red-500',
          )}>
          <input ref={accountIdRef} placeholder="Account ID" className="ml-8 w-fit focus:outline-none" type="text" />
          <p className="absolute right-8">.testnet</p>
        </div>
        <div
          className={cls(
            'relative overflow-hidden text-base flex rounded-full border text-lg',
            isAvailable ? 'border-green-300' : 'border-red-500',
          )}>
          <input ref={accountPwRef} placeholder="Password" className="ml-8 w-fit focus:outline-none" type="text" />
          <p className="absolute right-8"></p>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-full py-8 h-32 bg-indigo-600 text-base text-white rounded-full">
          Create Wallet
        </button>
        <Link pathname="/import-wallet" className="underline text-gray-600">
          Import an existing wallet
        </Link>
      </div>
    </section>
  );
}
