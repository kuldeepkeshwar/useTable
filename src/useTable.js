import { useReducer, useEffect } from "react";
import useSafeFunction from "./useSafeFunction";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
  filter: null,
  pagination: {
    limit: 5,
    offset: 0,
    totalRecords: 0
  }
};
function reducer(state, { type, payload }) {
  switch (type) {
    case "filter": {
      const { filter } = payload;
      return {
        ...state,
        pagination: {
          limit: state.pagination.limit,
          offset: 0,
          totalRecords: 0
        },
        filter
      };
    }
    case "fetch_start": {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case "fetch_success": {
      const { items, totalRecords } = payload;
      const { limit, offset } = state.pagination;
      return {
        ...state,
        items,
        loading: false,
        pagination: {
          limit: limit,
          offset: offset,
          totalRecords: totalRecords
        }
      };
    }
    case "fetch_failure": {
      const { error } = payload;
      return {
        ...state,
        items: [],
        loading: false,
        error
      };
    }
    case "next": {
      const { limit, offset, totalRecords } = state.pagination;
      if (offset + limit < totalRecords) {
        return {
          ...state,
          pagination: {
            limit: limit,
            offset: offset + limit,
            totalRecords: totalRecords
          }
        };
      } else {
        throw new Error("offset + limit should be less than totalRecords");
      }
    }
    case "previous": {
      const { limit, offset, totalRecords } = state.pagination;
      if (offset - limit < 0) {
        throw new Error("offset should be greater than/equal Zero");
      }
      return {
        ...state,
        pagination: {
          limit: limit,
          offset: offset - limit,
          totalRecords: totalRecords
        }
      };
    }
    default:
      throw new Error("Missing action type");
  }
}
export default function useTable({ url, initialState: { filter, limit } }) {
  const [state, $dispatch] = useReducer(reducer, {
    ...initialState,
    filter,
    pagination: { ...initialState.pagination, limit }
  });
  const dispatch = useSafeFunction($dispatch);
  useEffect(fetchItems, [state.filter, state.pagination.offset]);

  function setFilter(filter) {
    dispatch({ type: "filter", payload: { filter } });
  }
  function next() {
    dispatch({ type: "next" });
  }
  function previous() {
    dispatch({ type: "previous" });
  }
  function fetchItems() {
    const {
      filter,
      pagination: { limit, offset }
    } = state;
    const params = { filter, limit, offset };
    dispatch({ type: "fetch_start" });
    axios
      .get(url, { params })
      .then(function(resp) {
        const { items, totalRecords } = resp.data;
        dispatch({ type: "fetch_success", payload: { items, totalRecords } });
      })
      .catch(function(err) {
        const error = err.response.data;
        dispatch({ type: "fetch_failure", payload: { error } });
      });
  }
  return { state, next, previous, setFilter };
}
