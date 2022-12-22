export class ApiError extends Error{
    public status:number
    public message: any
    constructor(status:number, message:any) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message:any) {
        return new ApiError(404, message)
    }

    static badRequest400(message:any){
        return new ApiError(400, message)
    }

    static internal(message:any) {
        return new ApiError(500, message)
    }
    static unauth(message:any){
        return new ApiError(401,message)
    }
}

