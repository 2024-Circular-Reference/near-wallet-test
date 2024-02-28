import { useRef, useState } from 'react';
import { sendMessageToBackgroundAsync } from '@root/src/chrome/message';
import { isAccountIdAvailable } from '@root/src/pages/lib/near/account';
import { useRouter } from '@root/src/stores/useRouter';
import { cls } from '@root/utils/util';
import { useUserAccount } from '@root/src/stores/useUserAccount';
import { FormEvent } from 'react/ts5.0';
import { useLoading } from '@root/src/stores/useLoading';

const createAccount = async (id: string) => {
  console.log('create account');
  const res = await sendMessageToBackgroundAsync({
    type: 'CreateAccount',
    input: {
      id,
    },
    code: 200,
  });
  return res.account;
};

export default function TestSection() {
  const { setPathname } = useRouter();
  const accountIdRef = useRef<HTMLInputElement>();
  const [isAvailable, setIsAvailable] = useState(true);
  const studentIdRef = useRef<HTMLInputElement>();
  const studentPwRef = useRef<HTMLInputElement>();
  const { accountSeed, setUserAccount } = useUserAccount();
  const { setLoading } = useLoading();

  const onCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
    if (accountIdRef.current?.value !== '') {
      setLoading(true);
      const isAvailable = await isAccountIdAvailable(accountIdRef.current.value + '.testnet');
      setIsAvailable(isAvailable);
      if (!isAvailable) {
        alert(`Account ID${accountIdRef.current.value} is already used`);
        setLoading(false);
        return;
      }

      const userAccountSeed = await createAccount(accountIdRef.current.value + '.testnet');
      console.log(userAccountSeed);
      setUserAccount(accountIdRef.current.value + '.testnet', userAccountSeed);
      setLoading(false);
      //setPathname('/create-wallet');
    } else {
      setIsAvailable(false);
    }
  };

  return (
    <section className="flex flex-col items-center gap-y-12 px-24">
      <div className="flex flex-col gap-y-4 w-full">
        {/* 계정 생성 테스트 */}
        <h2>계정 생성 테스트</h2>
        <form
          onSubmit={onCreateAccount}
          className={cls(
            'overflow-hidden text-base flex flex-col gap-y-8',
            isAvailable ? 'border-green-300' : 'border-red-500',
          )}>
          <div className="flex relative rounded-full border text-lg overflow-hidden">
            <input ref={accountIdRef} placeholder="Account ID" className="pl-8 focus:outline-none" type="text" />
            <p className="absolute right-8" aria-describedby="accountId">
              .testnet
            </p>
          </div>
          <button className="flex items-center justify-center w-full py-8 h-32 bg-indigo-600 text-base text-white rounded-full">
            Create Wallet
          </button>
        </form>
        <p>your public key: ${accountSeed.publicKey}</p>
        <p>your secret key: ${accountSeed.secretKey}</p>
        <p>your seed phrase: ${accountSeed.seedPhrase}</p>
      </div>
      {/* VC 요청 테스트 */}
    </section>
  );
}
