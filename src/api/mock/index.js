import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MockBankData from './data/bank.json';
import MockServiceData from './data/service.json';
import MockBannerData from './data/banner.json';
import MockBibleListData from './data/bibleList.json';
import { cloneDeep, uniqueId } from 'lodash';

const mock = new MockAdapter(Axios, { delayResponse: 4000 });
const paginationConfig = {
  pageNo: 1,
  pageSize: 10
};

const handlePaginationCallback = function (config, MockData, uniquePrefix) {
  const params = {
    ...paginationConfig,
    ...JSON.parse(config.data)
  };
  const pageNo = params.pageNo - 1;
  const data = cloneDeep(
    MockData.data.map(function (item) {
      item.id = uniqueId(uniquePrefix);
      return item;
    })
  );
  const rows = [];
  while (data.length) {
    rows.push(data.splice(0, params.pageSize));
  }
  return new Promise((res) => {
    res([
      200,
      {
        rows: rows[pageNo] || [],
        pagination: {
          ...params,
          nextPage: pageNo >= 0 && pageNo < rows.length - 1,
          prePage: pageNo > 0 && pageNo <= rows.length
        }
      }
    ]);
  });
};

mock.onPost('/outlets/bank').reply(function (config) {
  return handlePaginationCallback(config, MockBankData, 'bank-');
});
mock.onGet('/outlets/service').reply(200, {
  rows: MockServiceData.data.map(function (item) {
    item.id = uniqueId('service-');
    return item;
  })
});
mock.onGet('/bible/banner').reply(200, {
  rows: MockBannerData.data.map(function (item) {
    item.id = uniqueId('service-');
    return item;
  })
});
mock.onPost('/bible/list').reply(function (config) {
  return handlePaginationCallback(config, MockBibleListData, 'bible-');
});
