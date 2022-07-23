import { generateKeyPairSync } from 'crypto'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'
import { fileURLToPath } from 'url'
import User from './models/User.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRIVATE_KEY_FILE = path.join(__dirname, 'private.key')

/**
 * Generate a private key and write to a file, if one does not exist already.
 */
export const generatePrivateKey = () => {
  if (fs.existsSync(PRIVATE_KEY_FILE)) {
    return
  }

  const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });

  fs.writeFileSync(PRIVATE_KEY_FILE, privateKey)
}

/**
 * Get the private key used to sign JWT tokens
 */
export const getPrivateKey = () => (
  process.env.JWT
  || fs.readFileSync(PRIVATE_KEY_FILE).toString()
)

/**
 * Get the current user by parsing the submitted JWT token
 */
export const getCurrentUser = async (req) => {
  const token = req.cookies.access_token

  if (!token) {
    return null
  }

  const decodedToken = await new Promise((resolve) => {
    jwt.verify(token, getPrivateKey(), (error, decoded) => {
      if (error) {
        throw new Error('Token is not valid')
      }

      resolve(decoded)
    })
  })

  return User.findOne({ _id: decodedToken.id })
}
