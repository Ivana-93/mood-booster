export class BaseResponse {
  public isSuccess: boolean;
  public message: string;
}

export class SingleResponse<T> extends BaseResponse {
  public data: T;
}

export class ListResponse<T> extends BaseResponse {
  public data: T[];
}

export class ErrorResponse extends BaseResponse {

}
