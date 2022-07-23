import { generateKeyPairSync } from 'crypto';

const { privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
});

export const getPrivateKey = () => process.env.JWT || privateKey;
