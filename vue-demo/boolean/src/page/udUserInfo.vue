<template>
  <div class="allPage">
    <div class="searchAll">
      <el-button type="primary" size='mini' @click='beBack' >返回</el-button>
    </div>
    <div class="list"  v-loading="loading" element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <!-- 用户画像开始 -->
      <div class="rm_right_content" style="left: 0px;">
        <!-- uiView: content -->
        <div ui-view="content" cg-busy="queryPromise" class="ng-scope" style="position: relative;">
          <div class="rmn-useroneinfo ng-scope" style="overflow: hidden">
            <div class="oneinfo-top"><a class="oneinfo-tip">画像维度</a> <a class="oneinfo-time ng-binding">更新日期为 {{udUserInfo.last_modified_time}}</a> <!-- <a class="oneinfo-back" ng-hide="isApi" ui-sref="userOnePage({selectData:selectData})" href="https://new-my.udcredit.com/#/user-one-page">返回用户列表</a> -->
            </div>
            <!-- 头部信息 -->
            <div ng-controller="myCtrl">
              <!-- 基本信息概况 -->
              <div class="oneinfo-content" style="width: 54%;height: 300px">
                <div class="oneinfo-title" style="margin-bottom: 20px">基本信息概况</div>
                <div class="oneinfo-infoline" >身份证号码：<span class="ng-binding" v-if="udUserInfo.id_detail!==undefined">{{udUserInfo.id_detail.id_number_mask}}</span></div>
                <div class="oneinfo-infoline" >可信姓名：
                  <span  class="ng-binding" v-if="udUserInfo.id_detail!==undefined">{{udUserInfo.id_detail.name_credible}}   <i class="el-icon-tickets kexing" style="font-size: 24px;color: #12addd;vertical-align: middle;margin-left: 4px"></i>
                  </span>
                </div>
                <div class="oneinfo-infoline" >性别：<span class="ng-binding" v-if="udUserInfo.id_detail!==undefined">{{udUserInfo.id_detail.gender}} </span></div>
                <div class="oneinfo-infoline" >民族：<span class="ng-binding" v-if="udUserInfo.id_detail!==undefined">{{udUserInfo.id_detail.nation}} </span></div>

                <div class="oneinfo-infoline" >住址：<span class="ng-binding" v-if="udUserInfo.id_detail!==undefined">{{udUserInfo.id_detail.address}}</span></div>

                <div class="oneinfo-infoline" style="width: 50%">曾组合姓名：<span :title="udUserInfo.id_detail.names" class="ng-binding" v-if="udUserInfo.id_detail!==undefined">{{udUserInfo.id_detail.names}}</span></div>


              </div>
              <!-- 用户特征 -->
              <div class="oneinfo-content" style="width: 45%;height: 300px;margin-left: 1%">
                <div class="oneinfo-title">用户特征 <el-tooltip  placement="top"><div slot="content">大数据系统根据用户的互联网交易行为、黑名单匹配情况、<br/>操作行为等多维度来识别用户的特征，特征下的日期为该用户最近一次满足该特征的日期。<br/>同时特征颜色反应了用户在互联网借贷行业失信风险的高低程度，<br/>红色最高、黄色次之、绿色最低，蓝色为中性特征，灰色表示该特征未被触发</div><i class="el-icon-more user-fxtz"></i></el-tooltip>
                  <div class="oneinfo-zhushi-line">
                    <div ng-style="{'background':'#fd7065'}" style="background: rgb(253, 112, 101);"></div>
                    <span>高危</span>
                    <div ng-style="{'background':'#ffbf3b'}" style="background: rgb(255, 191, 59);"></div>
                    <span>警示</span>
                    <div ng-style="{'background':'#5bc3e1'}" style="background: rgb(91, 195, 225);"></div>
                    <span>中立</span>
                    <div ng-style="{'background':'#9e9e9e'}" style="background: rgb(158, 158, 158);"></div>
                    <span>未触发</span></div>
                </div>
                <div class="oneinfo-features" style="margin: 10px" v-if="features!==undefined" >

                  <div  class="oneinfo-features-i ng-scope noTime" tooltip-placement="bottom-left" v-for="feature in features" v-bind:style="{backgroundColor:feature.isBlack?'#E6A23C':'#909399'}"><span>{{feature.name}}</span>
                    <div v-if="feature.last_modified_date!==undefined" class="oneinfo-features-ii ng-binding" style="margin-top: -10px;" >{{feature.last_modified_date}}</div>
                  </div>

                </div>
              </div>
            </div>
            <!-- 借贷行业 -->
            <div class="oneinfo-content">
              <div class="oneinfo-title">信贷行为</div>
              <div style="height: 200px;position: relative">
                <div class="oneinfo-chart" id="user_chart_show1" style="width: 45%; -webkit-tap-highlight-color: transparent; user-select: none; background: transparent;" _echarts_instance_="ec_1534939757218">
                  <div style="position: relative; overflow: hidden; width: 100%; height: 200px; padding: 0px; margin: 0px; border-width: 0px;">
                    <div id="column" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 200px; user-select: none; -webkit-tap-highlight-color: transparent; padding: 0px; margin: 0px; border-width: 0px;" _echarts_instance_="ec_1545619181284">

                    </div>
                  </div>

                </div>
                <div class="oneinfo-chart" id="user_chart_show2" style="width: 30%; -webkit-tap-highlight-color: transparent; user-select: none; background: transparent;" >
                  <div style="position: relative; overflow: hidden; width: 100%; height: 200px; padding: 0px; margin: 0px; border-width: 0px;">
                    <div id="column2" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 200px; user-select: none; -webkit-tap-highlight-color: transparent; padding: 0px; margin: 0px; border-width: 0px;" >

                    </div>
                  </div>
                </div>
                <div class="oneinfo-chartinfo">
                  <div class="oneinfo-chartinfo-line">总申请借款平台数：<span class="ng-binding" v-if="udUserInfo.loan_detail!==undefined">{{udUserInfo.loan_detail.loan_platform_count}}个</span></div>
                  <!-- <div class="oneinfo-chartinfo-line">最近申请借款时间：<span>{{data.userDetail.loan_last_time}}</span></div> -->
                  <div class="oneinfo-chartinfo-line">总借款平台数：<span class="ng-binding" v-if="udUserInfo.loan_detail!==undefined">{{udUserInfo.loan_detail.actual_loan_platform_count}}个</span></div>
                  <div class="oneinfo-chartinfo-line">总还款平台数：<span class="ng-binding" v-if="udUserInfo.loan_detail!==undefined">{{udUserInfo.loan_detail.repayment_platform_count}}个</span></div>
                  <div class="oneinfo-chartinfo-line">还款笔数：<span class="ng-binding" v-if="udUserInfo.loan_detail!==undefined">{{udUserInfo.loan_detail.repayment_times_count}}笔</span></div>
                  <!-- <div class="oneinfo-chartinfo-line">最近还款时间：<span>{{data.userDetail.repayment_last_time}}</span></div> -->
                </div>
              </div>
              <div ng-show="data.installmentInfo.length" class="oneinfo-t"><span class="oneinfo-tinfo"><a>*</a>（大数据系统拥有覆盖互金行业的数据，包括非银行信贷、大学生分期、电商分期、旅游分期、医美分期、教育、汽车、租房、农业消金等十余个细分类目。下方表格仅展示该用户有匹配到数据的行业清单）</span></div>
              <div ng-show="data.installmentInfo.length" style="padding: 10px 2%" class="">
                <!--  ||huizu_data  -->
                <table class="oneinfo-table" v-if="udUserInfo.loan_detail!==undefined && udUserInfo.loan_detail.loan_industry!==undefined">
                  <tbody>
                  <tr>
                    <th>行业分类</th>
                    <th>申请借款平台数</th>
                    <th>借款平台数</th>
                    <th>还款平台数</th>
                    <th>还款笔数</th>
                  </tr>
                  <!-- ngRepeat: ent in data.installmentInfo -->
                  <!--
                      {
                          "actual_loan_platform_count": "0",实际借款平台数
                          "name": "小额现金贷",行业名称
                          "loan_platform_count": "3",申请借款平台数
                          "repayment_times_count": "0",还款次数
                          "repayment_platform_count": "0"还款平台数
                      }
                    -->
                  <tr class="ng-scope" v-for="loan in udUserInfo.loan_detail.loan_industry">
                    <td class="ng-binding">{{loan.name}}</td>
                    <td class="ng-binding">{{loan.loan_platform_count}}</td>
                    <td class="ng-binding">{{loan.actual_loan_platform_count}}</td>
                    <td class="ng-binding">{{loan.repayment_platform_count}}</td>
                    <td class="ng-binding">{{loan.repayment_times_count}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 互联网交易行为 -->
            <div class="oneinfo-content ng-hide" ng-show="false">
              <!-- merchSignedNum_all||merchTransNum_all -->
              <div class="oneinfo-title">互联网交易行为</div>
              <div style="height: 200px;position: relative">
                <div class="oneinfo-chart-line chart3-left">该用户共发起认证<span class="light ng-binding"></span>家，交易<span class="light ng-binding"></span>家。（不包含本商户）</div>
                <div class="oneinfo-chart" id="user_chart_show3" style="width: 100%; height: 200px; -webkit-tap-highlight-color: transparent; user-select: none;" _echarts_instance_="ec_1534939757220">
                  <div style="position: relative; overflow: hidden; width: 1661px; height: 200px; padding: 0px; margin: 0px; border-width: 0px;"></div>
                </div>
              </div>
            </div>
            <!-- 关联图谱 -->
            <div class="oneinfo-content ng-hide" ng-hide="isHasMap||isHasMapLoadedHide=='0'">
              <div class="oneinfo-title">关联图谱</div>
              <div ng-show="isHasMapLoaded" style="margin: 100px 0 100px -100px;text-align: center;font-size: 20px" class="ng-binding ng-hide"><img src="/static/img/yhy_kuface.png" style="width:120px"><br>
                ()</div>
              <div ng-hide="isHasMapLoaded" style="margin: 100px 0 100px -150px;text-align: center;font-size: 20px">
                <div class="oneinfo-ball-pulse">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span style="display: inline-block;margin: 0 0 0 20px">关联图谱生成中，请稍后</span></div>
            </div>
            <div class="oneinfo-content" ng-show="isHasMap">
              <div class="oneinfo-title">关联图谱&nbsp;<span ng-show="mapToMuch" style="font-weight: normal;font-size: 12px" class="ng-hide">（该用户关系网过于复杂，关系图中仅显示前两层关系）</span> <i style="font-weight: normal" class="iconfont" tooltip-placement="right" uib-tooltip="通过自有技术实现在互联网消费金融行业中的用户、设备、银行卡、手机号四个因素进行可视化的关联关系展示，可通过命中黑名单的因子找到其关联的其他因子，从而直观有效的发现各个因子之间存在的关系以及潜在风险"></i></div>
              <!-- <div style="height: 470px;width:60%;float: left">
                <div style="height: 100%; width: 100%; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;" id="user_chart_user" _echarts_instance_="ec_1534939757222">
                  <div style="position: relative; overflow: hidden; width: 997px; height: 470px; padding: 0px; margin: 0px; border-width: 0px;">
                  <div id="force" style="position: absolute; left: 0px; top: 0px; width: 997px; height: 470px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></div>
                  </div>
                  <div></div>
                </div>
              </div> -->
              <!-- 风险等级 -->
              <div ng-show="data.userDetail.score>0" style="position: absolute;left: 8%;top:20%;width: 40%;height: 300px" class="">
                <div id="user_chart_kedu" style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;" _echarts_instance_="ec_1534939757221">
                  <div style="position: relative; overflow: hidden; width: 100%; height: 300px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
                    <div id="circle" style="position: absolute; left: 0px; top: 0px; width: 538px; height: 300px; user-select: none; -webkit-tap-highlight-color: transparent; padding: 0px; margin: 0px; border-width: 0px;" >

                    </div>
                  </div>


                </div>
                <a style="position: absolute;left: 50%;margin-left: -6%;bottom: 13%;padding: 0px 10px;border-radius: 30px" tooltip-placement="bottom" uib-tooltip-html="dqmxhtmlTooltip" uib-tooltip="模型说明：贷前评估模型是特别针对小额现金贷行业提供的一项服务。基于用户的全维度数据信息，结合风控专家多年的行业经验，人工智能团队通过机器学习的数据挖掘算法，综合评判用户的小贷逾期概率，及时预警潜在的逾期风险。" class="rm_nbtn rm_nbtn_primary">贷前模型</a></div>

              <div style="height: 392px;width:40%;float: right">
                <div style="height: 122px;line-height: 25px;text-align: end;padding-right: 20px;margin-top: -30px">
                  <!-- <div style="font-size: 14px;font-weight: bold" ng-hide="isApi">
                    <div ng-click="chooseBlack()" ng-show="!mapMainNode._is_mark||mapMainNode._is_mark=='false'" style="display: inline-block;cursor: pointer"><img src="/static/img/u_buttom1.png" style="width: 40px;margin: -3px 10px 0 0">标记当前用户为商户黑名单</div>
                    <div ng-click="delChooseBlack()" ng-show="mapMainNode._is_mark=='true'" style="display: inline-block;cursor: pointer" class="ng-hide"><img src="/static/img/u_buttom.png" style="width: 40px;margin: -3px 10px 0 0;transform: rotate(180deg)">取消标记当前用户为黑名单</div>
                  </div> -->
                  <div><img style="width:16px;margin: -3px 0px 0 10px" src="/static/img/u_ID_CARD2.png" alt=""> <span>商户黑名单</span> <img style="width:16px;margin: -3px 0px 0 10px" src="/static/img/u_ID_CARD3.png" alt=""> <span>&amp;商户黑名单</span></div>
                  <div><img style="width:16px;margin: -3px 0px 0 30px" src="/static/img/u_ID_CARD1.png" alt=""> <img style="width:16px;margin: -3px 0px 0 0px" src="/static/img/u_DEVICE1.png" alt=""> <span>黑名单</span></div>
                </div>
                <div style="height: 300px" v-if="udUserInfo.graph_detail!=undefined">
                  <div style="text-align: end;padding-right: 20px"><img style="width:16px;margin: -3px 0px 0 15px" src="/static/img/u_ID_CARD.png" alt=""> <span>身份证</span> <img style="width:16px;margin: -3px 0px 0 10px" src="/static/img/u_DEVICE.png" alt=""> <span>设备</span> <img style="width:16px;margin: -3px 0px 0 10px" src="/static/img/u_MOBILE.png" alt=""> <span>手机号</span> <img style="width:16px;margin: -3px 0px 0 10px" src="/static/img/u_BANK_CARD.png" alt=""> <span>银行卡</span></div>
                  <div style="position: relative;height: 60px;margin:5px;padding:5px 10px;background: #eee;line-height: 25px">
                    <div><img style="width:22px;margin: -3px 3px 0 0" src="/static/img/u_ID_CARD.png" alt="">
                      <div style="display: inline-block"  v-if="udUserInfo.graph_detail!==undefined"><span style="font-weight: bold">关联用户数</span> <span class="light ng-binding">{{udUserInfo.graph_detail.link_user_count}}个</span> <span>（本商户内&nbsp;<span class="light ng-binding">{{udUserInfo.graph_detail.partner_user_count}}个</span>）</span></div>
                    </div>
                    <div v-if="udUserInfo.graph_detail.link_user_detail!=undefined">
                      <span>法院失信&nbsp;<span class="light ng-binding" style="margin: 0 5px 0 0" v-if="udUserInfo.graph_detail.link_user_detail!==undefined">{{udUserInfo.graph_detail.link_user_detail.court_dishonest_count}}个</span></span> <span>网贷失信&nbsp;<span class="light ng-binding" style="margin: 0 5px 0 0" v-if="udUserInfo.graph_detail.link_user_detail!==undefined">{{udUserInfo.graph_detail.link_user_detail.online_dishonest_count}}个</span></span>
                      <span>活体攻击行为&nbsp;<span class="light ng-binding" style="margin: 0 5px 0 0" v-if="udUserInfo.graph_detail.link_user_detail!==undefined">{{udUserInfo.graph_detail.link_user_detail.living_attack_count}}个</span></span> <span>商户标记&nbsp;<span class="light ng-binding" style="margin: 0 5px 0 0" v-if="udUserInfo.graph_detail.link_user_detail!==undefined">{{udUserInfo.graph_detail.link_user_detail.partner_mark_count}}个</span></span>
                    </div>
                  </div>
                  <div style="position: relative;height: 60px;margin:5px;padding:5px 10px;background: #eee;line-height: 25px">
                    <div  v-if="udUserInfo.graph_detail!==undefined"><img style="width:22px;margin: -3px 3px 0 0" src="/static/img/u_DEVICE.png" alt="">
                      <div style="display: inline-block"><span style="font-weight: bold">使用设备数</span> <span class="light ng-binding">{{udUserInfo.graph_detail.link_device_count}}个</span></div>
                    </div>
                    <div  v-if="udUserInfo.graph_detail.link_device_detail!==undefined">
                      <span>可疑设备&nbsp;<span class="light ng-binding" style="margin: 0 5px 0 0">{{udUserInfo.graph_detail.link_device_detail.frand_device_count}}个</span></span>
                      <span>活体攻击设备&nbsp;<span class="light ng-binding" style="margin: 0 5px 0 0">{{udUserInfo.graph_detail.link_device_detail.living_attack_device_count}}个</span></span>
                    </div>
                  </div>
                  <div style="position: relative;height: 60px;margin:5px;padding:5px 10px;background: #eee;line-height: 25px">
                    <div v-if="udUserInfo.graph_detail!==undefined"><img style="width:22px;margin: -3px 3px 0 0" src="/static/img/u_DEVICE.png" alt="">
                      <div style="display: inline-block"><span style="font-weight: bold">其他关联设备数</span> <span class="light ng-binding">{{udUserInfo.graph_detail.other_link_device_count}}个</span></div>
                    </div>
                    <div v-if="udUserInfo.graph_detail.other_link_device_detail!==undefined">
                      <span>可疑设备&nbsp;<span class="light ng-binding" style="margin: 0 5px 0 0">{{udUserInfo.graph_detail.other_link_device_detail.other_frand_device_count}}个</span></span>
                      <span>活体攻击设备&nbsp;<span class="light ng-binding" style="margin: 0 5px 0 0">{{udUserInfo.graph_detail.other_link_device_detail.other_living_attack_device_count}}个</span></span>
                    </div>
                  </div>
                  <div style="position: relative;height: 35px;margin:5px;padding:5px 10px;background: #eee;line-height: 25px">
                    <div><img style="width:22px;margin: -3px 3px 0 0" src="/static/img/u_BANK_CARD.png" alt="">
                      <div style="display: inline-block; margin: 0 20px 0 0"><span style="font-weight: bold">名下银行卡数</span> <span class="light ng-binding" v-if="udUserInfo.graph_detail.user_have_bankcard_count!==undefined">{{udUserInfo.graph_detail.user_have_bankcard_count}}个</span></div>
                      <div style="display: inline-block"><span style="font-weight: bold">关联银行卡数</span> <span class="light ng-binding" v-if="udUserInfo.graph_detail.bankcard_count!==undefined">{{udUserInfo.graph_detail.bankcard_count}}个</span></div>
                    </div>
                  </div>
                  <div style="position: relative;height: 35px;margin:5px;padding:5px 10px;background: #eee;line-height: 25px">
                    <div><img style="width:22px;margin: -3px 3px 0 0" src="/static/img/u_MOBILE.png" alt="">
                      <div style="display: inline-block"><span style="font-weight: bold">使用手机号</span> <span class="light ng-binding" v-if="udUserInfo.graph_detail.mobile_count!==undefined">{{udUserInfo.graph_detail.mobile_count}}个</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 关联信息 -->
            <div class="oneinfo-content" ng-show="data.deviceDetail.length||data.cardDetail.length||data.mobileDetail.length">
              <div class="oneinfo-title">关联信息</div>
              <div class="oneinfo-t" ng-show="data.deviceDetail.length>0">移动设备情况 <span class="oneinfo-tinfo"><a>*</a>该用户共使用<span class="light ng-binding" v-if="udUserInfo.devices_list!==undefined">{{udUserInfo.devices_list.length}}</span>个设备，下方仅展示设备的最新信息。</span></div>
              <!-- ngRepeat: ent in data.deviceDetail -->

              <div class="oneinfo-device ng-scope" v-for="devices in udUserInfo.devices_list">
                <div class="oneinfo-device-icon phoneb"></div>
                <div class="oneinfo-device-lie brl">
                  <div class="oneinfo-bigsize ng-binding">{{devices.device_name}}</div>
                  <div>设备ID：<span class="ng-binding">{{devices.device_id}}</span></div>
                </div>
                <div class="oneinfo-device-lie" ng-show="ent.device_last_use_time||ent.device_link_id_count">
                  <div ng-show="ent.device_last_use_time">最近使用时间：<span class="ng-binding">{{devices.device_last_use_date}}</span></div>
                  <div ng-show="ent.device_link_id_count" class="itext">设备使用用户数：<span class="ng-binding">{{devices.device_link_id_count}}人</span></div>
                  <!-- <div ng-show="hasOrhasnot(ent.deviceDetail.living_attack)" class="itext ng-hide">有无活体攻击：<span class="ng-binding"></span></div> -->
                  <!-- <div ng-show="trueOrFalse(ent.deviceDetail.sf)" class="itext ng-hide">可疑设备：<span class="ng-binding"></span></div> -->
                </div>
                <div class="oneinfo-device-lie" ng-show="ent.deviceDetail.i||(ent.deviceDetail.p+ent.deviceDetail.c)||trueOrFalse(ent.deviceDetail.y)||ent.deviceDetail.n">
                  <!-- <div ng-show="ent.deviceDetail.i" class="ng-hide">真实IP：<span class="ng-binding"></span></div> -->
                  <div ng-show="trueOrFalse(ent.deviceDetail.y)">设备使用代理：<span class="ng-binding">{{devices.device_detail.is_using_proxy_port==1?'是':'否'}}</span></div>
                  <div ng-show="ent.deviceDetail.n">网络类型：<span class="ng-binding">{{devices.device_detail.network_type}}</span></div>
                </div>
                <div class="oneinfo-device-lie" ng-show="trueOrFalse(ent.deviceDetail.s)||trueOrFalse(ent.deviceDetail.r)||trueOrFalse(ent.deviceDetail.cc>1?1:ent.deviceDetail.cc)||trueOrFalse(ent.deviceDetail.l)">
                  <!-- <div ng-show="trueOrFalse(ent.deviceDetail.s)">设备为模拟器：<span>{{trueOrFalse(ent.deviceDetail.s)}}</span></div> -->
                  <div ng-show="trueOrFalse(ent.deviceDetail.r)">设备越狱（root）：<span class="ng-binding">{{devices.device_detail.is_rooted==1?'是':'否'}}</span></div>
                  <div ng-show="trueOrFalse(ent.deviceDetail.cc>1?1:ent.deviceDetail.cc)" class="itext">是否安装作弊软件：<span class="ng-binding">{{devices.device_detail.cheats_device==1?'是':'否'}}</span></div>
                  <div ng-show="ent.deviceDetail.l" class="itext">借贷App安装数量：<span class="ng-binding">{{devices.device_detail.app_instalment_count}}</span></div>
                </div>
              </div>

              <!-- end ngRepeat: ent in data.deviceDetail -->

            </div>
            <!-- 用户轨迹 -->

          </div>

        </div>
      </div>
      <!-- 用户画像结束 -->
    </div>

  </div>
</template>
<script>
  import {getUdUserinfo} from '@/API'
  export default {
    // components:{
    //   BackTop
    // },
    data: () => {

      return {
        bar:{},
        id: '',
        option:{},//借款
        option2:{},//还款
        circleOption:{},//风险
        isLoaded:false,
        features:{},//用户特征
        loading:true,
        idNum:'',
        udUserInfo:{},
        featureList:{
          0:{name:'多头借贷',isBlack:false},
          2:{name:'羊毛党',isBlack:false},
          5:{name:'作弊软件',isBlack:false},
          6:{name:'法院失信',isBlack:false},
          7:{name:'网贷失信',isBlack:false},
          8:{name:'关联过多',isBlack:false},
          10:{name:'曾使用可疑设备',isBlack:false},
          11:{name:'安装极多借贷app',isBlack:false},
          13:{name:'身份信息疑似泄漏',isBlack:false},
          17:{name:'活体攻击设备',isBlack:false},
          18:{name:'活体攻击行为',isBlack:false},
          21:{name:'疑似欺诈团伙',isBlack:false},
          23:{name:'网贷不良',isBlack:false},
          24:{name:'短期逾期',isBlack:false},
        },
        cellStyle:{
          'line-height': '16px;'
        },
      }
    },
    beforeMount(){
      if((this.$route.params.idNum)!=undefined && this.$route.params.idNum!=""){
        this.idNum = this.$route.params.idNum
      }
      this.getDetail();


    },
    updated:function(){

      var itemStyle0 = {
        normal: {
          label: {
            show: true,
            textStyle: {
              fontWeight: 'bolder',
              fontSize: '12',
              fontFamily: '微软雅黑'
            },
            position: 'top'
          },
          color: 'rgb(70,148,217)'
        }
      };
      var itemStyle1 = {
        normal: {
          label: {
            show: true,
            textStyle: {
              fontWeight: 'bolder',
              fontSize: '12',
              fontFamily: '微软雅黑'
            },
            position: 'top'
          },
          color:'rgb(119,215,232)'
        }
      };
      //实际借款
      let actualLoanTotal = this.udUserInfo.loan_detail.loan_platform_count_6m+this.udUserInfo.loan_detail.loan_platform_count_3m+this.udUserInfo.loan_detail.loan_platform_count_1m;
      //申请借款
      let loanTotal = this.udUserInfo.loan_detail.loan_platform_count_6m+this.udUserInfo.loan_detail.loan_platform_count_3m+this.udUserInfo.loan_detail.loan_platform_count_1m;

      // 指定图表的配置项和数据
      this.option = {
        title : {
          show: true,
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data:['申请借款','借款']
        },
        xAxis: [
          {
            type: 'category',
            data: ['总计','近6月','近3月','近1月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',

            axisLabel: {
            },
            show: false,
          }
        ],
        series: [
          {
            name:'申请借款',
            type:'bar',
            data:[this.udUserInfo.loan_detail.loan_platform_count,this.udUserInfo.loan_detail.loan_platform_count_6m,this.udUserInfo.loan_detail.loan_platform_count_3m,this.udUserInfo.loan_detail.loan_platform_count_1m],
            itemStyle : itemStyle0        },
          {
            name:'借款',
            type:'bar',
            data:[this.udUserInfo.loan_detail.actual_loan_platform_count,this.udUserInfo.loan_detail.actual_loan_platform_count_6m,this.udUserInfo.loan_detail.actual_loan_platform_count_3m,this.udUserInfo.loan_detail.actual_loan_platform_count_1m],
            itemStyle : itemStyle1        },
        ]
      };
      var repayStyle = {
        normal: {
          label: {
            show: true,
            textStyle: {
              fontWeight: 'bolder',
              fontSize: '12',
              fontFamily: '微软雅黑'
            },
            position: 'top'
          },
          color: function (params) {
            var colorList = [
              'rgb(37,185,125)'
            ];
            return colorList[params.dataIndex]
          }
        }
      };

      this.option2={
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
          // backgroundColor:"rgb(119,215,232)"
        },
        legend: {
          data:['还款']
        },
        xAxis: [
          {
            type: 'category',
            data: ['总计','近6月','近3月','近1月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',
            axisLabel: {
              formatter: '{value} 个'
            },
            axisLine:{
              lineStyle:{
                show: false,
                width:2
              },
            },
            show: false
          }
        ],
        series: [
          {
            name:'还款',
            type:'bar',
            data:[this.udUserInfo.loan_detail.repayment_platform_count,this.udUserInfo.loan_detail.repayment_platform_count_6m,this.udUserInfo.loan_detail.repayment_platform_count_3m,this.udUserInfo.loan_detail.repayment_platform_count_1m],
            itemStyle : repayStyle        },
        ]

      };
      this.circleOption={
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter:'{value}'},
            data: [{value: this.udUserInfo.score_detail.score, name: this.udUserInfo.score_detail.risk_evaluation}]
          }
        ]

      };

      let loadnChart = this.$echarts.init(this.$el.querySelector ('#column'));
      let repayChart = this.$echarts.init(this.$el.querySelector("#column2"));
      let circleChart = this.$echarts.init(this.$el.querySelector("#circle"));
      loadnChart.setOption(this.option);
      repayChart.setOption(this.option2);
      circleChart.setOption(this.circleOption);
      //console.log(option);
    },
    filters:{
      userFeatures:function(value){
        if (!value) return ''

        if(this.featureList[value]){
          return this.featureList[value].name;
        }else{
          return '';
        }
      }
    },
    methods: {
      beBack() {
        this.$router.replace({name:'loanIdenti'})
      },

      getDetail(isOr) {
        let params = {};
        params.idNum = this.idNum
        getUdUserinfo(params).then(data=>{
          let udData = data.data.data;
          if(udData.header.ret_code=='000000'){
            this.udUserInfo = udData.body;
            this.isLoaded=true;
            this.udUserInfo.user_features.forEach(feature => {
              Object.keys(this.featureList).forEach(key=>{
                if(feature.user_feature_type==key){
                  this.featureList[key].isBlack=true;
                  if(feature.last_modified_date!=undefined){
                    this.featureList[key].last_modified_date=feature.last_modified_date;
                  }
                }

              })
            });
            this.features=this.featureList;
          }else{
            this.$message.error('获取多头报告错误');
          }
          this.loading=false;
        })
      }
    }
  }
