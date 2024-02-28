import { Contract, connect, keyStores } from 'near-api-js';

const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: 'testnet',
  keyStore: myKeyStore,
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://testnet.mynearwallet.com/',
  helperUrl: 'https://helper.testnet.near.org',
};

export async function getDidList() {
  const nearConnection = await connect(config);
  const account = await nearConnection.account('kimcookieya.testnet');

  const contract = new Contract(account, 'muddled-verse.testnet', {
    viewMethods: ['get_did_list'],
    changeMethods: ['reg_did_using_account'],
    useLocalViewExecution: false,
  });

  return await contract.reg_did_using_account();
}

export async function registerDid() {
  const nearConnection = await connect(config);
  const account = await nearConnection.account('kimcookieya.testnet');

  const contract = new Contract(account, 'muddled-verse.testnet', {
    viewMethods: ['get_did_list'],
    changeMethods: ['reg_did_using_account'],
    useLocalViewExecution: false,
  });

  return await contract.reg_did_using_account();
}
