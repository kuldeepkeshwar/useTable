import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 1000 });
const totalRecords = 55;
mock.onGet("/users").reply(function(config) {
  const {
    filter: { status },
    offset,
    limit
  } = config.params;
  const items = [];
  const len = offset + limit < totalRecords ? offset + limit : totalRecords;
  for (let i = offset; i < len; i++) {
    items.push({
      id: i + 1,
      name: `User ${i + 1}`,
      status: status ? status : i % 2 === 0 ? "active" : "expired"
    });
  }
  return [
    200,
    {
      items,
      totalRecords
    }
  ];
});
