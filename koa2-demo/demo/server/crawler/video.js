const puppeteer=require('puppeteer')
const base=`https://movie.douban.com/subject/`
const doubanId='3793023'

const sleep=time=>{
	new Promise(resolve=>{
		setTimeout(resolve,time)
	})
}
;(async () => {

  const browser = await puppeteer.launch({
  	args:['--no-sandbox'],
  	dumpio:false
  });
  const page = await browser.newPage();
  await page.goto(base+doubanId, {waitUntil: 'networkidle2'});
  await sleep(2000)

 
   
  const result=await page.evaluate(()=>{
  	var $=window.$

  	var it=$('.related-pic-video')
  	if(it&&it.length>0){
  		var link=it.attr('href')
  		var cover=it.css('backgroundImage').replace('url("','').replace('")','')
  		return{
  			link,
  			cover
  		}
  	}
  	return{

  	}
 
  	 
  })
  let video;
 
  if(result&&result.link){
  	await page.goto(result.link, {waitUntil: 'networkidle2'});
  	await sleep(2000)
  	 
  	video =await page.evaluate(()=>{
  		var $=window.$
  		var it =$('source')
  		if(it){
  			return it.attr('src')
  		}else{
  			return ''
  		}
  		

  	})
 
  }
  const data={
  	video,
  	doubanId,
  	cover:result.cover
  }
  

 
  await browser.close();
  
   process.send(data)
   process.exit(0)

})();
