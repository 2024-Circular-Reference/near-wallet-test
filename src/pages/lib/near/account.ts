import { utils, keyStores, KeyPair, connect, providers } from 'near-api-js';
import { Seed, generateSeedPhrase } from 'near-seed-phrase';

const myKeyStore = new keyStores.InMemoryKeyStore();

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
      account_id: newAccountId,
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

export async function createNearAccountOnTestnet(newAccountId: string): Promise<Seed | undefined> {
  const near = await connect(config);
  const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();
  const keyPair = KeyPair.fromString(secretKey);

  try {
    await myKeyStore.setKey(config.networkId, newAccountId, keyPair);
    const account = await near.createAccount(newAccountId, keyPair.getPublicKey());
    console.log(account);
    console.log('your seed phrase: ' + seedPhrase);
    console.log('Account creation successful');
    console.log(await account.getAccountBalance());
    console.log(await account.getAccountDetails());
    return { seedPhrase, publicKey, secretKey };
  } catch (error) {
    console.error('Account creation failed:', error);
    return undefined;
  }
}
