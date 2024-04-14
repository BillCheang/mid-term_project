import crypto  from 'crypto';

function generatePassword(length = 30) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";

  let password = "";
  // 创建一个包含密码字符的缓冲区
  const passwordBuffer = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    // 通过密码缓冲区的每个字节来选择字符
    const randomIndex = passwordBuffer[i] % charset.length;
    password += charset[randomIndex];
  }

  return password;
}
export default generatePassword