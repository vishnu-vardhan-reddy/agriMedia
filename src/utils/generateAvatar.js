const generateDiceBearAvatar = (gender, name) => `
  https://avatars.dicebear.com/api/${
    gender ? gender.toLowerCase() : "male"
  }/${name}.svg?background=%230000ff
`;

export default generateDiceBearAvatar;
