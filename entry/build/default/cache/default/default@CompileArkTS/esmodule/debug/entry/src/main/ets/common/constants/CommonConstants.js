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
import relationalStore from '@ohos:data.relationalStore';
export default class CommonConstants {
}
/**
 * Rdb database config.
 */
CommonConstants.STORE_CONFIG = {
    name: 'database.db',
    securityLevel: relationalStore.SecurityLevel.S1
};
/**
 * Account table config.
 */
CommonConstants.ACCOUNT_TABLE = {
    tableName: 'accountTable',
    sqlCreate: 'CREATE TABLE IF NOT EXISTS accountTable(id INTEGER PRIMARY KEY AUTOINCREMENT, accountType INTEGER, ' +
        'typeText TEXT, amount INTEGER ,date TEXT, year TEXT, month TEXT,reminder TEXT)',
    columns: ['id', 'accountType', 'typeText', 'amount', 'date', 'year', 'month', 'reminder']
};
/**
 * Search text of Search component.
 */
CommonConstants.SEARCH_TEXT = '搜索';
/**
 * toast text of prompt component.
 */
CommonConstants.TOAST_TEXT_1 = '账目类型不能为空';
CommonConstants.TOAST_TEXT_2 = '账目金额不为正整数';
/**
 * Component size.
 */
CommonConstants.FULL_WIDTH = '100%';
CommonConstants.FULL_HEIGHT = '100%';
CommonConstants.DIALOG_HEIGHT = '55%';
CommonConstants.TABS_HEIGHT = '45%';
CommonConstants.MINIMUM_SIZE = 0;
CommonConstants.FULL_SIZE = 1;
CommonConstants.PROMPT_BOTTOM = '70vp';
/**
 * Component location.
 */
CommonConstants.EDIT_POSITION_X = '80%';
CommonConstants.EDIT_POSITION_Y = '90%';
CommonConstants.DELETE_POSITION_X = '50%';
CommonConstants.DELETE_POSITION_Y = '90%';
/**
 * Log tag.
 */
CommonConstants.RDB_TAG = '[Debug.Rdb]';
CommonConstants.TABLE_TAG = '[Debug.AccountTable]';
CommonConstants.INDEX_TAG = '[Debug.Index]';
//# sourceMappingURL=CommonConstants.js.map