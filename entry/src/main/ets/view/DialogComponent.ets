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

import prompt from '@ohos.promptAction';
import AccountData from '../../../../../../Rdb/entry/src/main/ets/viewmodel/AccountData';
import AccountItem from '../../../../../../Rdb/entry/src/main/ets/viewmodel/AccountItem';
import CommonConstants from '../../../../../../Rdb/entry/src/main/ets/common/constants/CommonConstants';
import { PayList, EarnList } from '../../../../../../Rdb/entry/src/main/ets/viewmodel/AccountList';

@CustomDialog
export struct DialogComponent {
  controller?: CustomDialogController;
  @Link isInsert: boolean;
  @Link newAccount: AccountData;
  confirm?: (isInsert: boolean, newAccount: AccountData) => void;
  private scroller: Scroller = new Scroller();
  private inputAmount = '';
  private inputReminder='';
  selected_date: Date;

  @State payList: Array<AccountItem> = PayList;
  @State earnList: Array<AccountItem> = EarnList;
  @State bgColor: string = '';
  @State curIndex: number = 0;
  @State curType: string = '';
  @State curYear: string = '';
  @State curMonth: string = '';
  @State curDate: string = '';
  @State curReminder: string = '';

  @Builder
  TabBuilder(index: number) {
    Column() {
      Text(index === 0 ? $r('app.string.pay_text') : $r('app.string.income_text'))
        .fontSize($r('app.float.font_size_M'))
        .fontColor(this.curIndex === index ? $r('app.color.main_color') : Color.Gray)
    }
    .width($r('app.float.component_size_MP'))
    .padding({ top: $r('app.float.edge_size_LM'), bottom: $r('app.float.edge_size_S') })
    .margin({ bottom: $r('app.float.edge_size_S') })
    .border(this.curIndex === index ? {
                                        width: { bottom: $r('app.float.border_size_M') },
                                        color: $r('app.color.main_color')
                                      } : { color: Color.White })
  }

  aboutToAppear() {
    this.inputAmount = this.newAccount.amount.toString();
    this.curIndex = this.newAccount.accountType;
    this.curType = this.newAccount.typeText;
    this.curDate = this.newAccount.date;
    this.curYear = this.newAccount.year;
    this.curMonth = this.newAccount.month;
    this.curReminder=this.newAccount.reminder;
  }

  selectAccount(item: AccountItem) {
    this.newAccount.accountType = item.accountType;
    this.newAccount.typeText = item.typeText;
    this.curType = item.typeText;
  }

