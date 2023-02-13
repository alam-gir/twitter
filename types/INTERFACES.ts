export interface SourceI {
  id: null | string;
  name: string;
}

export interface UsersNameI {
  title: string;
  first: string;
  last: string;
}

export interface UsersLoginI {
  md5: string;
  password: string;
  salt: string;
  sha1: string;
  sha256: string;
  username: string;
  uuid: string;
}

export interface UserPictireI {
  large: string;
  medium: string;
  thumbnail: string;
}
export interface ArticleI {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: SourceI;
  title: string;
  url: string;
  urlToImage: string;
}
export interface UserI {
  name: UsersNameI;
  login: UsersLoginI;
  picture: UserPictireI;
}
