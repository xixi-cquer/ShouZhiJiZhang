/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AccountTable from '../common/database/tables/AccountTable';
import AccountData from '../viewmodel/AccountData';
import CommonConstants from '../common/constants/CommonConstants';
import { DialogComponent } from '../view/DialogComponent';
import { ImageList } from '../viewmodel/AccountList';
import Logger from '../common/utils/Logger';
import { countCom } from '../view/countCom';

@Entry
@Component
struct MainPage {
  @State accounts: Array<AccountData> = [];
  @State searchText: string = '';
  @State isEdit: boolean = false;
  @State isInsert: boolean = false;
  @State newAccount: AccountData = {
    id: 0,
    accountType : 0,
    typeText : '',
    amount: 0,
    date :'',
    year :'',
    month :'',
    reminder:'',
  };
  @State index: number = -1;
  @State isTested:boolean =false;
  @State yearValue:string='';
  @State monthValue:string='';
  @State dayValue:string='';
  @State searchValue:string='';
  @State submitValue:string='';
  @State cur_search_text:string='';
  @State today_income:number =0;
  @State today_outcome:number=0;
  @State today_earning:number=0;
  @State isAll:number =1;
  @State isTime:number =0;
  @State isType:number =0;
  @State outType: number[]=[0,0,0,0,0,0];
  @State inType: number[]=[0,0]
  @State inC:number =0;
  @State outC:number =0;




  private downX=0;


