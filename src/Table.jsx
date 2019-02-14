import React from "react";
import useTable from "./useTable";
import Loader from "./Components/Loader";
import Pagination from "./Components/Pagination";

function Filter({ filter, setFilter }) {
  return (
    <div>
      <button
        className={`btn link ${filter.status === undefined ? "active" : ""}`}
        onClick={() => setFilter({ status: undefined })}
      >
        All
      </button>
      <button
        className={`btn link ${filter.status === "active" ? "active" : ""}`}
        onClick={() => setFilter({ status: "active" })}
      >
        Active
      </button>
      <button
        className={`btn link ${filter.status === "expired" ? "active" : ""}`}
        onClick={() => setFilter({ status: "expired" })}
      >
        Expired
      </button>
    </div>
  );
}
export default function Table() {
  const {
    state: { items, loading, error, filter, pagination },
    next,
    previous,
    setFilter
  } = useTable({
    url: "/users",
    initialState: { filter: { status: undefined }, limit: 10 }
  });
  return (
    <div className="App">
      <Filter filter={filter} setFilter={setFilter} />
      <div className="list">
        <div className="row header">
          <div className="cell">ID</div>
          <div className="cell">NAME</div>
          <div className="cell">STATUS</div>
        </div>
        {loading ? (
          <Loader className="grow" />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>
            {items.map(item => {
              return (
                <div className="row" key={item.id}>
                  <div className="cell">{item.id}</div>
                  <div className="cell">{item.name}</div>
                  <div className="cell">{item.status}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Pagination previous={previous} next={next} pagination={pagination} />
    </div>
  );
}
