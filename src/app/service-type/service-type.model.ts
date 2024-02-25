export class ServiceType {
  public serviceTypeCode!:number;
    public serviceId: string;
    public description: string;

    constructor(serviceId:string,description: string
    ) {
        this.serviceId = serviceId;
      this.description=description;
    }
}