</script>
<style scoped src="../style/ud-vendor.css"></style>
<style scoped src="../style/ud-main.css"></style>
<style lang="scss" scoped>
  @import '../style/publicSass.scss';
  [uib-tooltip-popup].tooltip.top-left > .tooltip-arrow, [uib-tooltip-popup].tooltip.top-right > .tooltip-arrow, [uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow, [uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow, [uib-tooltip-popup].tooltip.left-top > .tooltip-arrow, [uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow, [uib-tooltip-popup].tooltip.right-top > .tooltip-arrow, [uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow, [uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow, [uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow, [uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow, [uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow, [uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow, [uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow, [uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow, [uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow, [uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow, [uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow, [uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow, [uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow, [uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow, [uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow, [uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow, [uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow, [uib-popover-popup].popover.top-left > .arrow, [uib-popover-popup].popover.top-right > .arrow, [uib-popover-popup].popover.bottom-left > .arrow, [uib-popover-popup].popover.bottom-right > .arrow, [uib-popover-popup].popover.left-top > .arrow, [uib-popover-popup].popover.left-bottom > .arrow, [uib-popover-popup].popover.right-top > .arrow, [uib-popover-popup].popover.right-bottom > .arrow, [uib-popover-html-popup].popover.top-left > .arrow, [uib-popover-html-popup].popover.top-right > .arrow, [uib-popover-html-popup].popover.bottom-left > .arrow, [uib-popover-html-popup].popover.bottom-right > .arrow, [uib-popover-html-popup].popover.left-top > .arrow, [uib-popover-html-popup].popover.left-bottom > .arrow, [uib-popover-html-popup].popover.right-top > .arrow, [uib-popover-html-popup].popover.right-bottom > .arrow, [uib-popover-template-popup].popover.top-left > .arrow, [uib-popover-template-popup].popover.top-right > .arrow, [uib-popover-template-popup].popover.bottom-left > .arrow, [uib-popover-template-popup].popover.bottom-right > .arrow, [uib-popover-template-popup].popover.left-top > .arrow, [uib-popover-template-popup].popover.left-bottom > .arrow, [uib-popover-template-popup].popover.right-top > .arrow, [uib-popover-template-popup].popover.right-bottom > .arrow {
    top:auto;
    bottom:auto;
    left:auto;
    right:auto;
    margin:0;
  }
  [uib-popover-popup].popover, [uib-popover-html-popup].popover, [uib-popover-template-popup].popover {
    display:block !important;
  }
  .uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px 9px 2px;}.uib-left,.uib-right{width:100%}
  .uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll;}
  .ng-animate.item:not(.left):not(.right){ -webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}
  @charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}
  .top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
</style>
