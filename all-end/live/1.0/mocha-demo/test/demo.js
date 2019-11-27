import add from '../src/index'
import  {expect} from 'chai'


describe('测试inde.js',function(){
  describe('测试add函数case1',function(){
    it('两个参数相加的和',function(){
      expect(add(1,2)).to.be.equal(3)
    })
  })

  describe('测试add函数case2',function(){
    it('两个参数相加的和反例',function(){
      expect(add(1,2)).to.be.not.equal(4)
    })
  })
})