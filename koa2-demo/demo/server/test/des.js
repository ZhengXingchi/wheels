class Boy{
  @speak('中文')
  run(){
    console.log('I can run')
    console.log('I can speak'+this.language)
  }
}

function speak(language){
  return(target,key,descriptor)=>{
    target.language=language
    console.log(target)
    console.log(target[key])
    console.log(key)
    console.log(descriptor)
    return descriptor

  }
}

let lili=new Boy()
lili.run()