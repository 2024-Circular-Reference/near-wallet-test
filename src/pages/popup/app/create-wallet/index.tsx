import { useRef } from 'react';

export default function CreateWalletSection() {
  const accountIdRef = useRef<HTMLInputElement>();
  const accountPwRef = useRef<HTMLInputElement>();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Create Account</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900">Create Your Account!!</p>
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
            <button className="w-full h-32 bg-gray-900 text-white rounded-xl">Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
}
