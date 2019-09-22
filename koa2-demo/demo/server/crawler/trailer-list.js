const puppeteer=require('puppeteer')
const pageNo=3 //显示pageNo页的数据
const url=`https://movie.douban.com/tag/#/?sort=U&range=6,10&tags=`
const sleep=time=>{
	return new Promise(resolve=>{
		setTimeout(resolve,time)
	})
}
;(async () => {

  const browser = await puppeteer.launch({
  	args:['--no-sandbox'],
  	dumpio:false
  });
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await sleep(3000)
  await page.waitForSelector('.more')
  for(let i=1;i<pageNo;i++){
    if(i!=pageNo){
      await sleep(3000)
      await page.click('.more')
       
    }
  
  }

  const result=await page.evaluate(()=>{
  	var $=window.$

  	var items=$('.list-wp .item')
  	var links=[] 


  	if(items.length>=1){
  		items.each((index,item)=>{
  			let it=$(item)
  			let doubanId=it.find('div').data('id')
  			let title=it.find('.title').text()
  			let rate=it.find('.rate').text()
  			let poster=it.find('.pic img').attr('src').replace('s_ratio','l_ratio')

  			links.push({
  				doubanId,
  				title,
  				rate,
  				poster
  			})
  		})
  	}
  	return links
  })
  await browser.close();
  
   process.send({result})
   process.exit(0)

})();
