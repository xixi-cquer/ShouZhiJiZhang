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
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import Logger from '@bundle:com.example.rdb/entry/ets/common/utils/Logger';
export default class Rdb {
    constructor(tableName, sqlCreateTable, columns) {
        this.rdbStore = null;
        this.tableName = tableName;
        this.sqlCreateTable = sqlCreateTable;
        this.columns = columns;
    }
    getRdbStore(callback = () => {
    }) {
        if (!callback || typeof callback === 'undefined' || callback === undefined) {
            Logger.info(CommonConstants.RDB_TAG, 'getRdbStore() has no callback!');
            return;
        }
        if (this.rdbStore !== null) {
            Logger.info(CommonConstants.RDB_TAG, 'The rdbStore exists.');
            callback();
            return;
        }
        let context = getContext(this);
        relationalStore.getRdbStore(context, CommonConstants.STORE_CONFIG, (err, rdb) => {
            if (err) {
                Logger.error(CommonConstants.RDB_TAG, `gerRdbStore() failed, err: ${err}`);
                return;
            }
            this.rdbStore = rdb;
            this.rdbStore.executeSql(this.sqlCreateTable);
            Logger.info(CommonConstants.RDB_TAG, 'getRdbStore() finished.');
            callback();
        });
    }
    insertData(data, callback = () => {
    }) {
        if (!callback || typeof callback === 'undefined' || callback === undefined) {
            Logger.info(CommonConstants.RDB_TAG, 'insertData() has no callback!');
            return;
        }
        let resFlag = false;
        const valueBucket = data;
        if (this.rdbStore) {
            this.rdbStore.insert(this.tableName, valueBucket, (err, ret) => {
                if (err) {
                    Logger.error(CommonConstants.RDB_TAG, `insertData() failed, err: ${err}`);
                    callback(resFlag);
                    return;
                }
                Logger.info(CommonConstants.RDB_TAG, `insertData() finished: ${ret}`);
                callback(ret);
            });
        }
    }
    deleteData(predicates, callback = () => {
    }) {
        if (!callback || typeof callback === 'undefined' || callback === undefined) {
            Logger.info(CommonConstants.RDB_TAG, 'deleteData() has no callback!');
            return;
        }
        let resFlag = false;
        if (this.rdbStore) {
            this.rdbStore.delete(predicates, (err, ret) => {
                if (err) {
                    Logger.error(CommonConstants.RDB_TAG, `deleteData() failed, err: ${err}`);
                    callback(resFlag);
                    return;
                }
                Logger.info(CommonConstants.RDB_TAG, `deleteData() finished: ${ret}`);
                callback(!resFlag);
            });
        }
    }
    updateData(predicates, data, callback = () => {
    }) {
        if (!callback || typeof callback === 'undefined' || callback === undefined) {
            Logger.info(CommonConstants.RDB_TAG, 'updateDate() has no callback!');
            return;
        }
        let resFlag = false;
        const valueBucket = data;
        if (this.rdbStore) {
            this.rdbStore.update(valueBucket, predicates, (err, ret) => {
                if (err) {
                    Logger.error(CommonConstants.RDB_TAG, `updateData() failed, err: ${err}`);
                    callback(resFlag);
                    return;
                }
                Logger.info(CommonConstants.RDB_TAG, `updateData() finished: ${ret}`);
                callback(!resFlag);
            });
        }
    }
    query(predicates, callback = () => {
    }) {
        if (!callback || typeof callback === 'undefined' || callback === undefined) {
            Logger.info(CommonConstants.RDB_TAG, 'query() has no callback!');
            return;
        }
        if (this.rdbStore) {
            this.rdbStore.query(predicates, this.columns, (err, resultSet) => {
                if (err) {
                    Logger.error(CommonConstants.RDB_TAG, `query() failed, err:  ${err}`);
                    return;
                }
                Logger.info(CommonConstants.RDB_TAG, 'query() finished.');
                callback(resultSet);
                resultSet.close();
            });
        }
    }
}
//# sourceMappingURL=rdb.js.map