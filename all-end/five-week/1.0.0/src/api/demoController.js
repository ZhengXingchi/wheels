

class DemoController {
  constructor(){

  }

  async demo(ctx){
    ctx.body={
      "message":"body message!!!"
    }
  }
}

export default new DemoController();