export default interface Book {
  uid: string;
  title: string;
  publishedMonth: number;
  publishedYear: number;
  numberOfPages?: number;
  authors?: Author[];
  publishers?: Publisher[];
  characters?: Character[];
}

interface Author {
  uid: string;
  name: string;
}

interface Publisher {
  uid: string;
  name: string;
}

interface Character {
  uid: string;
  name: string;
}
