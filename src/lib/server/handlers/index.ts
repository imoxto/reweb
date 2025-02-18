import { NextRequest } from "next/server";
import { ServerError } from "./ServerError";

export type RequestWithParams<TParams=any> = NextRequest & {params?: TParams};

export function createRouteHandler<TBody extends {data: any, type?: "success"|"error"|"warn"}, TParams=any>(
  innerFn: (request: RequestWithParams<TParams>) => TBody | Promise<TBody> | Response,
  options?: { errorMessage?: string; successMessage?: string }
) {
  return async (request: RequestWithParams<TParams>, {params}: {params: Promise<TParams>}) => {
    try {
      request.params = await params;
      const innerData = await innerFn(request);
      if (innerData instanceof Response) {
        return innerData;
      }
      const data = innerData.data;
      return Response.json(
        { message: options?.successMessage, data, type: innerData.type ?? "success" },
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    } catch (error: any) {
      console.error(error);
      if (error instanceof ServerError) {
        return Response.json(
          { message: error.message, type: "error" },
          {
            status: error.status,
            headers: { "content-type": "application/json" },
          }
        );
      }
      return Response.json(
        { message: options?.errorMessage, type: "error" },
        {
          status: 500,
          headers: { "content-type": "application/json" },
        }
      );
    }
  };
}
