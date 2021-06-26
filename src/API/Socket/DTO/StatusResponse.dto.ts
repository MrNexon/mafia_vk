export interface StatusResponseDto<T = undefined> {
  status: boolean;
  data: T;
}
