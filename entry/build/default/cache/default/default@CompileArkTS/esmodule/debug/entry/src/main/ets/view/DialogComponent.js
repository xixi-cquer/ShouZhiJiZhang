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
import prompt from '@ohos:promptAction';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { PayList, EarnList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
export class DialogComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = undefined;
        this.__isInsert = new SynchedPropertySimpleTwoWayPU(params.isInsert, this, "isInsert");
        this.__newAccount = new SynchedPropertyObjectTwoWayPU(params.newAccount, this, "newAccount");
        this.confirm = undefined;
        this.scroller = new Scroller();
        this.inputAmount = '';
        this.inputReminder = '';
        this.selected_date = undefined;
        this.__payList = new ObservedPropertyObjectPU(PayList, this, "payList");
        this.__earnList = new ObservedPropertyObjectPU(EarnList, this, "earnList");
        this.__bgColor = new ObservedPropertySimplePU('', this, "bgColor");
        this.__curIndex = new ObservedPropertySimplePU(0, this, "curIndex");
        this.__curType = new ObservedPropertySimplePU('', this, "curType");
        this.__curYear = new ObservedPropertySimplePU('', this, "curYear");
        this.__curMonth = new ObservedPropertySimplePU('', this, "curMonth");
        this.__curDate = new ObservedPropertySimplePU('', this, "curDate");
        this.__curReminder = new ObservedPropertySimplePU('', this, "curReminder");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.inputAmount !== undefined) {
            this.inputAmount = params.inputAmount;
        }
        if (params.inputReminder !== undefined) {
            this.inputReminder = params.inputReminder;
        }
        if (params.selected_date !== undefined) {
            this.selected_date = params.selected_date;
        }
        if (params.payList !== undefined) {
            this.payList = params.payList;
        }
        if (params.earnList !== undefined) {
            this.earnList = params.earnList;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.curIndex !== undefined) {
            this.curIndex = params.curIndex;
        }
        if (params.curType !== undefined) {
            this.curType = params.curType;
        }
        if (params.curYear !== undefined) {
            this.curYear = params.curYear;
        }
        if (params.curMonth !== undefined) {
            this.curMonth = params.curMonth;
        }
        if (params.curDate !== undefined) {
            this.curDate = params.curDate;
        }
        if (params.curReminder !== undefined) {
            this.curReminder = params.curReminder;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__payList.purgeDependencyOnElmtId(rmElmtId);
        this.__earnList.purgeDependencyOnElmtId(rmElmtId);
        this.__bgColor.purgeDependencyOnElmtId(rmElmtId);
        this.__curIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__curType.purgeDependencyOnElmtId(rmElmtId);
        this.__curYear.purgeDependencyOnElmtId(rmElmtId);
        this.__curMonth.purgeDependencyOnElmtId(rmElmtId);
        this.__curDate.purgeDependencyOnElmtId(rmElmtId);
        this.__curReminder.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__payList.aboutToBeDeleted();
        this.__earnList.aboutToBeDeleted();
        this.__bgColor.aboutToBeDeleted();
        this.__curIndex.aboutToBeDeleted();
        this.__curType.aboutToBeDeleted();
        this.__curYear.aboutToBeDeleted();
        this.__curMonth.aboutToBeDeleted();
        this.__curDate.aboutToBeDeleted();
        this.__curReminder.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    setController(ctr) {
        this.controller = ctr;
    }
    get isInsert() {
        return this.__isInsert.get();
    }
    set isInsert(newValue) {
        this.__isInsert.set(newValue);
    }
    get newAccount() {
        return this.__newAccount.get();
    }
    set newAccount(newValue) {
        this.__newAccount.set(newValue);
    }
    get payList() {
        return this.__payList.get();
    }
    set payList(newValue) {
        this.__payList.set(newValue);
    }
    get earnList() {
        return this.__earnList.get();
    }
    set earnList(newValue) {
        this.__earnList.set(newValue);
    }
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue) {
        this.__bgColor.set(newValue);
    }
    get curIndex() {
        return this.__curIndex.get();
    }
    set curIndex(newValue) {
        this.__curIndex.set(newValue);
    }
    get curType() {
        return this.__curType.get();
    }
    set curType(newValue) {
        this.__curType.set(newValue);
    }
    get curYear() {
        return this.__curYear.get();
    }
    set curYear(newValue) {
        this.__curYear.set(newValue);
    }
    get curMonth() {
        return this.__curMonth.get();
    }
    set curMonth(newValue) {
        this.__curMonth.set(newValue);
    }
    get curDate() {
        return this.__curDate.get();
    }
    set curDate(newValue) {
        this.__curDate.set(newValue);
    }
    get curReminder() {
        return this.__curReminder.get();
    }
    set curReminder(newValue) {
        this.__curReminder.set(newValue);
    }
    TabBuilder(index, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.margin({ bottom: { "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.border(this.curIndex === index ? {
                width: { bottom: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } },
                color: { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            } : { color: Color.White });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(index === 0 ? { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(this.curIndex === index ? { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : Color.Gray);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.inputAmount = this.newAccount.amount.toString();
        this.curIndex = this.newAccount.accountType;
        this.curType = this.newAccount.typeText;
        this.curDate = this.newAccount.date;
        this.curYear = this.newAccount.year;
        this.curMonth = this.newAccount.month;
        this.curReminder = this.newAccount.reminder;
    }
    selectAccount(item) {
        this.newAccount.accountType = item.accountType;
        this.newAccount.typeText = item.typeText;
        this.curType = item.typeText;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height(CommonConstants.FULL_HEIGHT);
            Column.borderRadius({ topLeft: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, topRight: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.backgroundColor(Color.White);
            Column.align(Alignment.BottomEnd);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['half.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.width({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.height({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.onClick(() => {
                var _a;
                (_a = this.controller) === null || _a === void 0 ? void 0 : _a.close();
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Tabs.create({ barPosition: BarPosition.Start, index: this.curIndex });
            Tabs.width(CommonConstants.FULL_WIDTH);
            Tabs.height(CommonConstants.TABS_HEIGHT);
            Tabs.vertical(false);
            Tabs.barMode(BarMode.Fixed);
            Tabs.onChange((index) => {
                this.curIndex = index;
            });
            if (!isInitialRender) {
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Scroll.create(this.scroller);
                    Scroll.scrollable(ScrollDirection.Horizontal);
                    Scroll.scrollBar(BarState.Off);
                    if (!isInitialRender) {
                        Scroll.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.width({ "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.aspectRatio(CommonConstants.FULL_SIZE);
                            Column.padding({ top: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.margin({ top: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.align(Alignment.TopStart);
                            Column.backgroundColor(this.curType === item.typeText ? { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.onClick(() => {
                                this.selectAccount(item);
                            });
                            if (!isInitialRender) {
                                Column.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(this.curType === item.typeText ? item.iconSelected : item.icon);
                            Image.width({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.fontSize({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.margin({ top: { "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.payList, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                Row.pop();
                Scroll.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, 0);
                } });
            TabContent.margin({ bottom: { "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Scroll.create(this.scroller);
                    Scroll.scrollable(ScrollDirection.Horizontal);
                    Scroll.scrollBar(BarState.Off);
                    if (!isInitialRender) {
                        Scroll.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.width({ "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.aspectRatio(CommonConstants.FULL_SIZE);
                            Column.padding({ top: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.margin({ top: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.align(Alignment.TopStart);
                            Column.backgroundColor(this.curType === item.typeText ? { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.onClick(() => {
                                this.selectAccount(item);
                            });
                            if (!isInitialRender) {
                                Column.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(this.curType === item.typeText ? item.iconSelected : item.icon);
                            Image.width({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.fontSize({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.margin({ top: { "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.earnList, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                Row.pop();
                Scroll.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, 1);
                } });
            TabContent.margin({ bottom: { "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        Tabs.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //金额输入
            Column.create();
            //金额输入
            Column.width(CommonConstants.FULL_WIDTH);
            //金额输入
            Column.padding({ left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                //金额输入
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.width(CommonConstants.FULL_WIDTH);
            Text.fontSize({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.borderWidth({ bottom: CommonConstants.FULL_SIZE });
            Column.borderColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({
                placeholder: { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                text: this.newAccount.amount === 0 ? this.inputAmount : this.newAccount.amount.toString()
            });
            TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
            TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
            TextInput.backgroundColor(Color.White);
            TextInput.type(InputType.Number);
            TextInput.onChange((value) => {
                this.inputAmount = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        //金额输入
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //时间选择
            Column.create();
            //时间选择
            Column.width(CommonConstants.FULL_WIDTH);
            //时间选择
            Column.padding({ left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                //时间选择
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('时间');
            Text.width(CommonConstants.FULL_WIDTH);
            Text.fontSize({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.borderWidth({ bottom: CommonConstants.FULL_SIZE });
            Column.borderColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.newAccount.date === '' ? '请选择日期' : this.newAccount.date);
            Text.width(CommonConstants.FULL_WIDTH);
            Text.fontSize({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.onClick(() => {
                let cur_date = new Date();
                this.selected_date = cur_date;
                DatePickerDialog.show({
                    // 开始时间
                    start: new Date('2000-1-1'),
                    // 结束时间
                    end: new Date('2050-12-31'),
                    // 当前选中时间
                    selected: this.selected_date,
                    onAccept: (value) => {
                        this.selected_date.setFullYear(value.year, value.month, value.day);
                        this.newAccount.date = value.year.toString() + '-' + (value.month + 1).toString() + '-' + value.day.toString();
                        this.newAccount.year = value.year.toString();
                        this.newAccount.month = value.month.toString();
                    }
                });
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        //时间选择
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(CommonConstants.FULL_WIDTH);
            Column.padding({ left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('备注');
            Text.width(CommonConstants.FULL_WIDTH);
            Text.fontSize({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.borderWidth({ bottom: CommonConstants.FULL_SIZE });
            Column.borderColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({
                placeholder: '请输入备注',
                text: this.newAccount.reminder === '' ? this.inputReminder : this.newAccount.reminder
            });
            TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
            TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
            TextInput.backgroundColor(Color.White);
            TextInput.onChange((value) => {
                this.inputReminder = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.layoutWeight(CommonConstants.FULL_SIZE);
            Column.padding({
                bottom: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                left: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                right: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            });
            Column.justifyContent(FlexAlign.End);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.width(CommonConstants.FULL_WIDTH);
            Button.height({ "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.onClick(() => {
                var _a;
                if (this.newAccount.typeText === '' || this.curIndex !== this.newAccount.accountType) {
                    prompt.showToast({ message: CommonConstants.TOAST_TEXT_1, bottom: CommonConstants.PROMPT_BOTTOM });
                }
                else {
                    let regex = new RegExp('[1-9][0-9]*');
                    let matchValue = this.inputAmount.match(regex);
                    if (matchValue !== null && matchValue[0] === this.inputAmount) {
                        this.newAccount.amount = Number(this.inputAmount);
                        this.newAccount.reminder = this.inputReminder;
                        this.confirm && this.confirm(this.isInsert, ObservedObject.GetRawObject(this.newAccount));
                        (_a = this.controller) === null || _a === void 0 ? void 0 : _a.close();
                    }
                    else {
                        prompt.showToast({ message: CommonConstants.TOAST_TEXT_2, bottom: CommonConstants.PROMPT_BOTTOM });
                    }
                }
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.White);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=DialogComponent.js.map