  private AccountTable = new AccountTable(() => {});
  private deleteList: Array<AccountData> = [];
  searchController: SearchController = new SearchController();
  dialogController: CustomDialogController = new CustomDialogController({
    builder: DialogComponent({
      isInsert: $isInsert,
      newAccount: $newAccount,
      confirm: (isInsert: boolean, newAccount: AccountData) => this.accept(isInsert, newAccount)
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  });
  countController: CustomDialogController = new CustomDialogController({
    builder: countCom({
      inType:$inType,
      outType:$outType,
      inC:$inC,
      outC:$outC,
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  });

  calculate(account:AccountData[]){
    this.today_income=0
    this.today_outcome=0
    this.today_earning=0
    this.outType=[0,0,0,0,0,0];
    this.inType=[0,0]
    this.inC=0
    this.outC=0

    for(let i=0;i<account.length;i++){
      if(account[i].accountType==0){
        this.today_outcome +=account[i].amount;
        this.outC++;
        if(account[i].typeText==='吃饭'){
          this.outType[0]++;
        }else if(account[i].typeText==='零食'){
          this.outType[1]++;
        }else if(account[i].typeText==='汽车加油'){
          this.outType[2]++;
        }else if(account[i].typeText==='旅游'){
          this.outType[3]++;
        }else if(account[i].typeText==='娱乐'){
          this.outType[4]++;
        }else if(account[i].typeText==='宠物'){
          this.outType[5]++;
        }
      }
      else{
        this.today_income +=account[i].amount;
        this.inC++;
        if(account[i].typeText==='工作收入'){
          this.inType[0]++;
        }else if(account[i].typeText==='投资'){
          this.inType[1]++;
        }
      }
    }
    this.today_earning=this.today_income-this.today_outcome;
  }

  accept(isInsert: boolean, newAccount: AccountData): void {
    if (isInsert) {
      Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
      this.AccountTable.insertData(newAccount, (id: number) => {
        newAccount.id = id;
        this.accounts.push(newAccount);

        if(newAccount!=null){
          if(newAccount.accountType===0){
            this.today_outcome+=this.newAccount.amount;
            this.outC++;
            if(newAccount.typeText==='吃饭'){
              this.outType[0]++;
            }else if(newAccount.typeText==='零食'){
              this.outType[1]++;
            }else if(newAccount.typeText==='汽车加油'){
              this.outType[2]++;
            }else if(newAccount.typeText==='旅游'){
              this.outType[3]++;
            }else if(newAccount.typeText==='娱乐'){
              this.outType[4]++;
            }else if(newAccount.typeText==='宠物'){
              this.outType[5]++;
            }}
          else {
            this.today_income+=this.newAccount.amount;
            this.inC++;
            if(newAccount.typeText==='工作收入'){
              this.inType[0]++;
            }else if(newAccount.typeText==='投资'){
              this.inType[1]++;
            }}
          this.today_earning=this.today_income-this.today_outcome;
        }
      });
    } else {
      if(newAccount.accountType===0) {
        this.today_outcome += this.newAccount.amount;
        this.outC++;
        if(newAccount.typeText==='吃饭'){
          this.outType[0]++;
        }else if(newAccount.typeText==='零食'){
          this.outType[1]++;
        }else if(newAccount.typeText==='汽车加油'){
          this.outType[2]++;
        }else if(newAccount.typeText==='旅游'){
          this.outType[3]++;
        }else if(newAccount.typeText==='娱乐'){
          this.outType[4]++;
        }else if(newAccount.typeText==='宠物'){
          this.outType[5]++;
        }
      }
      else {
        this.today_income += this.newAccount.amount;
        this.inC++;
        if(newAccount.typeText==='工作收入'){
          this.inType[0]++;
        }else if(newAccount.typeText==='投资'){
          this.inType[1]++;
        }
      }
      this.today_earning=this.today_income-this.today_outcome;
      this.AccountTable.updateData(newAccount, () => {
      });
      let list = this.accounts;
      this.accounts = [];
      list[this.index] = newAccount;
      this.accounts = list;
      this.index = -1;
    }
  }

  aboutToAppear() {
    this.AccountTable.getRdbStore(() => {
      this.AccountTable.query(0, (result: AccountData[]) => {
        this.accounts = result;
      }, true);
      this.cur_search_text='所有账单'
    });
  }
  //选择功能
  selectListItem(item: AccountData) {
    this.isInsert = false;
    this.index = this.accounts.indexOf(item);
    if(item.accountType===0){
      this.today_outcome-=item.amount;
      this.outC--;
      if(item.typeText==='吃饭'){
        this.outType[0]--;
      }else if(item.typeText==='零食'){
        this.outType[1]--;
      }else if(item.typeText==='汽车加油'){
        this.outType[2]--;
      }else if(item.typeText==='旅游'){
        this.outType[3]--;
      }else if(item.typeText==='娱乐'){
        this.outType[4]--;
      }else if(item.typeText==='宠物'){
        this.outType[5]--;
      }
    }
    else {
      this.today_income-=item.amount;
      this.inC--;
      if(item.typeText==='工作收入'){
        this.inType[0]--;
      }else if(item.typeText==='投资'){
        this.inType[1]--;
      }
    }
    this.today_earning=this.today_income-this.today_outcome;
    this.newAccount = {
      id: item.id,
      accountType: item.accountType,
      typeText: item.typeText,
      amount: item.amount,
      date: item.date,
      year: item.year,
      month: item.month,
      reminder:item.reminder,
    };
  }
  //删除功能
  deleteListItem() {
    for (let i = 0; i < this.deleteList.length; i++) {
      let index = this.accounts.indexOf(this.deleteList[i]);
      this.accounts.splice(index, 1);
      this.AccountTable.deleteData(this.deleteList[i], () => {
      });
    }
    this.deleteList = [];
    this.isEdit = false;
  }

  build() {
    Stack() {
      Column() {
        Row() {
          Text($r('app.string.MainAbility_label'))
            .height($r('app.float.component_size_SP'))
            .fontSize($r('app.float.font_size_L'))
            .margin({ left: $r('app.float.font_size_L') })
            .fontColor(Color.White)

          Text('查看统计')
            .height('25vp')
            .fontSize('24vp')
            .margin({right:'24vp'})
            .onClick(()=>{
              this.countController.open();
            })

        }
        .width(CommonConstants.FULL_WIDTH)
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })


        Column(){
          Row() {
            Text(this.cur_search_text)
              .height($r('app.float.component_size_SP'))
              .fontSize($r('app.float.font_size_L'))
              .margin({ left: $r('app.float.font_size_L') })
          }
          .width(CommonConstants.FULL_WIDTH)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })

          //年月周总结
          Row() {
            Text('支出: '+this.today_outcome+'    收入: '+this.today_income)
              .height($r('app.float.component_size_SP'))
              .fontSize($r('app.float.font_size_L'))
              .margin({ left: $r('app.float.font_size_L') })
          }
          .width(CommonConstants.FULL_WIDTH)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
          Row(){
            Button(){
              Text('所有账单')
                .fontSize(20)
            }
            .backgroundColor(this.isAll===1? 0x317aff:Color.Gray)
            .width('30%')
            .border({ width: 0.5 })
            .onClick(()=>{
              this.isAll=1
              this.isTime=0
              this.isType=0
              this.AccountTable.query(0, (result: AccountData[]) => {
                this.accounts = result;
              }, true);
            })

            Button(){
              Text('时间账单')
                .fontSize(20)
            }
            .backgroundColor(this.isTime===1? 0x317aff:Color.Gray)
            .width('30%')
            .border({ width: 0.5 })
            .onClick(()=>{
              this.isAll=0
              this.isTime=1
              this.isType=0
            })

            Button(){
              Text('类型账单')
                .fontSize(20)
            }
            .backgroundColor(this.isType===1? 0x317aff:Color.Gray)
            .width('30%')
            .border({ width: 0.5 })
            .onClick(()=>{
              this.isAll=0
              this.isTime=0
              this.isType=1
            })


          }
        }
        .backgroundImage($rawfile('background.png'),ImageRepeat.NoRepeat)
        .backgroundImageSize(ImageSize.Cover)
        //.border({ width: 1 })


        //搜索功能
        Row() {
          if(this.isAll){
            TextInput({
              placeholder: '输入金额',
            })
              .width('80%')
              .border({ width: 1 })
              .padding({ left: CommonConstants.MINIMUM_SIZE })
              .borderRadius(CommonConstants.MINIMUM_SIZE)
              .backgroundColor(Color.White)
              .type(InputType.Number)
              .onChange((value: string) => {
                this.searchValue = value;
              })
            Button() {
              Text('搜索')
                .fontSize(20)
            }
            .border({ width: 1 })
            .width('20%')
              .onClick(() => {
                if (this.searchValue === '') {
                    this.AccountTable.query(0, (result: AccountData[]) => {
                      this.accounts = result;
                      this.calculate(this.accounts);
                    }, true);
                } else {
                    this.AccountTable.query(Number(this.searchValue), (result: AccountData[]) => {
                      this.accounts = result;
                      this.calculate(this.accounts);
                    }, false);
                }
                this.calculate(this.accounts);
                this.cur_search_text='所有账单'
              })
          }
          // if(this.isTime) {
          //   TextInput({
          //     placeholder: '输入年份',
          //   })
          //     .width('80%')
          //     .padding({ left: CommonConstants.MINIMUM_SIZE })
          //     .borderRadius(CommonConstants.MINIMUM_SIZE)
          //     .backgroundColor(Color.White)
          //     .type(InputType.Number)
          //     .onChange((value: string) => {
          //       this.yearValue = value;
          //     })
          //
          //   Button() {
          //     Text('搜索')
          //       .fontSize(20)
          //   }
          //   .onClick(() => {
          //     if (this.yearValue === '') {
          //         this.AccountTable.query(0, (result: AccountData[]) => {
          //           this.accounts = result;
          //         }, true);
          //     } else {
          //         this.AccountTable.queryYear(String(this.yearValue), (result: AccountData[]) => {
          //           this.accounts = result;
          //         }, false);
          //     }
          //     this.cur_search_text = this.yearValue;
          //     this.calculate(this.accounts);
          //   })
          //   .width('20%')
          // }
          if(this.isTime){
            TextInput({
              placeholder: '输入年份',
            })
              .border({ width: 0.5 })
              .width('25%')
              .padding({ left: CommonConstants.MINIMUM_SIZE })
              .borderRadius(CommonConstants.MINIMUM_SIZE)
              .backgroundColor(Color.White)
              .type(InputType.Number)
              .onChange((value: string) => {
                this.yearValue = value;
              })
            TextInput({
              placeholder: '输入月份',
            })
              .border({ width: 0.5 })
              .width('30%')
              .padding({ left: CommonConstants.MINIMUM_SIZE })
              .borderRadius(CommonConstants.MINIMUM_SIZE)
              .backgroundColor(Color.White)
              .type(InputType.Number)
              .onChange((value: string) => {
                this.monthValue = value;
              })
            TextInput({
              placeholder: '输入日期',
            })
              .border({ width: 0.5 })
              .width('25%')
              .padding({ left: CommonConstants.MINIMUM_SIZE })
              .borderRadius(CommonConstants.MINIMUM_SIZE)
              .backgroundColor(Color.White)
              .type(InputType.Number)
              .onChange((value: string) => {
                this.dayValue = value;
              })

              Button(){
                Text('搜索')
                  .fontSize(20)
              }
              .border({ width: 1 })
              .onClick(()=>{
                if (this.yearValue === '') {
                    this.AccountTable.query(0, (result: AccountData[]) => {
                      this.accounts = result;
                      this.calculate(this.accounts);
                    }, true);
                } else if (this.monthValue === ''){
                  this.AccountTable.queryYear(String(this.yearValue), (result: AccountData[]) => {
                    this.accounts = result;
                    this.calculate(this.accounts);
                  }, false);
                }else if(this.dayValue===''){
                    this.AccountTable.queryMonth(String(this.yearValue), String(Number(this.monthValue)-1), (result: AccountData[]) => {
                      this.accounts = result;
                      this.calculate(this.accounts);
                    }, false);
                }else {
                  this.AccountTable.queryDay(String(this.yearValue)+'-'+String(Number(this.monthValue))+'-'+String(this.dayValue), (result: AccountData[]) => {
                    this.accounts = result;
                    this.calculate(this.accounts);
                  }, false);
                }
                this.cur_search_text='时间: '+this.yearValue+'-'+this.monthValue+'-'+this.dayValue;
                this.calculate(this.accounts);
              })
              .width('20%')

          }

          if(this.isType) {
            Row(){
              TextInput({
                placeholder: '输入类型',
              })
                .border({ width: 1 })
                .width('80%')
                .padding({ left: CommonConstants.MINIMUM_SIZE })
                .borderRadius(CommonConstants.MINIMUM_SIZE)
                .backgroundColor(Color.White)
                .onChange((value: string) => {
                  this.searchText = value;
                })

              Button() {
                Text('搜索')
                  .fontSize(20)
              }
              .border({ width: 1 })
              .onClick(() => {
                if (this.searchText === '') {
                  this.AccountTable.query(0, (result: AccountData[]) => {
                    this.accounts = result;
                    this.calculate(this.accounts);
                  }, true);
                } else {
                  this.AccountTable.queryType(String(this.searchText), (result: AccountData[]) => {
                    this.accounts = result;
                    this.calculate(this.accounts);
                  }, false);
                }
                this.cur_search_text = '类型或备注: '+this.searchText;
                this.calculate(this.accounts);
              })
              .width('20%')
            }

          }
        }
        .width(CommonConstants.FULL_WIDTH)
        .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
        .margin({ top: $r('app.float.edge_size_S'), bottom: $r('app.float.edge_size_S') })

        // Row(){
        //   Stack() {
        //     DataPanel({ values: this.outType, max: this.outC, type: DataPanelType.Circle }).width(168).height(168)
        //     Column() {
        //       Text('支出类型占比').fontSize(10).lineHeight(11.08).fontWeight(500).opacity(0.6).fontColor(Color.Red)
        //     }
        //   }
        //   Stack() {
        //     DataPanel({ values: this.inType, max: this.inC, type: DataPanelType.Circle }).width(168).height(168)
        //     Column() {
        //       Text('收入类型占比').fontSize(10).lineHeight(11.08).fontWeight(500).opacity(0.6).fontColor(Color.Blue)
        //     }
        //   }
        // }
        // Row(){
        //   Column() {
        //     DataPanel({ values: [1,1,1,1,1,1], max: 6, type: DataPanelType.Line }).width(168).height(10)
        //
        //     Text('吃饭  零食   加油   旅游   娱乐   宠物').fontSize(10).lineHeight(11.08).fontWeight(500).opacity(0.6).width(168)
        //
        //   }
        //   Column() {
        //     DataPanel({ values: [1,1], max: 2, type: DataPanelType.Line }).width(168).height(10)
        //
        //     Text('工作收入                投资').fontSize(10).lineHeight(11.08).fontWeight(500).opacity(0.6).width(168)
        //   }
        // }




        //收支信息
        Row() {
          List({ space: CommonConstants.FULL_SIZE }) {
            ForEach(this.accounts, (item: AccountData) => {
              ListItem() {
                Flex({direction: FlexDirection.Row, alignItems: ItemAlign.Center}) {
                  Row() {
                    Image(ImageList[item.typeText])
                      .width($r('app.float.component_size_M'))
                      .aspectRatio(CommonConstants.FULL_SIZE)
                      .margin({ right: $r('app.float.edge_size_MP') })

                    Column(){
                      Text(item.typeText)
                        .height($r('app.float.component_size_SM'))
                        .fontSize($r('app.float.font_size_M'))

                      Text(item.date)
                        .height('10vp')
                        .fontSize('10vp')
                    }

                    Text(item.reminder)
                      .height($r('app.float.component_size_SM'))
                      .fontSize('12vp')
                      .margin({ right: $r('app.float.edge_size_MP') })


                    Blank()
                      .layoutWeight(1)

                    Text(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString())
                      .fontSize($r('app.float.font_size_M'))
                      .fontColor(item.accountType === 0 ? $r('app.color.pay_color') : $r('app.color.main_color'))
                      .align(Alignment.End)
                      .flexGrow(CommonConstants.FULL_SIZE)



                  }
                  .height($r('app.float.component_size_LM'))
                  .width('100%')
                  .backgroundColor(0xFFFFFF)
                  .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
                  .onTouch((event: TouchEvent) => { // 触摸事件
                    // 根据触摸类型判断
                    switch (event.type) {
                      case TouchType.Down: // 触摸按下
                      // 记录按下的x轴坐标
                        this.downX = event.touches[0].x
                        break
                      case TouchType.Up: // 触摸抬起
                      // 触摸抬起，根据x轴总偏移量，判断是否打开删除
                        let xOffset = event.touches[0].x - this.downX
                      // 滑到目标x轴的位置
                        var toxOffset = 0
                      // 偏移量超过删除按钮一半且左滑，设置打开
                        if (Math.abs(xOffset) > vp2px(20) && xOffset < 0) {

                          this.isEdit = true
                        } else if (Math.abs(xOffset) > vp2px(20) && xOffset > 0) {
                          this.isEdit = false;
                        }
                      // 重置按下的x轴坐标
                        this.downX = 0
                        break
                    }
                  })

                  //删除按键
                  if (this.isEdit) {
                    Button({type: ButtonType.Normal}) {
                      Text("delete").fontSize(16)
                    }.width('20%').height($r('app.float.component_size_LM')).backgroundColor(Color.Red)
                    .onClick(() => {
                      if(item.accountType===0){
                        this.today_outcome-=item.amount;
                        this.outC--;
                        if(item.typeText==='吃饭'){
                          this.outType[0]--;
                        }else if(item.typeText==='零食'){
                          this.outType[1]--;
                        }else if(item.typeText==='汽车加油'){
                          this.outType[2]--;
                        }else if(item.typeText==='旅游'){
                          this.outType[3]--;
                        }else if(item.typeText==='娱乐'){
                          this.outType[4]--;
                        }else if(item.typeText==='宠物'){
                          this.outType[5]--;
                        }
                      }
                      else {
                        this.today_income-=item.amount;
                        this.inC--;
                        if(item.typeText==='工作收入'){
                          this.inType[0]--;
                        }else if(item.typeText==='投资'){
                          this.inType[1]--;
                        }
                      }
                      this.today_earning=this.today_income-this.today_outcome;
                      let index=this.deleteList.indexOf(item)
                      this.deleteList.splice(index,1)
                      this.deleteList.push(item)
                      this.deleteListItem();
                      this.isEdit = false
                    }).stateEffect(true)
                  }
                }

              }
              .width(CommonConstants.FULL_WIDTH)
              .height($r('app.float.component_size_LM'))
              .onClick(() => {
                this.selectListItem(item);
                this.dialogController.open();
              })
            })
          }
          .width(CommonConstants.FULL_WIDTH)
          .borderRadius($r('app.float.radius_size_L'))
          //.backgroundColor(Color.White)
        }
        .width(CommonConstants.FULL_WIDTH)
        .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
        .margin({ top: $r('app.float.edge_size_SM') })


      }
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_HEIGHT)

      //不是编辑界面显示加号可添加收支
      if (!this.isEdit) {
        Button() {
          Image($rawfile('add.png'))
        }
        .width($r('app.float.component_size_MP'))
        .height($r('app.float.component_size_MP'))
        .position({ x: CommonConstants.EDIT_POSITION_X, y: CommonConstants.EDIT_POSITION_Y })
        .onClick(() => {
          this.isInsert = true;
          this.newAccount = { id: 0, accountType : 0, typeText : '', amount: 0, date :'', year :'', month :'', reminder:''};
          this.dialogController.open();
        })
      }

    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    //.backgroundColor($r('app.color.background_color'))
    .backgroundImage($rawfile('back.jpg'),ImageRepeat.NoRepeat)
    .backgroundImageSize(ImageSize.Cover)
  }
}