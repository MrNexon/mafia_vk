export type RoomType = {
  id: number;
  token: string;
  type: number;
  size: number;
  state: number;
  availability: number;
  data: object | null;
};
