import { utils, keyStores, KeyPair, connect, providers } from 'near-api-js';

const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: 'testnet',
  keyStore: myKeyStore,
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://testnet.mynearwallet.com/',
  helperUrl: 'https://helper.testnet.near.org',
};

export async function createNearAccount(creatprAccountId: string, newAccountId: string, amount: string) {
  const near = await connect(config);
  const creatorAccount = await near.account(creatprAccountId);
  const keyPair = KeyPair.fromRandom('ed25519');
  const publicKey = keyPair.getPublicKey().toString();

  await myKeyStore.setKey(config.networkId, newAccountId, keyPair);
  try {
    await creatorAccount.createAccount(newAccountId, publicKey, utils.format.parseNearAmount(amount));
    // const res = await creatorAccount.functionCall({
    //   contractId: config.networkId,
    //   methodName: 'create_account',
    //   args: {
    //     new_account_id: newAccountId,
    //     new_public_key: publicKey,
    //   },
    //   gas: '300000000000000',
    //   attachedDeposit: utils.format.parseNearAmount(amount),

    // });
    console.log('Account creation successful');
    return true;
  } catch (error) {
    console.error('Account creation failed:', error);
    return false;
  }
}

const provider = new providers.JsonRpcProvider({ url: 'https://rpc.testnet.near.org' });

export async function isAccountIdAvailable(newAccountId: string) {
  let isExist = true;
  try {
    const rawResult = await provider.query({
      request_type: 'view_account',
      account_id: newAccountId + '.testnet',
      finality: 'final',
    });
    console.log(rawResult);
  } catch (e) {
    console.log(e);
    if (e.type === 'AccountDoesNotExist') {
      isExist = false;
    }
  }
  console.log(isExist ? `The account ${newAccountId} exists.` : `There is no account ${newAccountId}.`);
  return !isExist;
}
