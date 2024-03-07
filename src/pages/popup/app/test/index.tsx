import { useRef, useState, useEffect } from 'react';
import { sendMessageToBackgroundAsync } from '@root/src/chrome/message';
import { useRouter } from '@root/src/stores/useRouter';
import { cls } from '@root/utils/util';
import { useUserAccount } from '@root/src/stores/useUserAccount';
import { FormEvent } from 'react/ts5.0';
import { useLoading } from '@root/src/stores/useLoading';
import axios from '@root/src/pages/lib/utils/axios';
import { UserAccount } from '@root/src/types/wallet';

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
  const { userAccount, setUserAccount } = useUserAccount();
  const { setLoading } = useLoading();
  const [mockStatus, setMockStatus] = useState({ available: false, message: '' });

  const onCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
    if (accountIdRef.current?.value !== '') {
      const newAccountId = accountIdRef.current.value + '.testnet';
      setLoading(true);
      const res = await createAccount(newAccountId);
      console.log(res);
      if (res.code === 400) {
        setIsAvailable(false);
        setLoading(false);
        return;
      }
      setUserAccount(res);
      setLoading(false);
      //setPathname('/create-wallet');
    } else {
      alert('account id is empty');
    }
  };

  const onCreateMockUser = async () => {
    if (!mockStatus.available) {
      const res = await axios({
        method: 'get',
        url: 'http://localhost:4000/api',
      });
      if (res) {
        setMockStatus({ available: true, message: 'Success!!' });
      } else {
        setMockStatus({ available: false, message: 'Failed..' });
      }
    }
  };

  const onCreateVC = async (e: FormEvent) => {
    e.preventDefault();
    if (studentIdRef.current?.value !== '' && studentPwRef.current?.value !== '') {
      const stId = studentIdRef.current.value;
      const stPw = studentPwRef.current.value;
      try {
        const res = await axios({
          method: 'get',
          url: 'http://localhost:8081/api/holder/create-vc',
          params: {
            stNum: stId,
            stPwd: stPw,
            holderPubkey: userAccount?.publicKey,
          },
        });
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (userAccount.accountId) {
      accountIdRef.current.value = userAccount.accountId;
    }
  }, []);

  return (
    <section className="flex flex-col items-center gap-y-12 px-24">
      <div className="flex flex-col gap-y-4 w-full border rounded-2xl p-8">
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
        <p>your public key: ${userAccount?.publicKey}</p>
        <p>your secret key: ${userAccount?.secretKey}</p>
        <p>your seed phrase: ${userAccount?.seedPhrase}</p>
      </div>
      {/* 모킹 데이터 생성 버튼 */}
      <div className="flex flex-col gap-y-4 w-full">
        <button className="p-12 bg-orange-500 rounded-2xl" onClick={onCreateMockUser}>
          모킹 데이터 생성
        </button>
        <p>Result: {mockStatus.message}</p>
      </div>
      <div className="flex flex-col gap-y-4 w-full border rounded-2xl p-8">
        {/* VC 요청 테스트 */}
        <h2>VC 생성 테스트</h2>
        <form
          className={cls(
            'overflow-hidden text-base flex flex-col gap-y-8',
            isAvailable ? 'border-green-300' : 'border-red-500',
          )}
          onSubmit={onCreateVC}>
          <div className="flex relative rounded-full border text-lg overflow-hidden">
            <input
              ref={studentIdRef}
              defaultValue="20201111"
              placeholder="Student ID"
              className="pl-8 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex relative rounded-full border text-lg overflow-hidden">
            <input
              ref={studentPwRef}
              defaultValue="pwd1111"
              placeholder="Student Password"
              className="pl-8 focus:outline-none"
              type="text"
            />
          </div>
          <button className="flex items-center justify-center w-full py-8 h-32 bg-indigo-600 text-base text-white rounded-full">
            VC 생성 요청
          </button>
        </form>
        <p>your did document: </p>
        <p>your original VC: </p>
      </div>
    </section>
  );
}
