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
import AccountTable from '@bundle:com.example.rdb/entry/ets/common/database/tables/AccountTable';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { DialogComponent } from '@bundle:com.example.rdb/entry/ets/view/DialogComponent';
import { ImageList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import Logger from '@bundle:com.example.rdb/entry/ets/common/utils/Logger';
import { countCom } from '@bundle:com.example.rdb/entry/ets/view/countCom';
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__accounts = new ObservedPropertyObjectPU([], this, "accounts");
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__isEdit = new ObservedPropertySimplePU(false, this, "isEdit");
        this.__isInsert = new ObservedPropertySimplePU(false, this, "isInsert");
        this.__newAccount = new ObservedPropertyObjectPU({
            id: 0,
            accountType: 0,
            typeText: '',
            amount: 0,
            date: '',
            year: '',
            month: '',
            reminder: '',
        }, this, "newAccount");
        this.__index = new ObservedPropertySimplePU(-1, this, "index");
        this.__isTested = new ObservedPropertySimplePU(false, this, "isTested");
        this.__yearValue = new ObservedPropertySimplePU('', this, "yearValue");
        this.__monthValue = new ObservedPropertySimplePU('', this, "monthValue");
        this.__dayValue = new ObservedPropertySimplePU('', this, "dayValue");
        this.__searchValue = new ObservedPropertySimplePU('', this, "searchValue");
        this.__submitValue = new ObservedPropertySimplePU('', this, "submitValue");
        this.__cur_search_text = new ObservedPropertySimplePU('', this, "cur_search_text");
        this.__today_income = new ObservedPropertySimplePU(0, this, "today_income");
        this.__today_outcome = new ObservedPropertySimplePU(0, this, "today_outcome");
        this.__today_earning = new ObservedPropertySimplePU(0, this, "today_earning");
        this.__isAll = new ObservedPropertySimplePU(1, this, "isAll");
        this.__isTime = new ObservedPropertySimplePU(0, this, "isTime");
        this.__isType = new ObservedPropertySimplePU(0, this, "isType");
        this.__outType = new ObservedPropertyObjectPU([0, 0, 0, 0, 0, 0], this, "outType");
        this.__inType = new ObservedPropertyObjectPU([0, 0], this, "inType");
        this.__inC = new ObservedPropertySimplePU(0, this, "inC");
        this.__outC = new ObservedPropertySimplePU(0, this, "outC");
        this.downX = 0;
        this.AccountTable = new AccountTable(() => { });
        this.deleteList = [];
        this.searchController = new SearchController();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new DialogComponent(this, {
                    isInsert: this.__isInsert,
                    newAccount: this.__newAccount,
                    confirm: (isInsert, newAccount) => this.accept(isInsert, newAccount)
                });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.countController = new CustomDialogController({
            builder: () => {
                let jsDialog = new countCom(this, {
                    inType: this.__inType,
                    outType: this.__outType,
                    inC: this.__inC,
                    outC: this.__outC,
                });
                jsDialog.setController(this.countController);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.accounts !== undefined) {
            this.accounts = params.accounts;
        }
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.isEdit !== undefined) {
            this.isEdit = params.isEdit;
        }
        if (params.isInsert !== undefined) {
            this.isInsert = params.isInsert;
        }
        if (params.newAccount !== undefined) {
            this.newAccount = params.newAccount;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.isTested !== undefined) {
            this.isTested = params.isTested;
        }
        if (params.yearValue !== undefined) {
            this.yearValue = params.yearValue;
        }
        if (params.monthValue !== undefined) {
            this.monthValue = params.monthValue;
        }
        if (params.dayValue !== undefined) {
            this.dayValue = params.dayValue;
        }
        if (params.searchValue !== undefined) {
            this.searchValue = params.searchValue;
        }
        if (params.submitValue !== undefined) {
            this.submitValue = params.submitValue;
        }
        if (params.cur_search_text !== undefined) {
            this.cur_search_text = params.cur_search_text;
        }
        if (params.today_income !== undefined) {
            this.today_income = params.today_income;
        }
        if (params.today_outcome !== undefined) {
            this.today_outcome = params.today_outcome;
        }
        if (params.today_earning !== undefined) {
            this.today_earning = params.today_earning;
        }
        if (params.isAll !== undefined) {
            this.isAll = params.isAll;
        }
        if (params.isTime !== undefined) {
            this.isTime = params.isTime;
        }
        if (params.isType !== undefined) {
            this.isType = params.isType;
        }
        if (params.outType !== undefined) {
            this.outType = params.outType;
        }
        if (params.inType !== undefined) {
            this.inType = params.inType;
        }
        if (params.inC !== undefined) {
            this.inC = params.inC;
        }
        if (params.outC !== undefined) {
            this.outC = params.outC;
        }
        if (params.downX !== undefined) {
            this.downX = params.downX;
        }
        if (params.AccountTable !== undefined) {
            this.AccountTable = params.AccountTable;
        }
        if (params.deleteList !== undefined) {
            this.deleteList = params.deleteList;
        }
        if (params.searchController !== undefined) {
            this.searchController = params.searchController;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.countController !== undefined) {
            this.countController = params.countController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__accounts.purgeDependencyOnElmtId(rmElmtId);
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__isEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__isTested.purgeDependencyOnElmtId(rmElmtId);
        this.__yearValue.purgeDependencyOnElmtId(rmElmtId);
        this.__monthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__dayValue.purgeDependencyOnElmtId(rmElmtId);
        this.__searchValue.purgeDependencyOnElmtId(rmElmtId);
        this.__submitValue.purgeDependencyOnElmtId(rmElmtId);
        this.__cur_search_text.purgeDependencyOnElmtId(rmElmtId);
        this.__today_income.purgeDependencyOnElmtId(rmElmtId);
        this.__today_outcome.purgeDependencyOnElmtId(rmElmtId);
        this.__today_earning.purgeDependencyOnElmtId(rmElmtId);
        this.__isAll.purgeDependencyOnElmtId(rmElmtId);
        this.__isTime.purgeDependencyOnElmtId(rmElmtId);
        this.__isType.purgeDependencyOnElmtId(rmElmtId);
        this.__outType.purgeDependencyOnElmtId(rmElmtId);
        this.__inType.purgeDependencyOnElmtId(rmElmtId);
        this.__inC.purgeDependencyOnElmtId(rmElmtId);
        this.__outC.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__accounts.aboutToBeDeleted();
        this.__searchText.aboutToBeDeleted();
        this.__isEdit.aboutToBeDeleted();
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__isTested.aboutToBeDeleted();
        this.__yearValue.aboutToBeDeleted();
        this.__monthValue.aboutToBeDeleted();
        this.__dayValue.aboutToBeDeleted();
        this.__searchValue.aboutToBeDeleted();
        this.__submitValue.aboutToBeDeleted();
        this.__cur_search_text.aboutToBeDeleted();
        this.__today_income.aboutToBeDeleted();
        this.__today_outcome.aboutToBeDeleted();
        this.__today_earning.aboutToBeDeleted();
        this.__isAll.aboutToBeDeleted();
        this.__isTime.aboutToBeDeleted();
        this.__isType.aboutToBeDeleted();
        this.__outType.aboutToBeDeleted();
        this.__inType.aboutToBeDeleted();
        this.__inC.aboutToBeDeleted();
        this.__outC.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get accounts() {
        return this.__accounts.get();
    }
    set accounts(newValue) {
        this.__accounts.set(newValue);
    }
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue) {
        this.__searchText.set(newValue);
    }
    get isEdit() {
        return this.__isEdit.get();
    }
    set isEdit(newValue) {
        this.__isEdit.set(newValue);
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
    get index() {
        return this.__index.get();
    }
    set index(newValue) {
        this.__index.set(newValue);
    }
    get isTested() {
        return this.__isTested.get();
    }
    set isTested(newValue) {
        this.__isTested.set(newValue);
    }
    get yearValue() {
        return this.__yearValue.get();
    }
    set yearValue(newValue) {
        this.__yearValue.set(newValue);
    }
    get monthValue() {
        return this.__monthValue.get();
    }
    set monthValue(newValue) {
        this.__monthValue.set(newValue);
    }
    get dayValue() {
        return this.__dayValue.get();
    }
    set dayValue(newValue) {
        this.__dayValue.set(newValue);
    }
    get searchValue() {
        return this.__searchValue.get();
    }
    set searchValue(newValue) {
        this.__searchValue.set(newValue);
    }
    get submitValue() {
        return this.__submitValue.get();
    }
    set submitValue(newValue) {
        this.__submitValue.set(newValue);
    }
    get cur_search_text() {
        return this.__cur_search_text.get();
    }
    set cur_search_text(newValue) {
        this.__cur_search_text.set(newValue);
    }
    get today_income() {
        return this.__today_income.get();
    }
    set today_income(newValue) {
        this.__today_income.set(newValue);
    }
    get today_outcome() {
        return this.__today_outcome.get();
    }
    set today_outcome(newValue) {
        this.__today_outcome.set(newValue);
    }
    get today_earning() {
        return this.__today_earning.get();
    }
    set today_earning(newValue) {
        this.__today_earning.set(newValue);
    }
    get isAll() {
        return this.__isAll.get();
    }
    set isAll(newValue) {
        this.__isAll.set(newValue);
    }
    get isTime() {
        return this.__isTime.get();
    }
    set isTime(newValue) {
        this.__isTime.set(newValue);
    }
    get isType() {
        return this.__isType.get();
    }
    set isType(newValue) {
        this.__isType.set(newValue);
    }
    get outType() {
        return this.__outType.get();
    }
    set outType(newValue) {
        this.__outType.set(newValue);
    }
    get inType() {
        return this.__inType.get();
    }
    set inType(newValue) {
        this.__inType.set(newValue);
    }
    get inC() {
        return this.__inC.get();
    }
    set inC(newValue) {
        this.__inC.set(newValue);
    }
    get outC() {
        return this.__outC.get();
    }
    set outC(newValue) {
        this.__outC.set(newValue);
    }
    calculate(account) {
        this.today_income = 0;
        this.today_outcome = 0;
        this.today_earning = 0;
        this.outType = [0, 0, 0, 0, 0, 0];
        this.inType = [0, 0];
        this.inC = 0;
        this.outC = 0;
        for (let i = 0; i < account.length; i++) {
            if (account[i].accountType == 0) {
                this.today_outcome += account[i].amount;
                this.outC++;
                if (account[i].typeText === '吃饭') {
                    this.outType[0]++;
                }
                else if (account[i].typeText === '零食') {
                    this.outType[1]++;
                }
                else if (account[i].typeText === '汽车加油') {
                    this.outType[2]++;
                }
                else if (account[i].typeText === '旅游') {
                    this.outType[3]++;
                }
                else if (account[i].typeText === '娱乐') {
                    this.outType[4]++;
                }
                else if (account[i].typeText === '宠物') {
                    this.outType[5]++;
                }
            }
            else {
                this.today_income += account[i].amount;
                this.inC++;
                if (account[i].typeText === '工作收入') {
                    this.inType[0]++;
                }
                else if (account[i].typeText === '投资') {
                    this.inType[1]++;
                }
            }
        }
        this.today_earning = this.today_income - this.today_outcome;
    }
    accept(isInsert, newAccount) {
        if (isInsert) {
            Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
            this.AccountTable.insertData(newAccount, (id) => {
                newAccount.id = id;
                this.accounts.push(newAccount);
                if (newAccount != null) {
                    if (newAccount.accountType === 0) {
                        this.today_outcome += this.newAccount.amount;
                        this.outC++;
                        if (newAccount.typeText === '吃饭') {
                            this.outType[0]++;
                        }
                        else if (newAccount.typeText === '零食') {
                            this.outType[1]++;
                        }
                        else if (newAccount.typeText === '汽车加油') {
                            this.outType[2]++;
                        }
                        else if (newAccount.typeText === '旅游') {
                            this.outType[3]++;
                        }
                        else if (newAccount.typeText === '娱乐') {
                            this.outType[4]++;
                        }
                        else if (newAccount.typeText === '宠物') {
                            this.outType[5]++;
                        }
                    }
                    else {
                        this.today_income += this.newAccount.amount;
                        this.inC++;
                        if (newAccount.typeText === '工作收入') {
                            this.inType[0]++;
                        }
                        else if (newAccount.typeText === '投资') {
                            this.inType[1]++;
                        }
                    }
                    this.today_earning = this.today_income - this.today_outcome;
                }
            });
        }
        else {
            if (newAccount.accountType === 0) {
                this.today_outcome += this.newAccount.amount;
                this.outC++;
                if (newAccount.typeText === '吃饭') {
                    this.outType[0]++;
                }
                else if (newAccount.typeText === '零食') {
                    this.outType[1]++;
                }
                else if (newAccount.typeText === '汽车加油') {
                    this.outType[2]++;
                }
                else if (newAccount.typeText === '旅游') {
                    this.outType[3]++;
                }
                else if (newAccount.typeText === '娱乐') {
                    this.outType[4]++;
                }
                else if (newAccount.typeText === '宠物') {
                    this.outType[5]++;
                }
            }
            else {
                this.today_income += this.newAccount.amount;
                this.inC++;
                if (newAccount.typeText === '工作收入') {
                    this.inType[0]++;
                }
                else if (newAccount.typeText === '投资') {
                    this.inType[1]++;
                }
            }
            this.today_earning = this.today_income - this.today_outcome;
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
            this.AccountTable.query(0, (result) => {
                this.accounts = result;
            }, true);
            this.cur_search_text = '所有账单';
        });
    }
    //选择功能
    selectListItem(item) {
        this.isInsert = false;
        this.index = this.accounts.indexOf(item);
        if (item.accountType === 0) {
            this.today_outcome -= item.amount;
            this.outC--;
            if (item.typeText === '吃饭') {
                this.outType[0]--;
            }
            else if (item.typeText === '零食') {
                this.outType[1]--;
            }
            else if (item.typeText === '汽车加油') {
                this.outType[2]--;
            }
            else if (item.typeText === '旅游') {
                this.outType[3]--;
            }
            else if (item.typeText === '娱乐') {
                this.outType[4]--;
            }
            else if (item.typeText === '宠物') {
                this.outType[5]--;
            }
        }
        else {
            this.today_income -= item.amount;
            this.inC--;
            if (item.typeText === '工作收入') {
                this.inType[0]--;
            }
            else if (item.typeText === '投资') {
                this.inType[1]--;
            }
        }
        this.today_earning = this.today_income - this.today_outcome;
        this.newAccount = {
            id: item.id,
            accountType: item.accountType,
            typeText: item.typeText,
            amount: item.amount,
            date: item.date,
            year: item.year,
            month: item.month,
            reminder: item.reminder,
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
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create();
            Stack.width(CommonConstants.FULL_WIDTH);
            Stack.height(CommonConstants.FULL_HEIGHT);
            Stack.backgroundImage({ "id": 0, "type": 30000, params: ['back.jpg'], "bundleName": "com.example.rdb", "moduleName": "entry" }, ImageRepeat.NoRepeat);
            Stack.backgroundImageSize(ImageSize.Cover);
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height(CommonConstants.FULL_HEIGHT);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777219, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.height({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Text.fontColor(Color.White);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('查看统计');
            Text.height('25vp');
            Text.fontSize('24vp');
            Text.margin({ right: '24vp' });
            Text.onClick(() => {
                this.countController.open();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.backgroundImage({ "id": 0, "type": 30000, params: ['background.png'], "bundleName": "com.example.rdb", "moduleName": "entry" }, ImageRepeat.NoRepeat);
            Column.backgroundImageSize(ImageSize.Cover);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.cur_search_text);
            Text.height({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //年月周总结
            Row.create();
            //年月周总结
            Row.width(CommonConstants.FULL_WIDTH);
            //年月周总结
            Row.justifyContent(FlexAlign.SpaceBetween);
            //年月周总结
            Row.margin({ top: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                //年月周总结
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('支出: ' + this.today_outcome + '    收入: ' + this.today_income);
            Text.height({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        //年月周总结
        Row.pop();
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
            Button.createWithChild();
            Button.backgroundColor(this.isAll === 1 ? 0x317aff : Color.Gray);
            Button.width('30%');
            Button.border({ width: 0.5 });
            Button.onClick(() => {
                this.isAll = 1;
                this.isTime = 0;
                this.isType = 0;
                this.AccountTable.query(0, (result) => {
                    this.accounts = result;
                }, true);
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('所有账单');
            Text.fontSize(20);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.backgroundColor(this.isTime === 1 ? 0x317aff : Color.Gray);
            Button.width('30%');
            Button.border({ width: 0.5 });
            Button.onClick(() => {
                this.isAll = 0;
                this.isTime = 1;
                this.isType = 0;
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('时间账单');
            Text.fontSize(20);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.backgroundColor(this.isType === 1 ? 0x317aff : Color.Gray);
            Button.width('30%');
            Button.border({ width: 0.5 });
            Button.onClick(() => {
                this.isAll = 0;
                this.isTime = 0;
                this.isType = 1;
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('类型账单');
            Text.fontSize(20);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //.border({ width: 1 })
            //搜索功能
            Row.create();
            //.border({ width: 1 })
            //搜索功能
            Row.width(CommonConstants.FULL_WIDTH);
            //.border({ width: 1 })
            //搜索功能
            Row.padding({ left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            //.border({ width: 1 })
            //搜索功能
            Row.margin({ top: { "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                //.border({ width: 1 })
                //搜索功能
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isAll) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TextInput.create({
                            placeholder: '输入金额',
                        });
                        TextInput.width('80%');
                        TextInput.border({ width: 1 });
                        TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
                        TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
                        TextInput.backgroundColor(Color.White);
                        TextInput.type(InputType.Number);
                        TextInput.onChange((value) => {
                            this.searchValue = value;
                        });
                        if (!isInitialRender) {
                            TextInput.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.border({ width: 1 });
                        Button.width('20%');
                        Button.onClick(() => {
                            if (this.searchValue === '') {
                                this.AccountTable.query(0, (result) => {
                                    this.accounts = result;
                                    this.calculate(ObservedObject.GetRawObject(this.accounts));
                                }, true);
                            }
                            else {
                                this.AccountTable.query(Number(this.searchValue), (result) => {
                                    this.accounts = result;
                                    this.calculate(ObservedObject.GetRawObject(this.accounts));
                                }, false);
                            }
                            this.calculate(ObservedObject.GetRawObject(this.accounts));
                            this.cur_search_text = '所有账单';
                        });
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create('搜索');
                        Text.fontSize(20);
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                    Button.pop();
                });
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
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
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
            if (this.isTime) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TextInput.create({
                            placeholder: '输入年份',
                        });
                        TextInput.border({ width: 0.5 });
                        TextInput.width('25%');
                        TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
                        TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
                        TextInput.backgroundColor(Color.White);
                        TextInput.type(InputType.Number);
                        TextInput.onChange((value) => {
                            this.yearValue = value;
                        });
                        if (!isInitialRender) {
                            TextInput.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TextInput.create({
                            placeholder: '输入月份',
                        });
                        TextInput.border({ width: 0.5 });
                        TextInput.width('30%');
                        TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
                        TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
                        TextInput.backgroundColor(Color.White);
                        TextInput.type(InputType.Number);
                        TextInput.onChange((value) => {
                            this.monthValue = value;
                        });
                        if (!isInitialRender) {
                            TextInput.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TextInput.create({
                            placeholder: '输入日期',
                        });
                        TextInput.border({ width: 0.5 });
                        TextInput.width('25%');
                        TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
                        TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
                        TextInput.backgroundColor(Color.White);
                        TextInput.type(InputType.Number);
                        TextInput.onChange((value) => {
                            this.dayValue = value;
                        });
                        if (!isInitialRender) {
                            TextInput.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.border({ width: 1 });
                        Button.onClick(() => {
                            if (this.yearValue === '') {
                                this.AccountTable.query(0, (result) => {
                                    this.accounts = result;
                                    this.calculate(ObservedObject.GetRawObject(this.accounts));
                                }, true);
                            }
                            else if (this.monthValue === '') {
                                this.AccountTable.queryYear(String(this.yearValue), (result) => {
                                    this.accounts = result;
                                    this.calculate(ObservedObject.GetRawObject(this.accounts));
                                }, false);
                            }
                            else if (this.dayValue === '') {
                                this.AccountTable.queryMonth(String(this.yearValue), String(Number(this.monthValue) - 1), (result) => {
                                    this.accounts = result;
                                    this.calculate(ObservedObject.GetRawObject(this.accounts));
                                }, false);
                            }
                            else {
                                this.AccountTable.queryDay(String(this.yearValue) + '-' + String(Number(this.monthValue)) + '-' + String(this.dayValue), (result) => {
                                    this.accounts = result;
                                    this.calculate(ObservedObject.GetRawObject(this.accounts));
                                }, false);
                            }
                            this.cur_search_text = '时间: ' + this.yearValue + '-' + this.monthValue + '-' + this.dayValue;
                            this.calculate(ObservedObject.GetRawObject(this.accounts));
                        });
                        Button.width('20%');
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create('搜索');
                        Text.fontSize(20);
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                    Button.pop();
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isType) {
                this.ifElseBranchUpdateFunction(0, () => {
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
                        TextInput.create({
                            placeholder: '输入类型',
                        });
                        TextInput.border({ width: 1 });
                        TextInput.width('80%');
                        TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
                        TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
                        TextInput.backgroundColor(Color.White);
                        TextInput.onChange((value) => {
                            this.searchText = value;
                        });
                        if (!isInitialRender) {
                            TextInput.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.border({ width: 1 });
                        Button.onClick(() => {
                            if (this.searchText === '') {
                                this.AccountTable.query(0, (result) => {
                                    this.accounts = result;
                                    this.calculate(ObservedObject.GetRawObject(this.accounts));
                                }, true);
                            }
                            else {
                                this.AccountTable.queryType(String(this.searchText), (result) => {
                                    this.accounts = result;
                                    this.calculate(ObservedObject.GetRawObject(this.accounts));
                                }, false);
                            }
                            this.cur_search_text = '类型或备注: ' + this.searchText;
                            this.calculate(ObservedObject.GetRawObject(this.accounts));
                        });
                        Button.width('20%');
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create('搜索');
                        Text.fontSize(20);
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                    Button.pop();
                    Row.pop();
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        //.border({ width: 1 })
        //搜索功能
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
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
            Row.create();
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
            Row.width(CommonConstants.FULL_WIDTH);
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
            Row.padding({ left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
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
            Row.margin({ top: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
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
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: CommonConstants.FULL_SIZE });
            List.width(CommonConstants.FULL_WIDTH);
            List.borderRadius({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        ListItem.width(CommonConstants.FULL_WIDTH);
                        ListItem.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        ListItem.onClick(() => {
                            this.selectListItem(item);
                            this.dialogController.open();
                        });
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        ListItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
                            if (!isInitialRender) {
                                Flex.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Row.width('100%');
                            Row.backgroundColor(0xFFFFFF);
                            Row.padding({ left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Row.onTouch((event) => {
                                // 根据触摸类型判断
                                switch (event.type) {
                                    case TouchType.Down: // 触摸按下
                                        // 记录按下的x轴坐标
                                        this.downX = event.touches[0].x;
                                        break;
                                    case TouchType.Up: // 触摸抬起
                                        // 触摸抬起，根据x轴总偏移量，判断是否打开删除
                                        let xOffset = event.touches[0].x - this.downX;
                                        // 滑到目标x轴的位置
                                        var toxOffset = 0;
                                        // 偏移量超过删除按钮一半且左滑，设置打开
                                        if (Math.abs(xOffset) > vp2px(20) && xOffset < 0) {
                                            this.isEdit = true;
                                        }
                                        else if (Math.abs(xOffset) > vp2px(20) && xOffset > 0) {
                                            this.isEdit = false;
                                        }
                                        // 重置按下的x轴坐标
                                        this.downX = 0;
                                        break;
                                }
                            });
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(ImageList[item.typeText]);
                            Image.width({ "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            Image.margin({ right: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            if (!isInitialRender) {
                                Column.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.height({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.date);
                            Text.height('10vp');
                            Text.fontSize('10vp');
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.reminder);
                            Text.height({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontSize('12vp');
                            Text.margin({ right: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Blank.create();
                            Blank.layoutWeight(1);
                            if (!isInitialRender) {
                                Blank.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Blank.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString());
                            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontColor(item.accountType === 0 ? { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.align(Alignment.End);
                            Text.flexGrow(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            //删除按键
                            if (this.isEdit) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Button.createWithChild({ type: ButtonType.Normal });
                                        Button.width('20%');
                                        Button.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Button.backgroundColor(Color.Red);
                                        Button.onClick(() => {
                                            if (item.accountType === 0) {
                                                this.today_outcome -= item.amount;
                                                this.outC--;
                                                if (item.typeText === '吃饭') {
                                                    this.outType[0]--;
                                                }
                                                else if (item.typeText === '零食') {
                                                    this.outType[1]--;
                                                }
                                                else if (item.typeText === '汽车加油') {
                                                    this.outType[2]--;
                                                }
                                                else if (item.typeText === '旅游') {
                                                    this.outType[3]--;
                                                }
                                                else if (item.typeText === '娱乐') {
                                                    this.outType[4]--;
                                                }
                                                else if (item.typeText === '宠物') {
                                                    this.outType[5]--;
                                                }
                                            }
                                            else {
                                                this.today_income -= item.amount;
                                                this.inC--;
                                                if (item.typeText === '工作收入') {
                                                    this.inType[0]--;
                                                }
                                                else if (item.typeText === '投资') {
                                                    this.inType[1]--;
                                                }
                                            }
                                            this.today_earning = this.today_income - this.today_outcome;
                                            let index = this.deleteList.indexOf(item);
                                            this.deleteList.splice(index, 1);
                                            this.deleteList.push(item);
                                            this.deleteListItem();
                                            this.isEdit = false;
                                        });
                                        Button.stateEffect(true);
                                        if (!isInitialRender) {
                                            Button.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create("delete");
                                        Text.fontSize(16);
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                    Button.pop();
                                });
                            }
                            else {
                                If.branchId(1);
                            }
                            if (!isInitialRender) {
                                If.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        If.pop();
                        Flex.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
                            if (!isInitialRender) {
                                Flex.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Row.width('100%');
                            Row.backgroundColor(0xFFFFFF);
                            Row.padding({ left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Row.onTouch((event) => {
                                // 根据触摸类型判断
                                switch (event.type) {
                                    case TouchType.Down: // 触摸按下
                                        // 记录按下的x轴坐标
                                        this.downX = event.touches[0].x;
                                        break;
                                    case TouchType.Up: // 触摸抬起
                                        // 触摸抬起，根据x轴总偏移量，判断是否打开删除
                                        let xOffset = event.touches[0].x - this.downX;
                                        // 滑到目标x轴的位置
                                        var toxOffset = 0;
                                        // 偏移量超过删除按钮一半且左滑，设置打开
                                        if (Math.abs(xOffset) > vp2px(20) && xOffset < 0) {
                                            this.isEdit = true;
                                        }
                                        else if (Math.abs(xOffset) > vp2px(20) && xOffset > 0) {
                                            this.isEdit = false;
                                        }
                                        // 重置按下的x轴坐标
                                        this.downX = 0;
                                        break;
                                }
                            });
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(ImageList[item.typeText]);
                            Image.width({ "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            Image.margin({ right: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            if (!isInitialRender) {
                                Column.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.height({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.date);
                            Text.height('10vp');
                            Text.fontSize('10vp');
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.reminder);
                            Text.height({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontSize('12vp');
                            Text.margin({ right: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Blank.create();
                            Blank.layoutWeight(1);
                            if (!isInitialRender) {
                                Blank.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Blank.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString());
                            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontColor(item.accountType === 0 ? { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.align(Alignment.End);
                            Text.flexGrow(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            //删除按键
                            if (this.isEdit) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Button.createWithChild({ type: ButtonType.Normal });
                                        Button.width('20%');
                                        Button.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Button.backgroundColor(Color.Red);
                                        Button.onClick(() => {
                                            if (item.accountType === 0) {
                                                this.today_outcome -= item.amount;
                                                this.outC--;
                                                if (item.typeText === '吃饭') {
                                                    this.outType[0]--;
                                                }
                                                else if (item.typeText === '零食') {
                                                    this.outType[1]--;
                                                }
                                                else if (item.typeText === '汽车加油') {
                                                    this.outType[2]--;
                                                }
                                                else if (item.typeText === '旅游') {
                                                    this.outType[3]--;
                                                }
                                                else if (item.typeText === '娱乐') {
                                                    this.outType[4]--;
                                                }
                                                else if (item.typeText === '宠物') {
                                                    this.outType[5]--;
                                                }
                                            }
                                            else {
                                                this.today_income -= item.amount;
                                                this.inC--;
                                                if (item.typeText === '工作收入') {
                                                    this.inType[0]--;
                                                }
                                                else if (item.typeText === '投资') {
                                                    this.inType[1]--;
                                                }
                                            }
                                            this.today_earning = this.today_income - this.today_outcome;
                                            let index = this.deleteList.indexOf(item);
                                            this.deleteList.splice(index, 1);
                                            this.deleteList.push(item);
                                            this.deleteListItem();
                                            this.isEdit = false;
                                        });
                                        Button.stateEffect(true);
                                        if (!isInitialRender) {
                                            Button.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create("delete");
                                        Text.fontSize(16);
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                    Button.pop();
                                });
                            }
                            else {
                                If.branchId(1);
                            }
                            if (!isInitialRender) {
                                If.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        If.pop();
                        Flex.pop();
                        ListItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.accounts, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
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
        Row.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            //不是编辑界面显示加号可添加收支
            if (!this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.width({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.position({ x: CommonConstants.EDIT_POSITION_X, y: CommonConstants.EDIT_POSITION_Y });
                        Button.onClick(() => {
                            this.isInsert = true;
                            this.newAccount = { id: 0, accountType: 0, typeText: '', amount: 0, date: '', year: '', month: '', reminder: '' };
                            this.dialogController.open();
                        });
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 0, "type": 30000, params: ['add.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Button.pop();
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new MainPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=MainPage.js.map