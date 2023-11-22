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

import CommonConstants from '../../../../../../Rdb/entry/src/main/ets/common/constants/CommonConstants';

@CustomDialog
export struct countCom {
  controller?: CustomDialogController;
  @Link inType: number[];
  @Link outType: number[];
  @Link inC:number;
  @Link outC:number;

  build() {
    Column() {
      Image($rawfile('half.png'))
        .width($r('app.float.component_size_L'))
        .height($r('app.float.component_size_S'))
        .onClick(() => {
          this.controller?.close();
        })
      Text('收入支出类型占比')
        .height($r('app.float.component_size_SP'))
        .fontSize($r('app.float.font_size_L'))

      Row(){
        Stack() {
          DataPanel({ values: this.outType, max: this.outC, type: DataPanelType.Circle }).width(168).height(168)
          Column() {
            Text('支出类型占比').fontSize(10).lineHeight(11.08).fontWeight(500).opacity(0.6).fontColor(Color.Red)
          }
        }
        Stack() {
          DataPanel({ values: this.inType, max: this.inC, type: DataPanelType.Circle }).width(168).height(168)
          Column() {
            Text('收入类型占比').fontSize(10).lineHeight(11.08).fontWeight(500).opacity(0.6).fontColor(Color.Blue)
          }
        }
      }
      Row(){
        Column() {
          DataPanel({ values: [1,1,1,1,1,1], max: 6, type: DataPanelType.Line }).width(168).height(10)

          Text('吃饭  零食   加油   旅游   娱乐   宠物').fontSize(10).lineHeight(11.08).fontWeight(500).opacity(0.6).width(168)

        }
        Column() {
          DataPanel({ values: [1,1], max: 2, type: DataPanelType.Line }).width(168).height(10)

          Text('工作收入                投资').fontSize(10).lineHeight(11.08).fontWeight(500).opacity(0.6).width(168)
        }
      }

      Column() {
        Button() {
          Text($r('app.string.confirm_text'))
            .fontSize($r('app.float.font_size_M'))
            .fontColor(Color.White)
        }
        .width(CommonConstants.FULL_WIDTH)
        .height($r('app.float.component_size_M'))
        .onClick(() => {
              this.controller?.close();
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
    .height(CommonConstants.DIALOG_HEIGHT)
    .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
    .backgroundColor(Color.White)
    .align(Alignment.BottomEnd)
  }
}