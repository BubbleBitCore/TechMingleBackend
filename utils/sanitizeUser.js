export const sanitizeUser = (user) => {
  const { _id, name, mobileNo, email, role } = user;
  return {
    _id,
    name,
    mobileNo,
    email,
    role,
  };
};
