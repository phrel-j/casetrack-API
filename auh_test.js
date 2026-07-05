import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function testBcrypt() {
  const plainPassword = 'myPassword123';

  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log('Hashed password:', hashed);

  const isMatch = await bcrypt.compare('myPassword123', hashed);
  console.log('Correct password match?', isMatch); // true

  const isWrongMatch = await bcrypt.compare('wrongPassword', hashed);
  console.log('Wrong password match?', isWrongMatch); // false
}

function testJWT() {
  const secret = 'temporary-secret-for-testing'; // real secret goes in .env, Session 8

  const token = jwt.sign(
    { userId: 5, email: 'pharel@example.com' },
    secret,
    { expiresIn: '1h' }
  );
  console.log('Generated token:', token);

  const decoded = jwt.verify(token, secret);
  console.log('Decoded payload:', decoded);

  try {
    jwt.verify(token, 'wrong-secret');
  } catch (err) {
    console.log('Verification with wrong secret fails:', err.message);
  }
}

testBcrypt();
testJWT();