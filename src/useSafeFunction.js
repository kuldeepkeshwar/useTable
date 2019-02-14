import { useEffect, useRef } from "react";
export default function useSafeFunction(fn) {
  const mountedRef = useRef(false);
  useEffect(function() {
    mountedRef.current = true;
    return function() {
      mountedRef.current = false;
    };
  }, []);
  function safeFunction(...args) {
    mountedRef.current && fn(...args);
  }
  return safeFunction;
}