  build() {
    Column() {
      Image($rawfile('half.png'))
        .width($r('app.float.component_size_L'))
        .height($r('app.float.component_size_S'))
        .onClick(() => {
          this.controller?.close();
        })

      Tabs({ barPosition: BarPosition.Start, index: this.curIndex }) {
        TabContent() {
          Scroll(this.scroller) {
            Row() {
              ForEach(this.payList, (item: AccountItem) => {
                Column() {
                  Image(this.curType === item.typeText ? item.iconSelected : item.icon)
                    .width($r('app.float.image_size'))
                    .aspectRatio(CommonConstants.FULL_SIZE)

                  Text(item.typeText)
                    .fontSize($r('app.float.font_size_S'))
                    .fontColor(this.curType === item.typeText ? Color.White : $r('app.color.main_color'))
                    .margin({ top: $r('app.float.edge_size_S') })
                }
                .width($r('app.float.component_size_LP'))
                .aspectRatio(CommonConstants.FULL_SIZE)
                .padding({ top: $r('app.float.edge_size_M') })
                .margin({ top: $r('app.float.edge_size_MP'), left: $r('app.float.edge_size_M') })
                .align(Alignment.TopStart)
                .backgroundColor(this.curType === item.typeText ? $r('app.color.main_color') : $r('app.color.background_color'))
                .borderRadius($r('app.float.radius_size_S'))
                .onClick(() => {
                  this.selectAccount(item);
                })
              })
            }
          }
          .scrollable(ScrollDirection.Horizontal)
          .scrollBar(BarState.Off)
        }
        .tabBar(this.TabBuilder(0))
        .margin({ bottom: $r('app.float.edge_size_LP') })

        TabContent() {
          Scroll(this.scroller) {
            Row() {
              ForEach(this.earnList, (item: AccountItem) => {
                Column() {
                  Image(this.curType === item.typeText ? item.iconSelected : item.icon)
                    .width($r('app.float.image_size'))
                    .aspectRatio(CommonConstants.FULL_SIZE)

                  Text(item.typeText)
                    .fontSize($r('app.float.font_size_S'))
                    .fontColor(this.curType === item.typeText ? Color.White : $r('app.color.main_color'))
                    .margin({ top: $r('app.float.edge_size_S') })
                }
                .width($r('app.float.component_size_LP'))
                .aspectRatio(CommonConstants.FULL_SIZE)
                .padding({ top: $r('app.float.edge_size_M') })
                .margin({ top: $r('app.float.edge_size_MP'), left: $r('app.float.edge_size_M') })
                .align(Alignment.TopStart)
                .backgroundColor(this.curType === item.typeText ? $r('app.color.main_color') : $r('app.color.background_color'))
                .borderRadius($r('app.float.radius_size_S'))
                .onClick(() => {
                  this.selectAccount(item);
                })
              })
            }
          }
          .scrollable(ScrollDirection.Horizontal)
          .scrollBar(BarState.Off)
        }
        .tabBar(this.TabBuilder(1))
        .margin({ bottom: $r('app.float.edge_size_LP') })
      }
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.TABS_HEIGHT)
      .vertical(false)
      .barMode(BarMode.Fixed)
      .onChange((index) => {
        this.curIndex = index;
      })

      //金额输入
      Column() {
        Text($r('app.string.count_text'))
          .width(CommonConstants.FULL_WIDTH)
          .fontSize($r('app.float.font_size_MP'))
          .fontColor(Color.Black)

        Column() {
          TextInput({
            placeholder: $r('app.string.input_text'),
            text: this.newAccount.amount === 0 ? this.inputAmount : this.newAccount.amount.toString()
          })
            .padding({ left: CommonConstants.MINIMUM_SIZE })
            .borderRadius(CommonConstants.MINIMUM_SIZE)
            .backgroundColor(Color.White)
            .type(InputType.Number)
            .onChange((value: string) => {
              this.inputAmount = value;
            })
        }
        .height($r('app.float.component_size_MP'))
        .padding({ top: $r('app.float.edge_size_MPM'), bottom: $r('app.float.edge_size_MM') })
        .borderWidth({ bottom: CommonConstants.FULL_SIZE })
        .borderColor($r('app.color.border_color'))
      }
      .width(CommonConstants.FULL_WIDTH)
      .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })

      //时间选择
      Column() {
        Text('时间')
          .width(CommonConstants.FULL_WIDTH)
          .fontSize($r('app.float.font_size_MP'))
          .fontColor(Color.Black)
        Column() {
          Text(this.newAccount.date===''? '请选择日期':this.newAccount.date)
            .width(CommonConstants.FULL_WIDTH)
            .fontSize($r('app.float.font_size_MP'))
            .fontColor(Color.Black)
            .onClick(()=>{
              let cur_date=new Date()
              this.selected_date=cur_date
              DatePickerDialog.show({
                // 开始时间
                start: new Date('2000-1-1'),
                // 结束时间
                end: new Date('2050-12-31'),
                // 当前选中时间
                selected: this.selected_date,
                onAccept: (value: DatePickerResult) => {
                  this.selected_date.setFullYear(value.year,value.month,value.day)
                  this.newAccount.date=value.year.toString()+'-'+(value.month+1).toString()+'-'+value.day.toString()
                  this.newAccount.year=value.year.toString()
                  this.newAccount.month=value.month.toString()
                }
              })
            })
        }
        .height($r('app.float.component_size_MP'))
        .padding({ top: $r('app.float.edge_size_MPM'), bottom: $r('app.float.edge_size_MM') })
        .borderWidth({ bottom: CommonConstants.FULL_SIZE })
        .borderColor($r('app.color.border_color'))
      }
      .width(CommonConstants.FULL_WIDTH)
      .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })

      Column() {
        Text('备注')
          .width(CommonConstants.FULL_WIDTH)
          .fontSize($r('app.float.font_size_MP'))
          .fontColor(Color.Black)

        Column() {
          TextInput({
            placeholder: '请输入备注',
            text: this.newAccount.reminder === '' ? this.inputReminder : this.newAccount.reminder
          })
            .padding({ left: CommonConstants.MINIMUM_SIZE })
            .borderRadius(CommonConstants.MINIMUM_SIZE)
            .backgroundColor(Color.White)
            .onChange((value: string) => {
              this.inputReminder = value;
            })
        }
        .height($r('app.float.component_size_MP'))
        .padding({ top: $r('app.float.edge_size_MPM'), bottom: $r('app.float.edge_size_MM') })
        .borderWidth({ bottom: CommonConstants.FULL_SIZE })
        .borderColor($r('app.color.border_color'))
      }
      .width(CommonConstants.FULL_WIDTH)
      .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })


      Column() {
        Button() {
          Text($r('app.string.confirm_text'))
            .fontSize($r('app.float.font_size_M'))
            .fontColor(Color.White)
        }
        .width(CommonConstants.FULL_WIDTH)
        .height($r('app.float.component_size_M'))
        .onClick(() => {
          if (this.newAccount.typeText === '' || this.curIndex !== this.newAccount.accountType) {
            prompt.showToast({ message: CommonConstants.TOAST_TEXT_1, bottom: CommonConstants.PROMPT_BOTTOM });
          } else {
            let regex: RegExp = new RegExp('[1-9][0-9]*');
            let matchValue: Array<string> | null = this.inputAmount.match(regex);
            if (matchValue !== null && matchValue[0] === this.inputAmount) {
              this.newAccount.amount = Number(this.inputAmount);
              this.newAccount.reminder = this.inputReminder;
              this.confirm && this.confirm(this.isInsert, this.newAccount);
              this.controller?.close();
            } else {
              prompt.showToast({ message: CommonConstants.TOAST_TEXT_2, bottom: CommonConstants.PROMPT_BOTTOM });
            }
          }
        })
      }
      .layoutWeight(CommonConstants.FULL_SIZE)
      .padding({
        bottom: $r('app.float.font_size_L'),
        left: $r('app.float.font_size_L'),
        right: $r('app.float.font_size_L')
      })
      .justifyContent(FlexAlign.End)
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
    .backgroundColor(Color.White)
    .align(Alignment.BottomEnd)
  }
}