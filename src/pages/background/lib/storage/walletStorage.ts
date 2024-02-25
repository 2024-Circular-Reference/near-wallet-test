import { ILocalStorage, LocalStorage } from '@src/chrome/localStorage';

export class WalletStorage {
  private static WALLET = 'WALLET';
  static storage: ILocalStorage = new LocalStorage();

  static async setAccount(accountId: string, seedPhrase: string, publicKey: string, secretKey: string) {
    await this.storage.save(this.WALLET, { accountId, seedPhrase, publicKey, secretKey });
    console.log('setAccount', accountId, seedPhrase, publicKey, secretKey);
    return seedPhrase;
  }

  static async setAccountId(accountId: string) {
    const account = await this.storage.load(this.WALLET);
    await this.storage.save(this.WALLET, { ...account, accountId });
    return accountId;
  }

  static async getSeedPhrase() {
    const { seedPhrase } = await this.storage.load(this.WALLET);
    return seedPhrase;
  }

  static async getPublicKey() {
    const { publicKey } = await this.storage.load(this.WALLET);
    return publicKey;
  }

  static async getSecretKey() {
    const { secretKey } = await this.storage.load(this.WALLET);
    return secretKey;
  }
}
